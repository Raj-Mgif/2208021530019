import express from 'express';
import Url from '../models/Url.js';
import { nanoid } from 'nanoid';

const router = express.Router();
const BASE = process.env.BASE_URL || 'http://localhost:5000';

function isValidUrl(u) {
  try {
    // will throw if invalid
    new URL(u);
    return true;
  } catch (e) {
    return false;
  }
}

// Create short URL
// POST /api/shorten
router.post('/api/shorten', async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url || !isValidUrl(url)) return res.status(400).json({ error: 'Invalid URL' });

    // generate unique shortId
    let shortId = nanoid(7);
    while (await Url.findOne({ shortId })) {
      shortId = nanoid(7);
    }

    const record = await Url.create({ originalUrl: url, shortId });
    res.json({ shortUrl: `${BASE}/s/${record.shortId}`, shortId: record.shortId });
  } catch (err) {
    next(err);
  }
});

// Redirect
// GET /s/:shortId
router.get('/s/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const record = await Url.findOneAndUpdate({ shortId }, { $inc: { clicks: 1 } }, { new: true });
    if (!record) return res.status(404).send('URL not found');
    return res.redirect(record.originalUrl);
  } catch (err) {
    next(err);
  }
});

// Stats
// GET /api/stats/:shortId
router.get('/api/stats/:shortId', async (req, res, next) => {
  try {
    const record = await Url.findOne({ shortId: req.params.shortId });
    if (!record) return res.status(404).json({ error: 'Not found' });
    const { shortId, originalUrl, clicks, createdAt } = record;
    res.json({ shortId, originalUrl, clicks, createdAt });
  } catch (err) {
    next(err);
  }
});

export default router;
