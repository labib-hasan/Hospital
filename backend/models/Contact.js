import db from "../config/db.js";

// Convert DB snake_case row → camelCase for frontend
const toFrontend = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    phone: row.phone || null,
    emergencyPhone: row.emergency_phone || null,
    hotline: row.hotline || null,
    email: row.email || null,
    address: row.address || null,
    addressBn: row.address_bn || null,
    lat: row.lat ? parseFloat(row.lat) : null,
    lng: row.lng ? parseFloat(row.lng) : null,
  };
};

export default {
  get: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM contact LIMIT 1");
      return toFrontend(rows[0] || null);
    } catch (error) {
      console.error("Error fetching contact:", error);
      throw error;
    }
  },

  save: async (contactData) => {
    try {
      const { phone, emergencyPhone, hotline, email, address, addressBn, lat, lng } = contactData;

      // Map camelCase input → snake_case DB columns
      // Only entries with a real value will be included in the query
      const fieldMap = {
        phone,
        emergency_phone: emergencyPhone,
        hotline,
        email,
        address,
        address_bn: addressBn,
        lat,
        lng,
      };

      // Check if a row already exists
      const [existing] = await db.query("SELECT id FROM contact LIMIT 1");

      if (existing.length > 0) {
        // UPDATE — build dynamic SET clause, skip undefined / null / empty
        const setClauses = [];
        const values = [];

        for (const [col, val] of Object.entries(fieldMap)) {
          if (val !== undefined && val !== null && val !== "") {
            setClauses.push(`\`${col}\` = ?`);
            values.push(val);
          }
        }

        if (setClauses.length === 0) return existing[0].id;

        setClauses.push("updated_at = NOW()");
        values.push(existing[0].id);

        await db.query(
          `UPDATE contact SET ${setClauses.join(", ")} WHERE id = ?`,
          values
        );
        return existing[0].id;
      } else {
        // INSERT — build dynamic column / value lists, skip undefined / null / empty
        const cols = [];
        const placeholders = [];
        const values = [];

        for (const [col, val] of Object.entries(fieldMap)) {
          if (val !== undefined && val !== null && val !== "") {
            cols.push(`\`${col}\``);
            placeholders.push("?");
            values.push(val);
          }
        }

        if (cols.length === 0) throw new Error("No contact data provided");

        const [result] = await db.query(
          `INSERT INTO contact (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`,
          values
        );
        return result.insertId;
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      throw error;
    }
  },
};
