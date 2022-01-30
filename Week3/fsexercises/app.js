const rtns = require('./fileroutines');
const env = require('dotenv').config();

userFile = async () => {
    let exists = await rtns.usersJSONExistsPromise();
    if(!exists) {
        try {
            users = [];
            let rawData = await rtns.getRawUsersFromFSPromise();
            rawData.split('\r\n').map(user => {
                if (user.length > 0) {
                    let userJson = {'Username': user, 'Email': user + '@abc.com'}
                    users.push(userJson)
                }
            });

            users.map(user => console.log(`user ===>${user.Username}, email===>${user.Email}`));

            await rtns.writeUsersJSONToFSPromise(JSON.stringify((users))) ?
                console.log('user JSON file written to file system.') :
                console.log('user JSON file NOT written to file system.');
        }
        catch (err) {
            console.log(err)
        }
    } else {
        console.log('using existing users file.');
    }
};
userFile();