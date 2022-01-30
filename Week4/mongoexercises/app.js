const mongoClient = require('mongodb').MongoClient;
const userRoutines = require('./userroutines');
const coll = 'users';

mongoExercise1 = async() => {
  try {
      let conn = await mongoClient.connect('mongodb://localhost');
      let db = conn.db('Info3069db');
      console.log('Connected to server');
      let user = await userRoutines.findByName(coll, 'John Doe', db);
      console.log(`user ${user.name} found id = ${user._id}`);
      conn.close();
      process.exit();
  }catch(err) {
      console.log(`Houston, we have a problem: ${err}`);
      process.exit();
  }
};

mongoExercise2 = async() => {
  try {
      const conn = await mongoClient.connect('mongodb://localhost');
      const db = conn.db('Info3069db');
      console.log('Connected to server');

      // Set up a new user object
      let joe = await userRoutines.setUser('Joe User', 24, 'ju@here,com');
      //add the new user to db
      let docsAdded = await userRoutines.addOne(coll, joe, db);
      //see if the add worked
      docsAdded.insertedCount === 1 ? console.log(`user ${joe.name} added`) : console.log(`user ${joe.name} mot added`);

      // now see if we can find him
      let user = await userRoutines.findByName(coll, 'Joe User', db);
      console.log(`user ${user.name} found id = ${user._id}`);
      conn.close();
      process.exit();
  }catch(err) {
      console.log(`Houston, we have a problem: ${err}`);
      process.exit();
  }
};

mongoExercise3 = async() => {
  try {
      const conn = await mongoClient.connect('mongodb://localhost');
      const db = conn.db('Info3069db');
      console.log('Connected to server');

      // set up a new user object
      let joe = await userRoutines.setUser('Joe User', 24, 'ju@here.com');
      //add to db and see if it worked
      let docsAdded = await userRoutines.addOne(coll, joe, db);
      docsAdded.insertedCount === 1 ? console.log(`user ${joe.name} was added`) : console.log(`user ${joe.name} was not added`);

      //see if we can find him
      let user = await userRoutines.findByName(coll, 'Kristian User', db);
      console.log(`user ${user.name} was found id = ${user._id}`);

      //update his email
      user.email = 'kristian@here.com';
      let updateResults = await userRoutines.updateOne(coll, user, db);
      console.log(`${updateResults.modifiedCount} user document(s) was updated`);

      //get him one more time and show the email
      user = await userRoutines.findByName(coll, 'Kristian User', db);
      console.log(`user ${user.name}'s updated email is ${user.email}`);
      conn.close();
      process.exit()
  }catch(err) {
      console.log(`Houston, we have a problem: ${err}`);
      process.exit();
  }
};

mongoExercise4 = async () => {
    try {
        const conn = await mongoClient.connect('mongodb://localhost');
        const db = conn.db('Info3069db');
        console.log("Connected to server");

        // set up a new user object
        let joe = await userRoutines.setUser('Kristian User',24,'ju@here.com');
        // add the new user to db
        let docsAdded = await userRoutines.addOne(coll, joe, db);
        // see if the add worked
        docsAdded.insertedCount === 1 ? console.log(`user ${joe.name} added`) : console.log(`user ${joe.name} not added`);

        // now see if we can find him
        let user = await userRoutines.findByName(coll,'Kristian User', db);
        console.log(`user ${user.name} found id = ${user._id}`);

        // update his email
        user.email = 'kristian@here.com'
        let updateResults = await userRoutines.updateOne(coll, user, db);
        console.log(`${updateResults.modifiedCount} user document was updated`);

        // get him one more time and show the updated email
        user = await userRoutines.findByName(coll,'Kristian User', db);
        console.log(`user ${user.name}'s updated email is ${user.email}`);

        // remove him from the db
        let deleteResults = await userRoutines.deleteOne(coll, user, db);
        console.log(`${deleteResults.deletedCount} document was deleted`);
        conn.close();
        process.exit();
    } catch (err) {
        console.log(`Houston we have a problem: ${err}`);
        process.exit(1);
    }
};

//mongoExercise1();
//mongoExercise2();
//mongoExercise3();
mongoExercise4();