// require('dotenv').config(); // Load environment variables from .env file
// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const cors = require('cors');
// const app = express();

// // Path to React build folder (update as per your project structure)
// const reactBuildPath = path.join(__dirname, '..', 'Rents', 'Rents');

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static files from the React app build directory
// app.use(express.static(reactBuildPath));

// // MongoDB connection URI from environment variable
// const mongoURI = process.env.MONGO_URI;

// mongoose.connect(mongoURI, {})
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// app.get('/data', (req, res) => {
//   // res.sendFile(path.join(reactBuildPath, 'index.html'));
//   res.send("hello")
// });

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
