import db from "../config/db.js";

export const DIRECTOR_SLUGS = new Set(["director-1", "director-2"]);

let directorTablePromise;

const ensureDirectorTable = () => {
  if (!directorTablePromise) {
    directorTablePromise = db.query(`
      CREATE TABLE IF NOT EXISTS directors (
        id INT NOT NULL AUTO_INCREMENT,
        slug VARCHAR(50) NOT NULL,
        name VARCHAR(255) DEFAULT NULL,
        position VARCHAR(255) DEFAULT NULL,
        title VARCHAR(255) DEFAULT NULL,
        message TEXT DEFAULT NULL,
        image_url VARCHAR(500) DEFAULT NULL,
        image_public_id VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY directors_slug_unique (slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `).catch((error) => {
      directorTablePromise = null;
      throw error;
    });
  }

  return directorTablePromise;
};

const get = async (slug) => {
  await ensureDirectorTable();
  const [rows] = await db.query("SELECT * FROM directors WHERE slug = ? LIMIT 1", [slug]);
  return rows[0] || null;
};

const save = async (slug, profile) => {
  await ensureDirectorTable();
  const { name = "", position = "", title = "", message = "" } = profile;

  await db.query(
    `INSERT INTO directors (slug, name, position, title, message)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       position = VALUES(position),
       title = VALUES(title),
       message = VALUES(message),
       updated_at = NOW()`,
    [slug, name, position, title, message]
  );

  return get(slug);
};

const saveImage = async (slug, image) => {
  await ensureDirectorTable();
  const { url, publicId = null } = image;

  await db.query(
    `INSERT INTO directors (slug, image_url, image_public_id)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE
       image_url = VALUES(image_url),
       image_public_id = VALUES(image_public_id),
       updated_at = NOW()`,
    [slug, url, publicId]
  );

  return get(slug);
};

export default { get, save, saveImage };
