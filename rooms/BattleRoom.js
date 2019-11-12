const colyseus = require('colyseus')
const State = require("./State")
class BattleRoom extends colyseus.Room {

    // When room is initialized
    onCreate() {
        this.maxClients = 2;
        this.setState(State.player)
    }

    // When client successfully join the room
    onJoin(player) {
        this.state.roomId = this.roomId;
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    // onAuth(client, options, request) { }

    // When a client sends a message
    async onMessage(player, message) {
        switch (message.messageId) {
            case "generateTicket": {
                await this.state.initializePlayer();
                this.clients[player.sessionId] = player.sessionId;
                this.send(player, { messageId: "inLobby", sheet: this.state.sheet, noOfPlayersJoined: this.listing.clients })
                if (this.listing.clients === this.maxClients) {
                    this.arr = await this.state.generateUniqueRndmNoArr(1, 90).catch((err) => { console.log(err) })
                    this.randomNoIndex = 0
                    this.broadcast({ messageId: "startMatch" })
                    this.clock.setInterval(() => {
                        this.update()
                    }, 5000)
                }
                break;
            }
        }
    }
    update() {
        this.broadcast({ messageId: "updateTime", randomNo: this.arr[this.randomNoIndex] })
        this.randomNoIndex++;

    }

    // When a client leaves the room
    onLeave(client, consented) {
        console.log("leaved the room with ID " + this.roomId)
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() { }
}
module.exports = BattleRoom;