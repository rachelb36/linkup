const connectDb = require('../config/connection');
const { User, Employee, Event } = require('../models');
const userSeeds = require('./userSeeds.json');
const employeeSeeds = require('./employeeSeeds.json');
const eventSeeds = require('./eventSeeds.json');
const cleanDB = require('./cleanDB');

connectDb.once('open', async () => {
  try {
    await cleanDB(connectDb);
    console.log('Database cleaned successfully');
    console.log(userSeeds);

    await User.create(userSeeds);
    console.log('User seeds inserted successfully');

    await Employee.create(employeeSeeds);
    console.log('Employee seeds inserted successfully');

    await Event.create(eventSeeds);
    console.log('Event seeds inserted successfully');

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    console.error('Error encountered:', err);
    process.exit(1);
  }
});





// const connectDb = require('../config/connection');
// const { User, Employee, Event } = require('../models');
// const userSeeds = require('./userSeeds.json');
// const employeeSeeds = require('./employeeSeeds.json');
// const eventSeeds = require('./eventSeeds.json');
// const cleanDB = require('./cleanDB');

// connectDb.once('open', async () => {
//   try {
//     // Check if the database connection is open
//     if (!connectDb.readyState) {
//       throw new Error('Database connection failed to open.');
//     }

//     // Clean the database before seeding
//     await cleanDB(connectDb);
//     console.log('Database cleaned successfully');

//     // Insert User seeds
//     if (userSeeds && userSeeds.length > 0) {
//       await User.create(userSeeds);
//       console.log('User seeds inserted successfully');
//     } else {
//       console.warn('No user seeds found');
//     }

//     // Insert Employee seeds
//     if (employeeSeeds && employeeSeeds.length > 0) {
//       await Employee.create(employeeSeeds);
//       console.log('Employee seeds inserted successfully');
//     } else {
//       console.warn('No employee seeds found');
//     }

//     // Insert Event seeds
//     if (eventSeeds && eventSeeds.length > 0) {
//       await Event.create(eventSeeds);
//       console.log('Event seeds inserted successfully');
//     } else {
//       console.warn('No event seeds found');
//     }

//     console.log('All done!');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error encountered:', err.message || err);
//     process.exit(1);
//   }
// });

// const connectDb = require('../config/connection');
// const { User, Employee, Event } = require('../models');
// const userSeeds = require('./userSeeds.json');
// const employeeSeeds = require('./employeeSeeds.json');
// const eventSeeds = require('./eventSeeds.json');
// const cleanDB = require('./cleanDB');

// connectDb.once('open', async () => {
//   try {
//     await cleanDB(connectDb);
//     console.log('Database cleaned successfully');
//     console.log(userSeeds);

//     await User.create(userSeeds);
//     console.log('User seeds inserted successfully');

//     await Employee.create(employeeSeeds);
//     console.log('Employee seeds inserted successfully');

//     await Event.create(eventSeeds);
//     console.log('Event seeds inserted successfully');

//     console.log('All done!');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error encountered:', err);
//     process.exit(1);
//   }
// });
