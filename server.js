// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
const jobDescriptionRoutes = require('./routes/jobDescriptionRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

// Use routes
app.use('/api/v1/job-descriptions', jobDescriptionRoutes);
app.use('/api/v1/resumes', resumeRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
