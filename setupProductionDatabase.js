const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./omniqa.db');

const SCHEDULE_YEAR = 2027;

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function getCruiseLengthDays(cruiseLength) {
  if (cruiseLength === '3-Day Cruise') return 3;
  if (cruiseLength === '4-Day Cruise') return 4;
  return 7;
}

function generateSailingsForShip(shipName, destination) {
  const sailings = [];
  let currentDate = new Date(`${SCHEDULE_YEAR}-01-01T00:00:00`);
  const endDate = new Date(`${SCHEDULE_YEAR}-12-31T00:00:00`);

  const rotation = ['3-Day Cruise', '4-Day Cruise', '7-Day Cruise'];
  let rotationIndex = 0;

  while (currentDate <= endDate) {
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const isRotationSeason =
      (month === 9) ||
      (month === 10) ||
      (month === 11 && day <= 15);

    const cruiseLength = isRotationSeason
      ? rotation[rotationIndex % rotation.length]
      : '7-Day Cruise';

    sailings.push({
      sailingId: `${shipName.replaceAll(' ', '-').toUpperCase()}-${formatDate(currentDate)}`,
      shipName,
      destination,
      cruiseLength,
      sailingDate: formatDate(currentDate)
    });

    if (isRotationSeason) {
      rotationIndex++;
    }

    currentDate = addDays(currentDate, getCruiseLengthDays(cruiseLength));
  }

  return sailings;
}

