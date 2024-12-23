
const mongoose = require('mongoose');

const inviteCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  maxUsage: { type: Number, required: true },
  usedCount: { type: Number, default: 0 },
  email: { type: String, unique: true, sparse: true },
  referrer: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InviteCode', inviteCodeSchema);
