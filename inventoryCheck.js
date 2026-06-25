const inventoryService = require('./inventoryService');
const productionDatabase = require('./productionDatabase');

async function checkInventory() {
  try {
    const summary = await inventoryService.getProductionSummary();

    console.log('\nOMNIQA PRODUCTION SUMMARY');
    console.table(summary);

    const miamiRooms =
      await inventoryService.getAvailableHotelRooms(
        'Miami',
        5
      );

    console.log('\nSAMPLE AVAILABLE MIAMI ROOMS');
    console.table(miamiRooms);

    const sailings =
      await inventoryService.getCruiseSailings(5);

    console.log('\nSAMPLE SAILINGS');
    console.table(sailings);

  } catch (error) {
    console.error(
      'Production inventory check failed:',
      error
    );
  } finally {
    productionDatabase.closeDatabase();
  }
}

checkInventory();