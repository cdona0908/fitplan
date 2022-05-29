// import data
const userSeeds = require('./userSeed.json');
//const categorySeeds = require('./categorySeed.json');
const exerciseSeeds = require('./exerciseSeed.json');
const routineSeeds = require('./routineSeed.json');
const activitySeeds = require('./activitySeed.json')

// connect to db
const db = require('../config/connection');

const {User, Exercise, Activity, Routine } = require ('../models');


db.once('open', async () => {
    try {
         // clean database
        // await Activity.deleteMany({});
        // await Routine.deleteMany({});
        // await User.deleteMany({});
        
        //await Category.deleteMany({});
        //await Category.insertMany(categorySeeds);
        await Exercise.deleteMany({});
        await Exercise.insertMany(exerciseSeeds);
        // await User.insertMany(userSeeds);
        // await Routine.insertMany(routineSeeds);
        // await Activity.insertMany(activitySeeds); 

    } catch (err) {
        console.error(err);
        process.exit(1);
    } 
   
    
    
    

    // bulk create each model
    // const categories = await Category.insertMany(categorySeeds);
    // const exercises = await Exercise.insertMany(exerciseSeeds);
    // const users = await User.insertMany(userSeeds);
    // const routines = await Routine.insertMany(routineSeeds); 
    // const activities = await Activity.insertMany(activitySeeds);
    

    // for (newRoutine of routines) {

    //     // randomly add an activity to a routine
    //     const tempActivity = activities[Math.floor(Math.random() * activities.length)];
    //     newRoutine.activities = tempActivity._id;
    //     await newRoutine.save();

    //     // reference routine on activity model, too
    //     tempActivity.routines.push(newRoutine._id);
    //     await tempActivity.save();

    //     // randomly add a routine to a user
    //     const tempRoutine = routines[Math.floor(Math.random() * routines.length)];
    //     newUser.routines = tempRoutine._id;
    //     await newUser.save();

    //     // reference user on routine model, too
    //     tempRoutine.user.push(newUser._id);
    //     await tempRoutine.save();

    // }


    console.log('Database successfully seeded!');
    process.exit(0);


});

