const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./omniqa.db');

db.serialize(() => {
  db.run('DELETE FROM rooms');
  db.run('DELETE FROM staterooms');

  const roomStatement = db.prepare(
    'INSERT INTO rooms (room_id, status) VALUES (?, ?)'
  );

  for (let roomId = 1001; roomId <= 1005; roomId++) {
    roomStatement.run(roomId, 'available');
  }

  roomStatement.finalize();

  const stateroomStatement = db.prepare(
    'INSERT INTO staterooms (stateroom_id, status) VALUES (?, ?)'
  );

  for (let stateroomId = 2001; stateroomId <= 2004; stateroomId++) {
    stateroomStatement.run(stateroomId, 'available');
  }

  stateroomStatement.finalize();

  console.log('Database seeded successfully.');
});

db.close();