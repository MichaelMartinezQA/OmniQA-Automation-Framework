const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const inventoryService = require('./inventoryService');

const app = express();
const PORT = 3000;

const MAX_ROOMS = 5;
const MAX_STATEROOMS = 3;

const sessions = new Map();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

function createInventory() {
  return {
    rooms: MAX_ROOMS,
    staterooms: MAX_STATEROOMS,
    roomBookings: 0,
    stateroomBookings: 0
  };
}

function getCookie(req, name) {
  const cookieHeader = req.headers.cookie || '';
  const cookies = cookieHeader.split(';').map(cookie => cookie.trim());

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');

    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
}

function getSessionInventory(req, res) {
  let sessionId = getCookie(req, 'omniqaSessionId');

  if (!sessionId || !sessions.has(sessionId)) {
    sessionId = crypto.randomUUID();
    sessions.set(sessionId, createInventory());

    res.cookie('omniqaSessionId', sessionId, {
      httpOnly: true,
      sameSite: 'lax'
    });
  }

  return sessions.get(sessionId);
}

function isValidType(type) {
  return type === 'room' || type === 'stateroom';
}

app.get('/api/inventory-summary', async (req, res) => {
  try {
    const summary = await inventoryService.getProductionSummary();

    res.json({
      success: true,
      summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load inventory summary',
      error: error.message
    });
  }
});

app.get('/api/hotel-rooms/:destination', async (req, res) => {
  try {
    const rooms = await inventoryService.getAvailableHotelRooms(
      req.params.destination,
      25
    );

    res.json({
      success: true,
      destination: req.params.destination,
      rooms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load hotel rooms',
      error: error.message
    });
  }
});

app.get('/api/sailings', async (req, res) => {
  try {
    const sailings = await inventoryService.getCruiseSailings(25);

    res.json({
      success: true,
      sailings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load cruise sailings',
      error: error.message
    });
  }
});

app.post('/api/reset', (req, res) => {
  const sessionId = crypto.randomUUID();
  const inventory = createInventory();

  sessions.set(sessionId, inventory);

  res.cookie('omniqaSessionId', sessionId, {
    httpOnly: true,
    sameSite: 'lax'
  });

  res.json({
    success: true,
    rooms: inventory.rooms,
    staterooms: inventory.staterooms
  });
});

app.get('/api/inventory', (req, res) => {
  const inventory = getSessionInventory(req, res);

  res.json({
    rooms: inventory.rooms,
    staterooms: inventory.staterooms
  });
});

app.post('/api/booking', (req, res) => {
  const inventory = getSessionInventory(req, res);
  const { type } = req.body || {};

  if (!isValidType(type)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid booking type'
    });
  }

  if (type === 'room') {
    if (inventory.rooms <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No rooms available'
      });
    }

    inventory.rooms -= 1;
    inventory.roomBookings += 1;

    return res.json({
      success: true,
      type,
      rooms: inventory.rooms,
      staterooms: inventory.staterooms
    });
  }

  if (inventory.staterooms <= 0) {
    return res.status(400).json({
      success: false,
      message: 'No staterooms available'
    });
  }

  inventory.staterooms -= 1;
  inventory.stateroomBookings += 1;

  return res.json({
    success: true,
    type,
    rooms: inventory.rooms,
    staterooms: inventory.staterooms
  });
});

app.post('/api/cancel', (req, res) => {
  const inventory = getSessionInventory(req, res);
  const { type } = req.body || {};

  if (!isValidType(type)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid cancellation type'
    });
  }

  if (type === 'room') {
    if (inventory.roomBookings <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No room booking available to cancel'
      });
    }

    inventory.rooms += 1;
    inventory.roomBookings -= 1;

    return res.json({
      success: true,
      type,
      rooms: inventory.rooms,
      staterooms: inventory.staterooms
    });
  }

  if (inventory.stateroomBookings <= 0) {
    return res.status(400).json({
      success: false,
      message: 'No stateroom booking available to cancel'
    });
  }

  inventory.staterooms += 1;
  inventory.stateroomBookings -= 1;

  return res.json({
    success: true,
    type,
    rooms: inventory.rooms,
    staterooms: inventory.staterooms
  });
});

app.listen(PORT, () => {
  console.log(`OmniQA server running at http://localhost:${PORT}`);
});