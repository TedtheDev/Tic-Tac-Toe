//set strict mode for es6
'use strict';

exports.fetchChatMessages = () => {
  //require MongoDB
  const mongodb = require('mongodb');

  //Load the MongoClient interface to connect
  const MongoClient = mongodb.MongoClient;

  //decalre URL
  let fullURL;

  //Mongo Connection attributes
  const mongoDBUrl = 'mongodb';
  const hostWithPort = 'localhost:27017';
  const databaseName = 'tic-tac-toe';

  //concat fullURL
  fullURL = mongoDBUrl + '://' + hostWithPort +'/' + databaseName;

  //Connect to DB and do some work
  MongoClient.connect(fullURL, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
      console.log('Connection established to', fullURL);
      // Get the documents collection
      let collection = db.collection('chatsystem');

      // Insert some users
      collection.find().toArray(function (err, result) {
        if (err) {
          console.log(err);
        } else if (result.length) {
          console.log('Found:', result);
          result;
        } else {
          console.log('No document(s) found with defined "find" criteria!');
        }
        //Close connection
        db.close();
      });
    }
  });
}
