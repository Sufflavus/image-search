'use strict';

module.exports = Dal;

function Dal (MongoClient) {
    var historyCollectionName = "history";
    var db;
    
    this.connect = function(connectionString, callback) {
        MongoClient.connect(connectionString, function(err, database) {
          if(err) {
              throw err;
          }
          
          db = database;
          console.log("Listening on port 3000");
          callback();
        });
    };
    
	this.getHistory = function (res) {
	    var urls = db.collection(historyCollectionName);
        
        urls.find({ $query: {}, $orderby: { date: -1 } }).limit(10).toArray(function(err, items) {
            if (err) {
                throw err;
            }
        });
	};
	
	this.addRequestInHistory = function (req, res) {
	    var urls = db.collection(historyCollectionName);
        var historyItem = {query: "", date: ""};
        
        urls.insertOne(historyItem);
	};
}