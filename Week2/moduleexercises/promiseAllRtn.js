const rtnLib = require('./superfancynonblockingrtns');
promiseAllRtn = async (nameArray) => {
    let results = '', concatResults = '';
    try {
        let count = [] = await Promise.all(nameArray.map(async (item) => {
                results = await rtnLib.fullNameWithAPromise(item, 'Somelastname');
                concatResults += results.fullname + '\n'
            }
        ));
        console.log(`Processed ${count.length} names: \n`);
        console.log(concatResults);
    } catch (err) {
        console.log(err);
    }
}
promiseAllRtn(['Bill', 'Jane', 'Bob']);