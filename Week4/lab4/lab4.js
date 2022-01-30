const env = require('dotenv').config();
const fileRoutines = require('./fileroutines');
const dbRoutines = require('./dbroutines');
const mongoClient = require('mongodb').MongoClient;

asyncPromise = async(fileName) => {
    try {
        // get the JSON data
        let fileExists = await fileRoutines.fileExistsPromise(fileName);
        let records = null;
        if(fileExists) {
            console.log(`An existing ${fileName} was read from the file system.`);
            records = await fileRoutines.getJSONFromFSPromise(fileName);
        } else {
            let json = await fileRoutines.getJSONFromWebPromise(process.env.COUNTRYCODESURL);
            await fileRoutines.writeJSONToFSPromise(fileName, json);
            console.log(`A new ${fileName} was written`);
            records = await fileRoutines.getJSONFromFSPromise(fileName);
        }

        // Now clear out db collection and insert the countries
        const conn = await mongoClient.connect(process.env.DBURL);
        let db = conn.db(process.env.DB);
        console.log(`Connected to ${process.env.DBURL}/${process.env.DB}`);

        let deletedResults = await dbRoutines.deleteAll(process.env.COUNTRYCOLLECTION, db);
        deletedResults.deletedCount > 0 ? console.log(`Current ${process.env.COUNTRYCOLLECTION} documents deleted`) :
            console.log(`Currently no ${process.env.COUNTRYCOLLECTION} documents in the collection`);
        let insertedResults = await dbRoutines.addMany(records, process.env.COUNTRYCOLLECTION, db);
        console.log(`${insertedResults.insertedCount} documents added to the ${process.env.COUNTRYCOLLECTION} collection`);
        conn.close();
        process.exit()
    } catch(err) {
        console.log(`There was a problem: ${err}`);
        process.exit();
    }
};

asyncPromise(process.env.COUNTRYCODEFILE);