const express = require('express');
const { body, validationResult } = require('express-validator');
const Vendor = require('../models/Vendor');
const { checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /api/vendors
 * @desc Get all vendors with pagination and filtering
 * @access Private
 */
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      name,
      status,
      category,
      risk_level,
      industry,
      sortBy,
      sortOrder,
    } = req.query;

    const filters = {
      name,
      status,
      category,
      risk_level,
      industry,
      sortBy,
      sortOrder,
    };

    const result = await Vendor.list(filters, parseInt(page), parseInt(limit));
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route GET /api/vendors/metrics
 * @desc Get vendor metrics
 * @access Private
 */
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await Vendor.getMetrics();
    res.json(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route GET /api/vendors/:id
 * @desc Get vendor by ID
 * @access Private
 */
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json(vendor