var friendsData = require("../data/friends");
var path = require("path");
var bodyParser = require("body-parser");

//console.log(friendsData);
module.exports = function(app) {
    //displays json data from friends array
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

//post request to api/friends endpoint that holds logic for matching user with potential friend
    app.post("/api/friends", function(req, res) {
        //variable to hold body of request
        var userInput = req.body;
        //console.log(userInput);
        //variable to hold user score
        var userResponse = userInput.scores;
        console.log(userResponse);
        //logic to match friends
        var friendMatch = "";
        var imageMatch = "";
        var totalDiff = 1000;
        //looping through friendsArray
        for(var i = 0; i < friendsData.length; i++){
            //initializing diff variable to 0 to compare with total diff
            var diff = 0;
            //looping through each individual friend
            for(var j = 0; j < friendsData[i].length; j++){

                var userScores = userResponse[j];
                var friendScores = friendsData[i].scores[j];

                //diff = diff + friends scores - user scores
                diff = diff + Math.abs(parseInt(userScores) - parseInt(friendScores));
            }
            //compare diff to total diff
            if (diff < totalDiff){
                totalDiff = diff;
                friendMatch = friendsData[i].name;
                imageMatch = friendsData[i].photo;
            }
            console.log(friendMatch);
        }
        //pushing user input into friends data array
        friendsData.push(userInput);
        res.json({status: "okay", friendMatch: friendMatch, imageMatch: imageMatch});
    });
};