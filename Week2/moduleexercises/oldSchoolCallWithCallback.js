const rtnLib = require('./superfancynonblockingrtns')
rtnLib.someOldRtnUsingCallback(process.argv[2], (errorMessage, results) => {
    if (errorMessage) {
        console.log(`Error ==> ${errorMessage}` )
    } else {
        console.log(`The call ${results.val1} ${results.val2}`)
    }
});
rtnLib.anotherOldSchoolCallbackRtn(process.argv[2], (errorMessage, results) => {
// let's use a ternary operation this time instead of if..else
// ? = if, : = else
    errorMessage ?
        console.log(`Other Error ==> ${errorMessage}` ) :
        console.log(`The other call ${results.val1} ${results.val2}`)
});
// now don't pass a callback and see what happens
rtnLib.someOldRtnUsingCallback('foo', 'bar');
rtnLib.anotherOldSchoolCallbackRtn('foo', 'bar');