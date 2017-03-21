//set strict mode for es6
'use strict';

//require MongoDB
const mongodb = require('mongodb');

//Load the MongoClient interface to connect
const MongoClient = mongodb.MongoClient;

//decalre URL
let fullURL;

//Mongo Connection attributes
const mongoDBUrl = 'mongodb';
const hostWithPort = 'localhost:27017';
const databaseName = 'test';

//concat fullURL
fullURL = mongoDBUrl + '://' + hostWithPort +'/' + databaseName;

//Connect to DB and do some work
MongoClient.connect(fullURL, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    console.log('Connection established to', fullURL);

    //do some work

    db.close();
  }
})
