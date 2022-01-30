const fs = require('fs');
const env = require('dotenv');

let fileExistsPromise = (file) =>
    new Promise((resolve, reject) => {
        fs.stat(file, (err, data) => err ? resolve(false) : resolve(true))
    });

let getJSONFromWebPromise = (www) => {
    let request = require('request');
    const srcAddr = www;

    return new Promise((resolve, reject) => {
        request(srcAddr, (err, res, body) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(body));
        });
    });
};

let writeJSONToFSPromise = (file, json) =>
    new Promise((resolve, reject) =>
        fs.writeFile(file, JSON.stringify(json), 'UTF-8', (err) => err ? reject(err) : resolve(true))
    );

let getJSONFromFSPromise = (file) =>
    new Promise((resolve, reject) =>
        fs.readFile(file, 'utf8', (err, data) => err ? reject(err) : resolve(JSON.parse(data))
        ));

module.exports = {fileExistsPromise, getJSONFromWebPromise, writeJSONToFSPromise, getJSONFromFSPromise};