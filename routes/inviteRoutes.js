
const express = require('express');
const router = express.Router();
const InviteCode = require('../models/InviteCode');

// Generate an invite code
router.post('/inviteCode', async (req, res) => {
  try {
    const { maxUsage, referrer } = req.body;
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const inviteCode = new InviteCode({ code, maxUsage, referrer });
    await inviteCode.save();
    res.status(201).json({ code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Validate an invite code
router.get('/inviteCode/validate', async (req, res) => {
  try {
    const { code } = req.query;
    const invite = await InviteCode.findOne({ code });
    if (!invite || invite.usedCount >= invite.maxUsage) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }
    res.json({ valid: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register with an invite code
router.post('/register', async (req, res) => {
  try {
    const { code, email } = req.body;
    const invite = await InviteCode.findOne({ code });
    if (!invite || invite.usedCount >= invite.maxUsage || invite.email) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }
    invite.email = email;
    invite.usedCount += 1;
    await invite.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
