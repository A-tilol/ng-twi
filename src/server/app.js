const express = require("express");
const _ = require("lodash");
const twit = require("twit");
const app = express();

// CORS設定
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");

  // デフォルトではOPTIONSのレスポンスは401が返されてしまう
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

var client = new twit({
    consumer_key            : 'kPzkvtB32L1Rb3ZdDYVfHoCl0',
    consumer_secret         : '6xqNvSHB6gYwff87eFHXrqOOLnDd5XZxUYGJA7KF0Mi20WpZZI',
    access_token            : '216861683-vMGMZIIUzOQ8nxJHtAaNlYStQlkiII8ikOogzn3V',
    access_token_secret     : '5HtG82NeUM9uCkCRxaVHql9dUPJdxDO8rutGCzYtEDfKR'
});

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});


// var stream = client.stream("statuses/filter", {track: "java"});

// stream.on("tweet", tw => {
//   let text = tw.text;
//   let user_name = tw.user.name;
//   console.log(user_name + ": " + text);
// });

function getParam(req){
  const param = _.clone(req.params);
  _.extend(param, req.query);
  return param;
}

app.get("/", function(req, res, next){
  console.log(req);
});


app.get("/api/twi/search/:searchWords", function(req, res, next){
    client.get("search/tweets", {q: req.params.searchWords})
    .then(restwi => {
      res.json(restwi.data.statuses);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/api/twi/timeline", function(req, res, next){
    client.get('statuses/home_timeline', function (err, reply, response) {
      res.json(reply);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/api/twi/mentions", function(req, res, next){
    client.get('statuses/mentions_timeline', function (err, reply, response) {
      res.json(reply);
    })
    .catch(err => {
      console.log(err);
    });
});