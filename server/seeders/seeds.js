// import data
const userSeeds = require('./userSeed.json');
const categorySeeds = require('./categorySeed.json');
const exerciseSeeds = require('./exerciseSeed.json');
const routineSeeds = require('./routineSeed.json');
const activitySeeds = require('./activitySeed.json')

// connect to db
const db = require('../config/connection');

const {User, Category, Exercise, Activity, Routine } = require ('../models');


db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    await Category.deleteMany({});
    await Exercise.deleteMany({});
    await Activity.deleteMany({});
    await Routine.deleteMany({});

    // bulk create each model
    const users = await User.insertMany(userSeeds);
    const categories = await Category.insertMany(categorySeeds);
    const exercises = await Exercise.insertMany(exerciseSeeds);
    const activities = await Routine.insertMany(activitySeeds);
    const routines = await Routine.insertMany(routineSeeds);

    for (newRoutine of routines) {

        // randomly add an activity to a routine
        const tempActivity = activities[Math.floor(Math.random() * activities.length)];
        newRoutine.activities = tempActivity._id;
        await newRoutine.save();

        // reference routine on activity model, too
        tempActivity.routines.push(newRoutine._id);
        await tempActivity.save();

        // randomly add a routine to a user
        const tempRoutine = routines[Math.floor(Math.random() * routines.length)];
        newUser.routines = tempRoutine._id;
        await newUser.save();

        // reference user on routine model, too
        tempRoutine.user.push(newUser._id);
        await tempRoutine.save();

    }


    console.log('Database successfully seeded!');
    process.exit(0);


});

