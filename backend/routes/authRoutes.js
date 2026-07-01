const express = require("express");
const router = express.Router();
const passport = require("passport");
const { registerUser, loginUser } = require("../controllers/authController");
const generateToken = require("../utils/generateTokens");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed`,
    session: true,
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.CLIENT_URL}/oauth/callback?token=${token}`);
  }
);

module.exports = router;