db.serialize(() => {
  db.run('BEGIN TRANSACTION');

  db.run(`DROP TABLE IF EXISTS hotel_rooms`);
  db.run(`DROP TABLE IF EXISTS cruise_sailings`);
  db.run(`DROP TABLE IF EXISTS cruise_staterooms`);
  db.run(`DROP TABLE IF EXISTS reservations`);
  db.run(`DROP TABLE IF EXISTS audit_log`);

  db.run(`
    CREATE TABLE hotel_rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      destination TEXT NOT NULL,
      room_number INTEGER NOT NULL,
      view_type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'available'
    )
  `);

  db.run(`
    CREATE TABLE cruise_sailings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sailing_id TEXT NOT NULL UNIQUE,
      ship_name TEXT NOT NULL,
      cruise_destination TEXT NOT NULL,
      cruise_length TEXT NOT NULL,
      sailing_date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled'
    )
  `);

  db.run(`
    CREATE TABLE cruise_staterooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sailing_id TEXT NOT NULL,
      sailing_date TEXT NOT NULL,
      ship_name TEXT NOT NULL,
      cruise_destination TEXT NOT NULL,
      cruise_length TEXT NOT NULL,
      deck_number INTEGER NOT NULL,
      stateroom_number INTEGER NOT NULL,
      cabin_category TEXT NOT NULL,
      square_feet_bonus INTEGER NOT NULL DEFAULT 0,
      separate_bedroom TEXT NOT NULL DEFAULT 'No',
      status TEXT NOT NULL DEFAULT 'available'
    )
  `);

  db.run(`
    CREATE TABLE reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reservation_type TEXT NOT NULL,
      product_type TEXT NOT NULL,
      destination TEXT,
      ship_name TEXT,
      sailing_id TEXT,
      sailing_date TEXT,
      room_number INTEGER,
      stateroom_number INTEGER,
      guest_name TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id INTEGER,
      details TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const hotelModel = [
    { destination: 'Miami', total: 400 },
    { destination: 'Cancun', total: 500 },
    { destination: 'Punta Cana', total: 400 }
  ];

  const insertHotelRoom = db.prepare(`
    INSERT INTO hotel_rooms (destination, room_number, view_type, status)
    VALUES (?, ?, ?, 'available')
  `);

  hotelModel.forEach(({ destination, total }) => {
    const gardenCount = Math.floor(total * 0.75);
    const partialOceanCount = Math.floor(total * 0.20);
    const oceanFrontCount = total - gardenCount - partialOceanCount;

    let roomNumber = 1001;

    for (let i = 0; i < gardenCount; i++) {
      insertHotelRoom.run(destination, roomNumber++, 'Garden / Resort View');
    }

    for (let i = 0; i < partialOceanCount; i++) {
      insertHotelRoom.run(destination, roomNumber++, 'Partial Ocean View');
    }

    for (let i = 0; i < oceanFrontCount; i++) {
      insertHotelRoom.run(destination, roomNumber++, 'Ocean Front');
    }
  });

  insertHotelRoom.finalize();

  const ships = [
    { shipName: 'OmniQA Explorer', destination: 'Bahamas' },
    { shipName: 'OmniQA Horizon', destination: 'Western Caribbean' },
    { shipName: 'OmniQA Voyager', destination: 'Eastern Caribbean' }
  ];

  const insertSailing = db.prepare(`
    INSERT INTO cruise_sailings (
      sailing_id,
      ship_name,
      cruise_destination,
      cruise_length,
      sailing_date,
      status
    )
    VALUES (?, ?, ?, ?, ?, 'scheduled')
  `);

  const insertStateroom = db.prepare(`
    INSERT INTO cruise_staterooms (
      sailing_id,
      sailing_date,
      ship_name,
      cruise_destination,
      cruise_length,
      deck_number,
      stateroom_number,
      cabin_category,
      square_feet_bonus,
      separate_bedroom,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'available')
  `);

  let totalSailings = 0;
  let totalStaterooms = 0;

  ships.forEach(({ shipName, destination }) => {
    const sailings = generateSailingsForShip(shipName, destination);

    sailings.forEach((sailing) => {
      totalSailings++;

      insertSailing.run(
        sailing.sailingId,
        sailing.shipName,
        sailing.destination,
        sailing.cruiseLength,
        sailing.sailingDate
      );

      for (let deck = 1; deck <= 10; deck++) {
        const startRoom = deck === 10 ? 10001 : deck * 1000 + 1;
        const endRoom = deck === 10 ? 10100 : deck * 1000 + 100;

        for (let stateroomNumber = startRoom; stateroomNumber <= endRoom; stateroomNumber++) {
          let cabinCategory = 'Standard Interior';
          let squareFeetBonus = 0;
          let separateBedroom = 'No';

          if (deck >= 1 && deck <= 5) {
            cabinCategory = 'Standard Interior';
          } else if (deck >= 6 && deck <= 7) {
            cabinCategory = 'Superior Interior';
            squareFeetBonus = 250;
          } else if (deck === 8) {
            cabinCategory = 'Deluxe Interior';
            squareFeetBonus = 500;
            separateBedroom = 'Yes';
          } else if (deck === 9) {
            cabinCategory = 'Ocean View';
          } else if (deck === 10) {
            if (stateroomNumber >= 10081) {
              cabinCategory = 'Suite';
            } else {
              cabinCategory = 'Balcony';
            }
          }

          totalStaterooms++;

          insertStateroom.run(
            sailing.sailingId,
            sailing.sailingDate,
            sailing.shipName,
            sailing.destination,
            sailing.cruiseLength,
            deck,
            stateroomNumber,
            cabinCategory,
            squareFeetBonus,
            separateBedroom
          );
        }
      }
    });
  });

  insertSailing.finalize();
  insertStateroom.finalize();

  db.run(`
    INSERT INTO audit_log (action, entity_type, details)
    VALUES ('DATABASE_SETUP_PHASE_3', 'SYSTEM', 'Production sailing schedule and sailing inventory installed successfully')
  `);

  db.run('COMMIT', () => {
    console.log('Production database Phase 3 setup complete.');
    console.log('Hotel rooms created: 1300');
    console.log(`Cruise sailings created: ${totalSailings}`);
    console.log(`Cruise stateroom inventory records created: ${totalStaterooms}`);
    console.log(`Schedule year: ${SCHEDULE_YEAR}`);

    db.close();
  });
});