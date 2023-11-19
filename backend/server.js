/**
 * @file server.js
 * @description This file sets up the server and connects to the MongoDB Atlas database.
 */

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ShortLink = require('./models/shortLink');
const cors = require('cors');

const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());

/**
 * MongoDB Atlas connection string.
 * @type {string}
 */
const uri = process.env.ATLAS_URI;
if (!uri) {
  console.error('ATLAS_URI missing from .env file');
  process.exit(1);
}

const port = process.env.PORT || 5000;

// Connect to MongoDB Atlas using link from .env file
mongoose.connect(uri);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/public')));

/**
 * MongoDB connection object.
 * @type {object}
 */
const db = mongoose.connection;

// Check if connection to MongoDB Atlas was successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.get('/', (req, res) => {
  // Handle GET request for homepage
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

// Add new short link to database
app.post('/add', async (req, res) => {
  const { original, short } = req.body;

  // Check if original and short are provided
  if (!original || !short) {
    return res.status(400).send("Both 'original' and 'short' parameters are required.");
  }

  try {
    // Create a new ShortLink instance
    const newShortLink = new ShortLink({
      original: original,
      short: short
    });

    // Save the new short link to the database
    await newShortLink.save();
    console.log(`Added ${original} as ${short}`)
    res.redirect('/');
  } catch (error) {
    // Check if short link already exists
    if (error.code === 11000 && error.keyPattern && error.keyPattern.short) { 
      return res.status(409).send('Short link already exists');
    }
    // Handle other errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/:shortLink', async (req, res) => {
  console.log(`Received GET request for short link ${req.params.shortLink}`);
  const shortLink = await ShortLink.findOne({ short: new RegExp('^' + req.params.shortLink + '$', 'i') }); // ignores case  
  
  // Check if short link exists
  if (shortLink == null) {
    console.log('Short link not found');
    return res.sendStatus(404);
  }
  else {
    // Update url to include http protocol if not already included
    redirectUrl = shortLink.original.startsWith('http') ? shortLinkResult.original : `http://${shortLink.original}`;
    // Return the original link as plain text
    return res.send(redirectUrl);
  }
  
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});