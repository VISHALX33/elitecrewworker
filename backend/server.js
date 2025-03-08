const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static(uploadsDir));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Worker Schema
const workerSchema = new mongoose.Schema({
  name: String,
  image: String,
  email: String,
  degree: String,
  marks10: Number,
  marks12: Number,
  aadhar: String,
  contact: String,
  address: String,
  profession: String, // Added profession field
});

const Worker = mongoose.model('Worker', workerSchema);

// Image Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
app.post('/api/workers', upload.single('image'), async (req, res) => {
  const { name, email, degree, marks10, marks12, aadhar, contact, address, profession } = req.body;
  const image = req.file ? req.file.filename : '';

  try {
    const worker = new Worker({
      name,
      image,
      email,
      degree,
      marks10,
      marks12,
      aadhar,
      contact,
      address,
      profession, // Include profession in the worker object
    });
    await worker.save();
    res.status(201).json(worker);
  } catch (error) {
    console.error('Error saving worker:', error);
    res.status(500).json({ error: 'Failed to save worker details' });
  }
});

app.get('/api/workers', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


