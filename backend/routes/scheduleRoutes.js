const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

const express = require("express");

const router = express.Router();

// CREATE schedule
router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", req.body);
    const {
      date,
      title,
      description,
      startTime,
      endTime,
      allDay = false,
      color = "orange",
      daily = false,
    } = req.body;
    const token = req.cookies.access_token;
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );
console.log("User ID after supabase client:", userId);
    const { data, error } = await supabase
      .from("Schedule")
      .insert([
        {
          date,
          title,
          description,
          startTime,
          endTime,
          allDay,
          color,
          user: userId,
          daily,
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
      .from("Schedule")
      .select("*")
      .eq("user", userId)
      .order("date", { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
});

// UPDATE schedule
router.put("/", async (req, res) => {
  try {
    const { id, updates } = req.body;

    const { data, error } = await supabase
      .from("Schedule")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data.length)
      return res.status(404).json({ error: "Schedule not found" });

    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update schedule" });
  }
});

// DELETE schedule
router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;

    const { error } = await supabase.from("Schedule").delete().eq("id", id);
    if (error) throw error;

    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete schedule" });
  }
});

module.exports = router;
