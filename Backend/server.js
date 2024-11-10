// // const express = require('express')
// // let app = express()
// // const cors = require('cors')
// // app.use(cors())

// // app.get('/data',(req,res)=>{
// //     res.send('Data from backend');
// // })

// // app.listen(1026,()=>{
// //     console.log('Server created');
// // })

// const express = require('express')
// const cors = require('cors')
// const path = require('path')

// const app = express()
// app.use(cors())

// // Set up the view engine for rendering JSX
// app.set('views', path.join(__dirname, 'views')) // Directory for view files
// app.set('view engine', 'jsx')
// app.engine('jsx', require('express-react-views').createEngine())

// app.get('/data', (req, res) => {
//     res.render('App', { message: 'Data from backend' })
// })

// app.listen(1026, () => {
//     console.log('Server created on port 1026')
// })
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: 'GET,POST', // Allow the necessary HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow headers
};

// Use the port from environment variables or default to 1026
const PORT = process.env.PORT || 1026;
const MONGO_URI = process.env.MONGO_URI;  // Ensure MONGO_URI is set in your .env file

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);  // Create the directory if it doesn't exist
}

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Define Mongoose schema and model for the property
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Property = mongoose.model('Property', propertySchema);

// Define Mongoose schema and model for user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Signup route
// app.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   // Check for missing fields
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(409).json({ message: 'User already exists.' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });

//     // Save new user to the database
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (error) {
//     console.error('Error during signup:', error.message); // Log detailed error
//     res.status(500).json({ message: 'Error during signup', error: error.message }); // Send error details in response
//   }
// });

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    // Save new user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during signup:', error.stack); // Log the full error stack trace
    res.status(500).json({ message: 'Error during signup', error: error.stack }); // Send error stack to client for better debugging
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the hashed password with the entered password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token if password is valid
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,  // This should be in your .env file
      { expiresIn: '10h' }
    );

    // Send the response with the token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error.message);  // Log the error
    console.error(error.stack);  // Log the stack trace for better debugging
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.get('/api/properties', (req, res) => {
  const { location } = req.query;
  // Fetch the properties from the database based on the location
  const properties = getPropertiesByLocation(location); // your function to fetch data
  res.json(properties);
});


// API route to add property
app.post('/api/property', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : '';

    if (!image) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    // Create and save the property to the database
    const newProperty = new Property({ title, description, image });
    await newProperty.save();

    res.status(200).json({ message: 'Property added successfully!', property: newProperty });
  } catch (error) {
    console.error('Error while saving property:', error.message);
    res.status(500).json({ message: 'Error while saving property.', error: error.message });
  }
});

// Serve static files for production (React build)
app.use(express.static(path.join(__dirname, '../RentHome Rents/build')));

// API route to test
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Serve React app for all other routes (catch-all)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../RentHome Rents/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
