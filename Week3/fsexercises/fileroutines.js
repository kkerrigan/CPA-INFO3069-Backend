const fs = require('fs');
const env = require('dotenv');

let getRawUsersFromFSPromise = () =>
    new Promise((resolve, reject) =>
        fs.readFile(process.env.USERSRAW, 'UTF-8', (err, data) => err ? reject(err) : resolve(data))
    );

let writeUsersJSONToFSPromise = (users) =>
    // write JSON string to file
    new Promise((resolve,reject) =>
        fs.writeFile(process.env.USERSJSON, users, 'UTF-8', (err) => err ? reject(err) : resolve(true))
    );

let usersJSONExistsPromise = () =>
    new Promise((resolve,reject) => {
       fs.stat(process.env.USERSJSON, (err,data) => err ? resolve(false) : resolve(true))
    });

module.exports = {getRawUsersFromFSPromise, writeUsersJSONToFSPromise, usersJSONExistsPromise};