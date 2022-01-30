const rtnLib = require('./superfancynonblockingrtns')
// use promise rtn 1
rtnLib.someRtnWithAPromise(process.argv[2])
    .then(results => {
        console.log(`The 1st call ${results.val1} ${results.val2}`)
        // use promise rtn 2
        return rtnLib.anotherRtnWithAPromise(process.argv[2])
    }) // here's the 2nd link in the chain
    .then(results => {
        console.log(`The 2nd call ${results.val1} ${results.val2} ${results.val3}`)
        process.exit()
    })
    .catch(err => {
        console.log(`Error ==> ${err}` )
        process.exit(1, err)
    });