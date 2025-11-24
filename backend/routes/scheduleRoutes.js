const express = require("express");
const supabase = require("../supabaseClient");

const router = express.Router();

// CREATE schedule
router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      date,
      title,
      description,
      startTime,
      endTime,
      allDay = false,
      color = "orange",
      daily = false,
    } = req.body.task;
    const token = req.cookies.access_token;

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
router.get("/:date", async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.params;
    const token = req.cookies.access_token;
    const { data, error } = await supabase
      .from("Schedule")
      .select("*")
      .eq("user", userId)
      .or(`date.eq.${date},daily.eq.true`)
      .order("startTime", { ascending: true })
      .setHeader("Authorization", `Bearer ${token}`);
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
      .select()
      .setHeader("Authorization", `Bearer ${token}`);

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
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.access_token;

    const { error } = await supabase
      .from("Schedule")
      .delete()
      .eq("id", id)
      .setHeader("Authorization", `Bearer ${token}`);
    if (error) throw error;

    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete schedule" });
  }
});

module.exports = router;
