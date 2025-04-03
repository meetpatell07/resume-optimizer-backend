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

// app.use(cors({ origin: 'http://localhost:5001' }));  // Allow requests from the frontend
// Allow requests from your frontend URL (replace with the actual URL)
const corsOptions = {
  origin: ['https://resume-optimizer-frontend.vercel.app', 'http://localhost:5000'], // Add both domains
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Important for authentication cookies/tokens
};

app.use(cors(corsOptions));

// Import Routes
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

const technicalKnowledgeRoutes = require('./routes/technicalKnowledgeRoutes');
const educationRoutes = require('./routes/educationRoutes');
const projectRoutes = require('./routes/projectRoutes');
const volunteerWorkRoutes = require('./routes/volunteerWorkRoutes')
const workExperienceRoute = require('./routes/workExperienceRoutes')
const skillRoute = require('./routes/skillRoutes')
const authRoutes = require('./routes/auth')


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Ensures quick failure handling

})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB:", err));



// Job routes
app.use('/api/v1/jobs', jobRoutes);

// User Route
app.use('/api/v1/', userRoutes);

// Authentication and Authorization
app.use("/api/v1", authRoutes); 

// Technical Route
app.use('/api/v1/technical', technicalKnowledgeRoutes);

// Eductional Route
app.use('/api/v1/education', educationRoutes);

// Project Route
app.use('/api/v1/project', projectRoutes);

// Volunteering Route
app.use('/api/v1/volunteer', volunteerWorkRoutes);

// Work Experience Route
app.use('/api/v1/work', workExperienceRoute);

// Skill Route
app.use('/api/v1/skill', skillRoute);

// You can define any other routes here as needed
app.get('/', (req, res) => {
  res.send('Welcome to the Resume Optimizer');
});

// Error handling middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
