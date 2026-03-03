import db from "../config/db.js";

export default {
  get: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM contact LIMIT 1");
      if (!rows[0]) return null;
      const row = rows[0];
      // Transform snake_case DB columns → camelCase for frontend
      return {
        id: row.id,
        phone: row.phone,
        emergencyPhone: row.emergency_phone,
        hotline: row.hotline,
        email: row.email,
        address: row.address,
        addressBn: row.address_bn,
        lat: row.lat,
        lng: row.lng,
      };
    } catch (error) {
      console.error("Error fetching contact:", error);
      throw error;
    }
  },

  save: async (contactData) => {
    try {
      const { phone, emergencyPhone, hotline, email, address, addressBn, lat, lng } = contactData;

      // Check if a contact row already exists
      const [existing] = await db.query("SELECT id FROM contact LIMIT 1");

      if (existing.length > 0) {
        // Update existing row — use snake_case column names
        await db.query(
          `UPDATE contact
           SET phone = ?, emergency_phone = ?, hotline = ?, email = ?,
               address = ?, address_bn = ?, lat = ?, lng = ?, updated_at = NOW()
           WHERE id = ?`,
          [phone, emergencyPhone, hotline, email, address, addressBn, lat, lng, existing[0].id]
        );
        return existing[0].id;
      } else {
        // Insert first row — use snake_case column names
        const [result] = await db.query(
          `INSERT INTO contact
             (phone, emergency_phone, hotline, email, address, address_bn, lat, lng, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
          [phone, emergencyPhone, hotline, email, address, addressBn, lat, lng]
        );
        return result.insertId;
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      throw error;
    }
  },
};
