const express = require("express");
const supabase = require("../supabaseClient");

const router = express.Router();

// CREATE schedule
router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { text } = req.body;
    const token = req.cookies.access_token;
    const { data, error } = await supabase
      .from("TODO")
      .insert([
        {
          text,
          user: userId,
        },
      ])
      .select()
      .setHeader("Authorization", `Bearer ${token}`);
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
    const { data, error } = await supabase
      .from("TODO")
      .select("*")
      .eq("user", userId)
      .order("created_at", { ascending: true })
      .setHeader("Authorization", `Bearer ${token}`);

    if (error) throw error;
    data.forEach((element) => {
      element.completed =
        element.lastDoneDate === new Date().toISOString().slice(0, 10);
    });

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
    const lastDoneDate = completed
      ? new Date().toISOString().slice(0, 10)
      : null;

    const { data, error } = await supabase
      .from("TODO")
      .update({ lastDoneDate })
      .eq("id", id)
      .select()
      .setHeader("Authorization", `Bearer ${token}`);

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
    const { error } = await supabase
      .from("TODO")
      .delete()
      .eq("id", id)
      .setHeader("Authorization", `Bearer ${token}`);
    if (error) throw error;

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete Task" });
  }
});

module.exports = router;
