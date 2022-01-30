require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const dataRtns = require('./dbroutines');
const alertSetup = require('./alertsetup');

//define a route to execute the alert setup methods
router.get('/alertsetup', async(req, res) => {
    let msg = await alertSetup.alertsCollectionSetup();
    res.send(`${JSON.stringify(msg)}`);
});

router.get('/countries', async(req,res)=> {
    try {
        const conn = await mongoClient.connect(process.env.DBURL);
        const db = conn.db(process.env.DB);
        let countries = await dataRtns.findAll(process.env.ALERTCOLLECTION, db);
        res.send(countries);
        conn.close()
    }
    catch (err) {
        console.log(err.stack);
        res.status(500).send('get all countries failed - internal server error')
    }
});

router.post('/advisory', async(req,res) => {

    try {
        const conn = await mongoClient.connect(process.env.DBURL);
        const db = conn.db(process.env.DB);
        let countries = await dataRtns.addOne(process.env.ADVISORIESCOLLECTION, req.body, db);
        let message = `${countries.insertedCount} advisories were added.`
        res.send({Msg:message});
    }
    catch (err) {
        console.log(err.stack);
        res.status(500).send('get all countries failed - internal server error')
    }

});

router.get('/advisory/unique/names', async(req, res) => {

    try {
        const conn = await mongoClient.connect(process.env.DBURL);
        const db = conn.db(process.env.DB);
        let names = await dataRtns.findUniqueUsers(process.env.ADVISORIESCOLLECTION, 'Name', db);
        res.send(names);
        conn.close()
    }
    catch (err) {
        console.log(err.stack);
        res.status(500).send('get unique names failed - internal server error')
    }
});

router.get('/advisory/:name', async(req, res) =>{

    try {
        const conn = await mongoClient.connect(process.env.DBURL);
        const db = conn.db(process.env.DB);
        let advisories = await dataRtns.findByName(process.env.ADVISORIESCOLLECTION, req.params.name, db);
        res.send(advisories);
        conn.close()
    }
    catch (err) {
        console.log(err.stack);
        res.status(500).send('get advisories for user failed - internal server error')
    }
});

module.exports = router;