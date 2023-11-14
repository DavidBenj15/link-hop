/**
 * @file server.js
 * @description This file sets up the server and connects to the MongoDB Atlas database.
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

/**
 * Express application.
 * @type {object}
 */
const app = express();

/**
 * Server port.
 * @type {number}
 */
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


/**
 * MongoDB Atlas connection string.
 * @type {string}
 */
const uri = process.env.ATLAS_URI;

// Connect to MongoDB Atlas using link from .env file
mongoose.connect(uri);

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

/**
 * ShortLink Router.
 * @type {object}
 */
const shortLinkRouter = require('./routes/short-link');

// use routes
app.use('/short-link', shortLinkRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});