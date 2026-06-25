const sqlite3 = require('sqlite3').verbose();

const DATABASE_FILE = './omniqa.db';

const db = new sqlite3.Database(DATABASE_FILE, (err) => {
  if (err) {
    console.error('Production database connection failed:', err.message);
  }
});

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

async function getProductionSummary() {
  const hotelRooms = await get('SELECT COUNT(*) AS count FROM hotel_rooms');
  const cruiseSailings = await get('SELECT COUNT(*) AS count FROM cruise_sailings');
  const cruiseStaterooms = await get('SELECT COUNT(*) AS count FROM cruise_staterooms');
  const reservations = await get('SELECT COUNT(*) AS count FROM reservations');
  const auditLog = await get('SELECT COUNT(*) AS count FROM audit_log');

  return {
    hotelRooms: hotelRooms.count,
    cruiseSailings: cruiseSailings.count,
    cruiseStaterooms: cruiseStaterooms.count,
    reservations: reservations.count,
    auditLog: auditLog.count
  };
}

async function getAvailableHotelRooms(destination, limit = 10) {
  return all(
    `
    SELECT *
    FROM hotel_rooms
    WHERE destination = ?
      AND status = 'available'
    ORDER BY room_number
    LIMIT ?
    `,
    [destination, limit]
  );
}

async function getAvailableCruiseStaterooms(sailingId, limit = 10) {
  return all(
    `
    SELECT *
    FROM cruise_staterooms
    WHERE sailing_id = ?
      AND status = 'available'
    ORDER BY deck_number, stateroom_number
    LIMIT ?
    `,
    [sailingId, limit]
  );
}

async function getCruiseSailings(limit = 10) {
  return all(
    `
    SELECT *
    FROM cruise_sailings
    ORDER BY sailing_date, ship_name
    LIMIT ?
    `,
    [limit]
  );
}

function closeDatabase() {
  db.close();
}

module.exports = {
  db,
  get,
  all,
  run,
  getProductionSummary,
  getAvailableHotelRooms,
  getAvailableCruiseStaterooms,
  getCruiseSailings,
  closeDatabase
};