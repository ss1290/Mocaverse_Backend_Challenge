
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const inviteRoutes = require('./routes/inviteRoutes');

const app = express();
app.use(bodyParser.json());

// Use invite routes
app.use('/api', inviteRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mocaverse', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
