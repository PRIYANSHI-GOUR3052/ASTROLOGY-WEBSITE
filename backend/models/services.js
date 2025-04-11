// backend/models/Service.js
import pool from '@/lib/db';

class ServiceModel {
  // Get all services
  static async getAllServices() {
    try {
      const [rows] = await pool.query(`
        SELECT * FROM services
        ORDER BY priority ASC, title_en ASC
      `);
      return rows;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  // Get service by slug
  static async getServiceBySlug(slug) {
    try {
      const [rows] = await pool.query(`
        SELECT * FROM services
        WHERE slug = ?
      `, [slug]);
      
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching service by slug:', error);
      throw error;
    }
  }

  // Create a new service
  static async createService(serviceData) {
    try {
      const { 
        title_hi, 
        title_en, 
        slug, 
        description_hi, 
        description_en, 
        price, 
        icon_type, 
        icon_path, 
        priority 
      } = serviceData;

      const [result] = await pool.query(`
        INSERT INTO services (
          title_hi, 
          title_en, 
          slug, 
          description_hi, 
          description_en, 
          price, 
          icon_type, 
          icon_path, 
          priority
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        title_hi, 
        title_en, 
        slug, 
        description_hi, 
        description_en, 
        price, 
        icon_type, 
        icon_path, 
        priority || 100
      ]);

      return { id: result.insertId, ...serviceData };
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  }

  // Update a service
  static async updateService(id, serviceData) {
    try {
      const { 
        title_hi, 
        title_en, 
        slug, 
        description_hi, 
        description_en, 
        price, 
        icon_type, 
        icon_path, 
        priority 
      } = serviceData;

      await pool.query(`
        UPDATE services
        SET 
          title_hi = ?, 
          title_en = ?, 
          slug = ?, 
          description_hi = ?, 
          description_en = ?, 
          price = ?, 
          icon_type = ?, 
          icon_path = ?, 
          priority = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        title_hi, 
        title_en, 
        slug, 
        description_hi, 
        description_en, 
        price, 
        icon_type, 
        icon_path, 
        priority || 100,
        id
      ]);

      return { id, ...serviceData };
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  }

  // Delete a service
  static async deleteService(id) {
    try {
      await pool.query('DELETE FROM services WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }
}

export default ServiceModel;