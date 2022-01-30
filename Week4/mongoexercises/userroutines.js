let ObjectID = require('mongodb').ObjectID;

let findAll = (coll, db) => db.collections(coll).find().toArray();

let findByName = (coll, name, db) => db.collection(coll).findOne({name: name});

let findUniqueValues = (coll, field, db) => db.collections(coll).distinct(field);

let setUser = (name, age, email) => {
  return new Promise((resolve, reject) => {
     resolve({
         // with property value short-hand syntax, you can omit the property value if key matches with variable name
         // So this is just a short-form of resolve({name: name, age: age, email: email})
         name, age, email
     });
  });
};

let addOne = (coll, user, db) => db.collection(coll).insertOne(
    {name: user.name, age: user.age, email: user.email}
);

let updateOne = (coll, user, db) => {
  let realId = new ObjectID(user._id);
  return db.collection(coll).updateOne(
      {_id: realId}, {$set: {name: user.name, age: user.age, email: user.email}}
  );
};

let deleteOne = (coll, user, db) => {
  let realId = new ObjectID(user._id);
  return db.collection(coll).deleteOne({_id: realId});
};

module.exports = {findByName, setUser, addOne, updateOne, deleteOne, findUniqueValues, findAll};