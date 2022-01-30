const rtnLib = require('./superfancynonblockingrtns');
someAsyncFunction = async (someVar) =>
{
    try {
        let results = await rtnLib.someRtnWithAPromise(someVar);
        console.log(`The 1st call ${results.val1} ${results.val2}`);
        results = await rtnLib.anotherRtnWithAPromise(someVar);
        console.log(`The 2nd call ${results.val1} ${results.val2} successful`);
    } catch (err) {
        console.log(err)
    }
};
someAsyncFunction(process.argv[2]);