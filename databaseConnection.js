const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./omniqa.db', (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to OmniQA SQLite database.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      room_id INTEGER PRIMARY KEY,
      status TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS staterooms (
      stateroom_id INTEGER PRIMARY KEY,
      status TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
      reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
      inventory_type TEXT NOT NULL,
      inventory_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;