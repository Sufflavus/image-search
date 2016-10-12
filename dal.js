'use strict';

module.exports = Dal;

function Dal (mongoClient, bingApi) {
    var historyCollectionName = "history";
    var db;
    
    this.connect = function(connectionString, callback) {
        mongoClient.connect(connectionString, function(err, database) {
          if(err) {
              throw err;
          }
          
          db = database;
          
          console.log("Listening on port 3000");
          
          callback();
        });
    };
    
	this.getHistory = function (res) {
	    var history = db.collection(historyCollectionName);
        
        history.find({ $query: {}, $orderby: { date: -1 } })
            .limit(10)
            .toArray(function(err, items) {
                if (err) {
                    throw err;
                }
                
                res.json(items);
            });
	};
	
	this.saveRequestInHistory = function (searchRequest) {
	    var history = db.collection(historyCollectionName);
        
        var historyItem = {
            query: searchRequest, 
            date: new Date()
        };
        
        history.insertOne(historyItem);
	};
	
	this.search = function (searchRequest, offset, res) {
	    bingApi.images(searchRequest, { top: 10, skip: offset }, function(error, response, body) {
            var results = body.d.results.map(function(image) {
                return {
                  "url": image.MediaUrl,
                  "snippet": image.Title,
                  "thumbnail": image.Thumbnail.MediaUrl,
                  "context": image.SourceUrl
                };
            });
            res.json(results);
        });
	}
}