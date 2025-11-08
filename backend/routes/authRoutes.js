const express = require("express");
const supabase = require("../supabaseClient");

const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: name }, // this goes into user_metadata
    },
  });
  console.log(data.user);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user });
});

// Sign In
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  console.log("Login succesful" , data.user);
  res.json({
    user: data.user,
    session: data.session,
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
  });
});

// REFRESH TOKEN
router.post("/refresh", async (req, res) => {
  const { refresh_token } = req.body;
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
});

// Sign Out
router.post("/signout", async (req, res) => {
  const { error } = await supabase.auth.signOut();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Signed out successfully" });
});

module.exports = router;
