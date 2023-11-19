/**
 * @module ShortLink
 * @description This module provides a model for the ShortLink object.
 */

const mongoose = require('mongoose');

/**
 * ShortLink Schema
 * @typedef {Object} ShortLinkSchema
 * @property {string} original - The original URL.
 * @property {string} short - The shortened URL.
 */
const shortLinkSchema = new mongoose.Schema({
    original: { type: String, required: true },
    short: { type: String, required: true, unique: true }
    }, {
    timestamps: true,
    }
);

module.exports = mongoose.model('ShortLink', shortLinkSchema);