const supabase = require("../supabaseClient.js");

module.exports = async function verifyUser(req, res, next) {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ error: "No access token" });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = data.user; // attach user to request
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
}