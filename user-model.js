const { db } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  /**
   * Find a user by ID
   * @param {string} id - User ID
   * @returns {Promise<Object|null>} User object or null
   */
  static async findById(id) {
    const user = await db('users').where({ id }).first();
    return user || null;
  }

  /**
   * Find a user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null
   */
  static async findByEmail(email) {
    const user = await db('users').where({ email }).first();
    return user || null;
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user object
   */
  static async create(userData) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Insert the user
    const [user] = await db('users').insert({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'user',
      created_at: new Date(),
      updated_at: new Date(),
    }).returning('*');

    return user;
  }

  /**
   * Update a user
   * @param {string} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Updated user object
   */
  static async update(id, userData) {
    const updateData = {
      ...userData,
      updated_at: new Date(),
    };

    // If password is provided, hash it
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const [updatedUser] = await db('users')
      .where({ id })
      .update(updateData)
      .returning('*');

    return updatedUser;
  }

  /**
   * Delete a user
   * @param {string} id - User ID
   * @returns {Promise<boolean>} True if user was deleted
   */
  static async delete(id) {
    const result = await db('users').where({ id }).delete();
    return result > 0;
  }

  /**
   * Verify password
   * @param {string} password - Plain text password
   * @param {string} hashedPassword - Hashed password
   * @returns {Promise<boolean>} True if passwords match
   */
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * List all users with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Users list and pagination info
   */
  static async list(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const [users, totalCount] = await Promise.all([
      db('users')
        .select('id', 'name', 'email', 'role', 'created_at', 'updated_at')
        .limit(limit)
        .offset(offset)
        .orderBy('created_at', 'desc'),
      db('users').count('id as count').first(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        totalItems: parseInt(totalCount.count),
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  }
}

module.exports = User;
