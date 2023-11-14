/**
 * @module ShortLink
 * @description This module provides a model for the ShortLink object.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * ShortLink Schema
 * @typedef {Object} ShortLinkSchema
 * @property {string} original_url - The original URL.
 * @property {string} short_url - The generated shortened URL.
 */
const shortLinkSchema = new Schema({
    original_url: { type: String, required: true },
    short_url: { type: String, required: true }
    }, {
    timestamps: true,
    }
);

/**
 * ShortLink Model.
 * @type {ShortLinkSchema}
 */
const ShortLink = mongoose.model('ShortLink', shortLinkSchema);

module.exports = ShortLink;