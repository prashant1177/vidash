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
  res.status(200).json({ user: data.user });
});

// Sign In
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  // Store tokens in secure cookies
  res.cookie("access_token", data.session?.access_token, {
    httpOnly: true,
    secure: false, // 👈 no SSL
    sameSite: "Lax", // works fine between localhost ports
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.cookie("refresh_token", data.session?.refresh_token, {
    httpOnly: true,
    secure: false, // 👈 no SSL
    sameSite: "Lax", // works fine between localhost ports
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
  });
  res.status(200).json({
    user: data.user.user_metadata,
  });
});

// REFRESH TOKEN
router.post("/refresh", async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    
    if (!refresh_token) {
      return res.status(401).json({ error: "No refresh token" });
    }
    const { data, error } = await supabase.auth.refreshSession({ 
      refresh_token 
    });

    if (error) {
      // Clear invalid cookies
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return res.status(401).json({ error: error.message });
    }

    if (!data?.session) {
      return res.status(401).json({ error: "Failed to refresh session" });
    }

    // Set new access token
    res.cookie("access_token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // SSL in production
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Update refresh token (Supabase may rotate it)
    if (data.session.refresh_token) {
      res.cookie("refresh_token", data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    res.json({ 
      message: "Session refreshed",
      user: data.session.user 
    });

  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signout", async (req, res) => {
  try {
    // Step 1: get the token from cookies (optional if you're tracking user sessions)
    const token = req.cookies?.access_token;

    // Step 2: Sign out user from Supabase (invalidates the refresh token)
    const { error } = await supabase.auth.signOut();

    if (error) return res.status(400).json({ error: error.message });

    // Step 3: Remove cookies from browser
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false, // 👈 no SSL
      sameSite: "Lax", // works fine between localhost ports
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: false, // 👈 no SSL
      sameSite: "Lax", // works fine between localhost ports
    });

    // Step 4: Respond success
    res.status(200).json({ message: "Signed out successfully." });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong during signout." });
  }
});

module.exports = router;
