var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');

//global variable for tweet data
var tweetinfo = []
var recentSearch = []


//var tweetId = 2;

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo =  JSON.parse(data);
    tweetinfo.forEach(function(tweet, index) {
      tweet.id = tweet.id_str;
    })
    console.log("data loaded")
  }
});


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //send in the tweetinfo
  res.send({tweetinfo: tweetinfo})
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
 //send in the tweet info
  res.send({tweetinfo: tweetinfo})
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //get the searched tweets
  //store all of the results here
  var arrayResults=[];

  recentSearch.forEach(function(id, index) {
    tweetinfo.forEach(function(product, i)
    {
      //check if ids match
      if(product.id_str == id)
      {
        //log the id
        console.log(id, index)
        //add product to array
        arrayResults.push(product);
      }
    });

  });
  //send the info to the array results
  res.send({tweetinfo: arrayResults})
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //creating a new tweet

  //the created tweet info from the input
  var inputString = req.body.name;

  //split up the string into an array with id and name
  var parsedStrings = inputString.split(';');
  var tweetId = parsedStrings[0];
  var tweetName = parsedStrings[1];
  var date = new Date(Date.now());


    //add the new info to tweetinfo
    tweetinfo.push({
        id: tweetId,
        text: tweetName,
        created_at : date
    });

      res.send('Successfully created product!');

});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //searching a tweet
  //get id 
  var id = req.body.tweetid;

  //see if given id equals one of ours
  //if so add to recent search array
  //send info
  tweetinfo.forEach(function(product, index) {
    if (product.id_str == id) {
      recentSearch.push(id);
      res.send({tweetinfo: [product]})
    }
});
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //updating the user name

  //get the old name and the newName
  var name = req.params.nm;
  var newName = req.body.name;

  //check to see if the user name appears in our dat
  //if so update the old name to the new name
  tweetinfo.forEach(function(product, index) {
    if (product.user.name == name) {
        product.user.screen_name = newName;
        res.send('Succesfully updated product!').end();
    }
});
res.status(400).send({"message": "not found"});

  
  
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res)  {
  //delete a tweet

  //get tweet id
  var id = req.body.tweetid;

    var found = false;

    //check to see if the id we are trying to deleted is in our data
    //if so delete it 
    //relog our updated info
    tweetinfo.forEach(function(product, index) {
      console.log(product.id_str, id)
        if (product.id == id) {
            tweetinfo.splice(index, 1);
            console.log(tweetinfo);
        }
    });

    res.send('Successfully deleted product!');
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});