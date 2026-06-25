const productionDatabase = require('./productionDatabase');

async function bookRoom(destination = 'Miami') {
  try {
    const room = await productionDatabase.get(
      `
      SELECT *
      FROM hotel_rooms
      WHERE destination = ?
        AND status = 'available'
      ORDER BY room_number
      LIMIT 1
      `,
      [destination]
    );

    if (!room) {
      console.log(`No available rooms found in ${destination}.`);
      return;
    }

    await productionDatabase.run(
      `
      UPDATE hotel_rooms
      SET status = 'booked'
      WHERE id = ?
      `,
      [room.id]
    );

    await productionDatabase.run(
      `
      INSERT INTO reservations (
        reservation_type,
        product_type,
        destination,
        room_number,
        guest_name,
        status
      )
      VALUES (
        'STANDARD',
        'HOTEL',
        ?,
        ?,
        'OmniQA Test Guest',
        'active'
      )
      `,
      [
        destination,
        room.room_number
      ]
    );

    await productionDatabase.run(
      `
      INSERT INTO audit_log (
        action,
        entity_type,
        details
      )
      VALUES (
        'ROOM_BOOKED',
        'HOTEL_ROOM',
        ?
      )
      `,
      [
        `Room ${room.room_number} booked in ${destination}`
      ]
    );

    console.log(
      `Room ${room.room_number} booked successfully in ${destination}.`
    );

  } catch (error) {
    console.error('Booking failed:', error);
  } finally {
    productionDatabase.closeDatabase();
  }
}

bookRoom();