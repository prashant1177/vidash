const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

const express = require("express");

const router = express.Router();

// CREATE schedule
router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { text } = req.body;
    const token = req.cookies.access_token;
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );
    const { data, error } = await supabase
      .from("TODO")
      .insert([
        {
          text,
          completed: false,
          user: userId,
        },
      ])
      .select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create schedule" });
  }
});

// GET schedules by user ID
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const token = req.cookies.access_token;
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );
    const { data, error } = await supabase
      .from("TODO")
      .select("*")
      .eq("user", userId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    console.log("Fetched TODOs for user:", userId, data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
});

// UPDATE schedule
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const token = req.cookies.access_token;
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );

    const { data, error } = await supabase
      .from("TODO")
      .update({ completed })
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data.length) return res.status(404).json({ error: "Task not found" });

    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update Task" });
  }
});

// DELETE schedule
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.access_token;
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );
    const { error } = await supabase.from("TODO").delete().eq("id", id);
    if (error) throw error;

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete Task" });
  }
});

module.exports = router;
