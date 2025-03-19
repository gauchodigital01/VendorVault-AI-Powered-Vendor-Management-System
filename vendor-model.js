const { db } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Vendor {
  /**
   * Find a vendor by ID
   * @param {string} id - Vendor ID
   * @returns {Promise<Object|null>} Vendor object or null
   */
  static async findById(id) {
    const vendor = await db('vendors').where({ id }).first();
    return vendor || null;
  }

  /**
   * Create a new vendor
   * @param {Object} vendorData - Vendor data
   * @param {string} userId - User ID who created the vendor
   * @returns {Promise<Object>} Created vendor object
   */
  static async create(vendorData, userId) {
    const [vendor] = await db('vendors').insert({
      id: uuidv4(),
      name: vendorData.name,
      description: vendorData.description,
      website: vendorData.website,
      email: vendorData.email,
      phone: vendorData.phone,
      address: vendorData.address,
      city: vendorData.city,
      state: vendorData.state,
      zip: vendorData.zip,
      country: vendorData.country,
      industry: vendorData.industry,
      category: vendorData.category,
      tax_id: vendorData.tax_id,
      status: vendorData.status || 'active',
      risk_level: vendorData.risk_level || 'medium',
      created_by: userId,
      created_at: new Date(),
      updated_at: new Date(),
    }).returning('*');

    return vendor;
  }

  /**
   * Update a vendor
   * @param {string} id - Vendor ID
   * @param {Object} vendorData - Vendor data to update
   * @returns {Promise<Object>} Updated vendor object
   */
  static async update(id, vendorData) {
    const updateData = {
      ...vendorData,
      updated_at: new Date(),
    };

    const [updatedVendor] = await db('vendors')
      .where({ id })
      .update(updateData)
      .returning('*');

    return updatedVendor;
  }

  /**
   * Delete a vendor
   * @param {string} id - Vendor ID
   * @returns {Promise<boolean>} True if vendor was deleted
   */
  static async delete(id) {
    const result = await db('vendors').where({ id }).delete();
    return result > 0;
  }

  /**
   * List all vendors with pagination and filtering
   * @param {Object} filters - Filter options
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Vendors list and pagination info
   */
  static async list(filters = {}, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    // Build query with filters
    let query = db('vendors');
    
    // Apply filters
    if (filters.name) {
      query = query.where('name', 'ilike', `%${filters.name}%`);
    }
    
    if (filters.status) {
      query = query.where('status', filters.status);
    }
    
    if (filters.category) {
      query = query.where('category', filters.category);
    }
    
    if (filters.risk_level) {
      query = query.where('risk_level', filters.risk_level);
    }
    
    if (filters.industry) {
      query = query.where('industry', filters.industry);
    }
    
    // Execute query with pagination
    const [vendors, totalCount] = await Promise.all([
      query.select('*')
        .limit(limit)
        .offset(offset)
        .orderBy(filters.sortBy || 'created_at', filters.sortOrder || 'desc'),
      db('vendors').count('id as count').first(),
    ]);

    return {
      vendors,
      pagination: {
        page,
        limit,
        totalItems: parseInt(totalCount.count),
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  }

  /**
   * Get vendor metrics
   * @returns {Promise<Object>} Vendor metrics
   */
  static async getMetrics() {
    const [
      totalVendors,
      activeVendors,
      inactiveVendors,
      vendorsByCategory,
      vendorsByRiskLevel,
    ] = await Promise.all([
      db('vendors').count('id as count').first(),
      db('vendors').where('status', 'active').count('id as count').first(),
      db('vendors').where('status', 'inactive').count('id as count').first(),
      db('vendors').select('category').count('id as count').groupBy('category'),
      db('vendors').select('risk_level').count('id as count').groupBy('risk_level'),
    ]);

    return {
      totalVendors: parseInt(totalVendors.count),
      activeVendors: parseInt(activeVendors.count),
      inactiveVendors: parseInt(inactiveVendors.count),
      vendorsByCategory,
      vendorsByRiskLevel,
    };
  }
}

module.exports = Vendor;
