const productionDatabase = require('./productionDatabase');

async function getProductionSummary() {
  return productionDatabase.getProductionSummary();
}

async function getAvailableHotelRooms(destination, limit = 10) {
  return productionDatabase.getAvailableHotelRooms(
    destination,
    limit
  );
}

async function getCruiseSailings(limit = 25) {
  return productionDatabase.getCruiseSailings(limit);
}

async function getAvailableCruiseStaterooms(
  sailingId,
  limit = 10
) {
  return productionDatabase.getAvailableCruiseStaterooms(
    sailingId,
    limit
  );
}

module.exports = {
  getProductionSummary,
  getAvailableHotelRooms,
  getCruiseSailings,
  getAvailableCruiseStaterooms
};