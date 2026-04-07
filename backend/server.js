require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Routers
const patientRoutes = require('./routes/patient');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes Mount
app.use('/api/v1', patientRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`HMS Backend server is running on port ${PORT}`);
});
