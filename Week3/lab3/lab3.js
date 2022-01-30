const countryRtns = require('./countrycoderoutines');
const env = require('dotenv').config();

asyncPromise = async(fileName) => {
    try {
        let fileExists = await countryRtns.fileExistsPromise(fileName);
        if(fileExists === true) {
            console.log('An existing countries.json was read from the file system.');
            let results = await countryRtns.getJSONFromFSPromise(fileName);
            console.log(`There are ${results.length} codes in the ${process.env.COUNTRYCODEFILE} file`);

        } else {
            let json = await countryRtns.getJSONFromWebPromise(process.env.COUNTRYCODESURL);
            await countryRtns.writeJSONToFSPromise(fileName, json);
            console.log('A new countries.json was written');
            let results = await countryRtns.getJSONFromFSPromise(process.env.COUNTRYCODEFILE);
            console.log(`There are ${results.length} codes in the ${process.env.COUNTRYCODEFILE} file`);
        }
    } catch(err) {
        console.log(err);
    }
};

asyncPromise(process.env.COUNTRYCODEFILE);