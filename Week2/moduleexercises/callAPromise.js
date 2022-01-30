const rtnLib = require('./superfancynonblockingrtns');
// use promise
rtnLib.someRtnWithAPromise(process.argv[2])
    .then(results => {
        console.log(`The call ${results.val1} ${results.val2}`)
    })
    .catch(err => {
        console.log(`Error ==> ${err}` )
    });