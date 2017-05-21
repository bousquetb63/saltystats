var http = require('http');
var path = require('path');
var express = require('express');
var request = require('superagent');
var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

router.get('/account/:username/:game', function (req, res){
  var username = req.params.username;
  var game = req.params.game;
  request.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=154CB94E9D319E3101F13AEFBA52D573&vanityurl=' + username).end(function(err, response){
    //console.log(response.body);
    var data = response.body;
    //console.log(data);
    switch (game) {
      case "CSGO":
        //console.log("hello");
        console.log(data.response.steamid);
        request.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=154CB94E9D319E3101F13AEFBA52D573&steamid=' + data.response.steamid).end(function(err, secondresponse){
          var data2 = secondresponse.body;
          res.send({data2, game: game});
          //console.log(arguments);
        })
      case "D2":
        console.log(data.response.steamid);
        request.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=570&key=154CB94E9D319E3101F13AEFBA52D573&steamid=' + data.response.steamid).end(function(err, secondresponse){
          var data2 = secondresponse.body;
          res.send({data2, game: game});
          //console.log(arguments);
        })
      case "TF2":
        console.log(data.response.steamid);
        request.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=154CB94E9D319E3101F13AEFBA52D573&steamid=' + data.response.steamid).end(function(err, secondresponse){
          var data2 = secondresponse.body;
          res.send({data2, game: game});
          //console.log(arguments);
        })
    } 
  })
})

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
