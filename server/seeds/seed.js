// import data
const userSeeds = require('./userSeed.json');
const exerciseSeeds = require('./exerciseSeed.json');
const routineSeeds = require('./routineSeed.json');
const workoutSeeds = require('./workoutSeed.json');

// connect to db
const db = require('../config/connection');

const {User, Exercise, Routine } = require ('../models');

// returns array of generated ids
const getIds = (array) => {
  const idArray = [];
  for (let i = 0; i < array.length; i++) {
    let id = array[i]._id;
    idArray.push(id);
  }

  return idArray;
};


db.once('open', async () => {

  //clear data from tables
  await User.deleteMany({});
  await Exercise.deleteMany({});
  await Routine.deleteMany({});

  console.log('Deleted existing db data');
  
  // create users and get ids
  const createUsers = await User.insertMany(userSeeds);
  const newUserIds = getIds(createUsers);
  console.log('Created Users');

  // add exercises
  const createExercises = await Exercise.insertMany(exerciseSeeds);
  const newExerciseIds = getIds(createExercises);
  console.log('Created Exercises');

  //assign each user an exercise

  for await (const userId of newUserIds) {
    // generate random exercise
    const index = Math.floor(Math.random() * (newExerciseIds.length - 1));

    const exercise = newExerciseIds[index];

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { exercises: exercise }
      }
    );
  }

  console.log('Added Exercises to Users');

  //add routines
  const createRoutines = await Routine.insertMany(routineSeeds);
  const newRoutineIds = getIds(createRoutines);

  console.log('Created Routines');

  //add workouts to routines
  for await (const data of workoutSeeds) {
    let index = Math.floor(Math.random() * (newRoutineIds.length - 1));

    await Routine.findOneAndUpdate(
      {
        _id: newRoutineIds[index]
      },
      { $push: { workouts: data } }
    );
  }


  console.log('Added Workouts to Routines');

  //add Routines to Users
  for await (const routine of newRoutineIds) {
    let index = Math.floor(Math.random() * 4);

    await User.findOneAndUpdate(
      {
        _id: newUserIds[index]
      },
      { $push: { routines: routine } }
    );
  }

  console.log('Database successfully seeded!');
  process.exit(0);

});

