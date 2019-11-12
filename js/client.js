//import Colyseus from "colyseus.js";
// const Colyseus = 
let client = new Colyseus.Client("ws://localhost:8081");
client.room;
client.sheet;
client.isMatchStarted = false

client.askNewClient = function () {
    client.joinOrCreate("battle").then(room => {
        client.room = room
        room.onMessage((message) => {
            switch (message.messageId) {
                case "inLobby": {
                    client.sheet = message.sheet
                    console.log("waiting...")
                    break;
                }
                case "startMatch": {
                    client.isMatchStarted = true;
                    BootState.state.start('GameState')
                   // BootState.text.setText('game will start within 3 second')
                    //setTimeout(() => { BootState.state.start('GameState') }, 3000)
                    break;
                }
                case "changeRandomText": {
                    console.log("random text changed")
                    break;
                }
                case "updateTime": {
                    //console.log(message.randomNo)
                    GameState.randomNumber = message.randomNo;
                    GameState.isNewNumber = true;
                    console.log(message.randomNo)
                    break;
                }
            }
        })
        client.room.send({ messageId: "generateTicket" })

    }).catch(e => {
        console.error("join error", e);
    });

    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("joined the room")
    //         client.room.send({ messageId: "generateTicket" })
    //         //document.getElementById("demo").innerHTML = this.responseText;
    //     }
    // };
    // xhttp.open("GET", "/joinPlayer", true);
    // xhttp.send();
    // console.log('hhhhhhhhhhhhh')
    // if (client.isMatchStarted == true) {
    //     console.log(hello);

    // } else {

    // }

}





// var Client = {};
// Client.socket = io.connect();
// //console.log()
// Client.askNewClient = function () {
//     Client.socket.emit('room', Client.socket.id);
// }

// Client.socket.on("onGameJoined", data => {
//     console.log("onGameJoined", data.message)
// })
// Client.socket.on("onGameJoin", data => {
//     Client.noOfTickets = data.noOfTickets
//     Client.sheet = data.sheet;
// })
// Client.askSheetTkt = function () {

// }