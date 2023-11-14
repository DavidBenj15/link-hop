/**
 * @module backend/routes/short-link
 * @description This module provides routing for the ShortLink model.
 */

const router = require('express').Router();
let ShortLink = require('../models/short-link.model');

/**
 * Route serving all short links.
 * @name get/
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.route('/').get((req, res) => {
    ShortLink.find()
        .then(shortLinks => res.json(shortLinks))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Route to add a new short link.
 * @name post/add
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} req.body.original_url - The original URL.
 * @param {string} req.body.short_url - The generated shortened URL.
 */
router.route('/add').post((req, res) => {
    const original_url = req.body.original_url;
    const short_url = req.body.short_url;

    const newShortLink = new ShortLink({
        original_url,
        short_url
    });

    newShortLink.save()
        .then(() => res.json('Short link added to databse!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Route deleting a specific short link.
 * @name delete/:id
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.route('/:id').delete((req, res) => {
    ShortLink.findByIdAndDelete(req.params.id)
        .then(() => res.json('Short link deleted from database.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;