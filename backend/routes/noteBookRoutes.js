
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
      .from("NoteBook")
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
    const token = req.cookies.access_token;
    const userId = req.user.id;
    const { data, error } = await supabase
      .from("NoteBook")
      .select("*")
      .eq("user", userId)
      .setHeader("Authorization", `Bearer ${token}`);

    if (!data.length) {
      return res.status(404).json({ error: "No notes found for this user" });
    }
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
    const { text } = req.body;
    const token = req.cookies.access_token;
    const userId = req.user.id;
    const { data, error } = await supabase
      .from("NoteBook")
      .update({ text })
      .eq("user", userId)
      .select()
      .setHeader("Authorization", `Bearer ${token}`);

    if (error) throw error;

    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update schedule" });
  }
});

module.exports = router;
