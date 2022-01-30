const fileRtns = require('./fileroutines');
const env = require('dotenv').config();
const dbRoutines = require('./dbroutines');
const mongoClient = require('mongodb').MongoClient;

let alertsCollectionSetup = async() => {
    let results = '';
    const conn = await mongoClient.connect(process.env.DBURL);
    try {
        // process country constant
        let countryFileExists = await fileRtns.fileExistsPromise(process.env.COUNTRYCODEFILE);
        if(countryFileExists) {
            results += `An existing ${process.env.COUNTRYCODEFILE} was read from the file system. `;
        } else {
            let countryJson = await fileRtns.getJSONFromWebPromise(process.env.COUNTRYCODESURL);
            await fileRtns.writeJSONToFSPromise(process.env.COUNTRYCODEFILE, countryJson);
            results += `A new ${process.env.COUNTRYCODEFILE} was written. `;
        }
        let countriesJson = await fileRtns.getCountryJSONFromFSPromise(process.env.COUNTRYCODEFILE);
        results += `There are ${countriesJson.length} codes in the ${process.env.COUNTRYCODEFILE} file. `;

        // process alert constant
        let alertFileExists = await fileRtns.fileExistsPromise(process.env.ALERTFILE);
        if(alertFileExists) {
            results += `An existing ${process.env.ALERTFILE} was read from the file system. `;
        }else{
            let alertJson = await fileRtns.getJSONFromWebPromise(process.env.ALERTURL);
            await fileRtns.writeJSONToFSPromise(process.env.ALERTFILE, alertJson);
            results += `A new ${process.env.ALERTFILE} was written.`;
        }
        let alertsJson = await fileRtns.getAlertJSONFromFSPromise(process.env.ALERTFILE);
        results += `There are ${Object.keys(alertsJson.data).length} nodes in the ${process.env.ALERTFILE}.`;

        // clear out any exisiting alerts in the collection
        const db = conn.db(process.env.DB);

        let deletedResults = await dbRoutines.deleteAll(process.env.ALERTCOLLECTION, db);
        deletedResults.deletedCount > 0 ? results += `Current ${process.env.ALERTCOLLECTION} documents deleted.` :
            results += `Currently no ${process.env.ALERTCOLLECTION} documents in the collection.`;

        let count = [] = await Promise.all(countriesJson.map(async (country) => {
            let alert = alertsJson.data[country.Code];
            let code = null;
            let name = null;
            let value = null;

            if(alert != null){
                code = country.Code;
                name = country.Name;
                value = alert.eng['advisory-text'];
            }else {
                code = country.Code;
                name = country.Name;
                value = 'No travel alerts';
            }let doc = {
                Code: code,
                Name: name,
                Alert: value
            };

            // create object for document


            //add each document to the database
            dbRoutines.addOne(process.env.ALERTCOLLECTION, doc, db);
        }));
        results += `Added ${count.length} documents to the ${process.env.ALERTCOLLECTION} collection. `;
        return {results: results};
    } catch(err) {
        results += `There was a problem: ${err} `;
        return {results: results};
    } finally {
        if(conn) {
            conn.close();
        }
    }
};

module.exports = {alertsCollectionSetup};