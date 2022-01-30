let ObjectID = require('mongodb').ObjectID;

let addOne = (coll, doc, db) => db.collection(coll).insertOne(doc);

let deleteAll = (coll, db) => db.collection(coll).deleteMany({});

let findAll = (col1, db) => db.collection(col1).find().toArray();

let findUniqueUsers = (coll, field, db) => db.collection(coll).distinct(field);

let findByName = (coll, name, db) => db.collection(coll).find({Name: name}).toArray();

module.exports = {addOne, deleteAll, findAll, findUniqueUsers, findByName};