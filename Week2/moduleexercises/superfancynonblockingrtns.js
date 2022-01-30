// some valuable routine that we'll export so others can use it
exports.someOldRtnUsingCallback = (var1, callback) => {
    if (callback && typeof(callback) === 'function') { // make sure callback is a function
        if (var1 === 'err') {
            callback('error') // simulate an error has occurred
        } else {
            callback(undefined, {val1: 'was', val2: 'successful'})
        }
    } else {
        console.log('no callback passed to someRtn');
    }
};
// another valuable routine exported a different way so others can use it
internalNameRtn = (var1, callback) => {
    if (callback && typeof(callback) === "function") { // make sure callback is a function
        if (var1 === 'err') {
            callback('error') // simulate an error has occurred
        } else {
            callback(undefined, {val1: 'was', val2: 'successful'})
        }
    } else {
        console.log('no callback passed to someOtherRtn');
    }
};
// another way to export
module.exports.anotherOldSchoolCallbackRtn = internalNameRtn;

// another exportable routine with a promise
exports.someRtnWithAPromise = (var1) => {
    return new Promise((resolve, reject) => {
        if (var1 === 'err') {
            // Reject the Promise with an error
            reject('some error')
        } else {
            // Resolve (or fulfill) the Promise with data
            let data = {val1: 'was', val2: 'successful'};
            resolve(data)
        }
    })
};

exports.anotherRtnWithAPromise = (var1) => {
    return new Promise((resolve, reject) => {
        if (var1 === 'err') {
            // Reject the Promise with an error
            reject('yet another error')
        } else {
            // Resolve (or fulfill) the Promise with data
            let data = {val1: 'was', val2: 'more', val3: 'successful'};
            resolve(data)
        }
    })
};

exports.fullNameWithAPromise = (var1, var2) => {
    return new Promise((resolve, reject) => {
        if (var1 === 'err') {
            // Reject the Promise with an error
            reject('some severe error')
        } else {
            // Resolve (or fulfill) the Promise with data
            let data = {fullname: `The Customer ${var1}, ${var2}`};
            resolve(data)
        }
    })
};