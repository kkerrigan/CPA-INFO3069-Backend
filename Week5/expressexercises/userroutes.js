require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const dataRtns = require('./userroutines');
const coll = 'users';

// define a default route to retrieve all users
router.get('/', async (req, res) => {
    try {
        const conn = await mongoClient.connect(process.env.DBURL);
        const db = conn.db(process.env.DB);
        let users = await dataRtns.findAll(coll, db);
        res.send(users);
        conn.close()
    }
    catch (err) {
        console.log(err.stack);
        res.status(500).send('get all users failed - internal server error')
    }
});

//define a route to POST a user json to our collection
router.post('/', async(req, res) => {
   try {
       const conn = await mongoClient.connect(process.env.DBURL);
       const db = conn.db(process.env.DB);
       let result = await dataRtns.addOne(coll, req.body, db);
       let message = `${result.insertedCount} user(s) were added.`
       res.send({Msg:message});
       conn.close();
   }
   catch(err) {
       console.log(err.stack);
       res.status(500).send('add new user failed - internal server error');
   }
});

//define a route to GET an individual user by name
router.get('/:name', async(req, res) => {
   try {
       const conn = await mongoClient.connect(process.env.DBURL);
       const db = conn.db(process.env.DB);
       let result = await dataRtns.findByName(coll, req.params.name, db);
       res.send(result);
       conn.close();
   }
   catch(err) {
       console.log(err.stack);
       res.status(500).send('find user by name failed - internal server error');
   }
});

//define a PUT route to update users
router.put('/', async(req, res) => {
    try {
        const conn = await mongoClient.connect(process.env.DBURL);
        const db = conn.db(process.env.DB);
        let user = await dataRtns.findByName(coll, req.body.name, db);
        user.name = req.body.name;
        user.age = req.body.age;
        user.email = req.body.email;
        let result = await dataRtns.updateOne(coll, user, db);
        let message = `${result.modifiedCount} user(s) were updated.`
        res.send({Msg: message});
        conn.close();
    }
    catch(err) {
        console.log(err.stack);
        res.status(500).send('update user failed - internal server error');
    }
});

//define a DELETE route to delete a user based on name
router.delete('/:name', async(req, res) => {
    try {
        const conn = await mongoClient.connect(process.env.DBURL);
        const db = conn.db(process.env.DB);
        let user = await dataRtns.findByName(coll, req.params.name, db);
        let result = await dataRtns.deleteOne(coll, user, db);
        res.send(`${result.deletedCount} user(s) were deleted.`);
        conn.close();
    }
    catch(err) {
        console.log(err.stack);
        res.status(500).send('delete user failed - internal server error');
    }
});

module.exports = router;