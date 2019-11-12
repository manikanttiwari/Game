const colyseus = require("colyseus");
const http = require("http");
const express = require("express");
const port = process.env.port || 8081;


const app = express();
app.use(express.json());

const gameServer = new colyseus.Server({

  server: http.createServer(app),
  express: app
}, function () {
  console.log('server created!')
});
//app.use('/node_modules',express.static(__dirname + '/node_modules'))
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
//app.get('/joinPlayer', function (req, res) {
  const BattleRoom = require('./rooms/BattleRoom')
  gameServer.define("battle", BattleRoom)
    .filterBy(['maxClients']);
//})

console.log("server started!")
console.log("socket connection established!")
gameServer.listen(port);