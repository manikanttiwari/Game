const BINGOWORDS = ["Top of the house number 1", "Kaala dhan", "Goodness Me", "Knock at the door", "Symbol of congress", "Super sixer", "Colours of rainbow", "Big fat lady number 8", "Number of planets in solar system number 9", "A big fat hen", "1 and 1 eleven", "One dozen", "Unlucky for some lucky for me no. thirteen", "Valentine Day", "Yet to be kissed", "Sweet sixteen", "Dancing Queen", "Voting age", "End of the teens", "Blind 20", "President salute", "Two little ducks", "You and me", "Two dozen", "Silver Jublee Number", "Republic Day", "Gateway to heaven", "Duck and its mate", "In your prime", "Its middle Age", "Time for fun", "Mouth Full", "All the 3s", "Dil mange more", "Flirty Husband", "Popular Number", "Mixed luck", "Oversize", "Watch your waistline", "Naughty 40", "Life's begun at 41", "Quit India Movement", "Pain in the knee", "All the fours", "Halfway there", "Up to tricks", "Year of Independence", "Four dozen", "Rise and shine", "Half a century, Golden Jublee", "Charity begins at 51", "Pack of cards", "Pack with a joker", "Pack with two jokers", "All the fives", "Pick up sticks", "Mutiny Year", "Time to retire", "Just retired", "Five dozen", "Bakers bun", "Click the two", "Click the three", "Catch the chor", "Old age pension", "Chakke pe chakka", "Made in heaven", "Saving grace", "Ulta Pulta", "Lucky blind", "Lucky bachelor", "Lucky couple", "A crutch and a flea", "Lucky chor", "Diamond Jublee", "Lucky six", "Two hockey sticks", "Heaven's gate", "lucky nine", "Gandhi's breakfast", "Corner shot", "Last of the two", "India wins Cricket World Cup", "Last of the chors", "Grandma", "Last six", "Grandpa", "Two fat ladies", "All but one", "Top of the house"];
var row1 = 0, row2 = 0, row3 = 0, mn = 1, mx = 27, ex = [];
var ROOMS = [];
var count = 0
const ROOM = {
    name: "",
    noOfTickets: 2,
    min_player: 2,
    max_player: 5,
    status: "waiting",
    joined_player: [],
    bingo_instance: null,
    get_vacant: async () => {
        let room = null;
        for (var i = 0; i < ROOMS.length; i++) {
            //console.log(ROOMS[i].joined_player.length , ROOMS[i].max_player)
            if (ROOMS[i].joined_player.length < ROOMS[i].max_player && ROOMS[i].status == "waiting") {
                room = ROOMS[i];
            }
        }
        return room;
    },
    createRoom: () => {
        let newRoom = Object.assign({}, ROOM);
        console.log("create room ", newRoom)
        newRoom.name = "ROOM_" + new Date().getTime();
        let bingoInstance = Object.assign({}, BINGO);
        bingoInstance.selectedNumbers = [];
        bingoInstance.sheetPlaces = [];
        newRoom.bingo_instance = bingoInstance;
        newRoom.joined_player = [];
        ROOMS.push(newRoom)
        return newRoom;
    },
    joinRoom: async (newRoom, player_id) => {
        let player = Object.assign({}, PLAYER);
        player.player_id = player_id;
        let bingoInstance = Object.assign({}, BINGO);
        bingoInstance.selectedNumbers = [];
        bingoInstance.sheetPlaces = [];
        player.bingo_instance = bingoInstance;

        let newSheet = await TICKET.generateSheet(player.bingo_instance, newRoom.noOfTickets);
        player.sheet = newSheet;
        newRoom.joined_player.push(player);
    }
}
const TICKET = {
    places: [],
    number: [],
    generateSheet: async (bingo, noOfTickets) => {

        let sheet = [];
        var place = [];


        for (let j = 0; j < noOfTickets; j++) {
            place = BINGO.generateRandomPosition(1, 27);
            //console.log(place)
            for (let i = 1; i <= 15; i++) {
                sheet.push({ place: place[i], number: bingo.generateNextNumber(bingo, place[i].number) });

            }
            //console.log(j+"helllllllo")
            // for (let i = 1; i <= 15; i++) {

            //     // console.log(count)
            //     // place[i] = bingo.generateNextPlace(bingo);
            //     // sheet.push({ place: place[i], number: bingo.generateNextNumber(bingo, place[i].number) });
            //     count++
            // }

        }
        console.log(sheet.length)
        return sheet;
    }
}
const BINGO = {

    selectedNumbers: [],
    sheetPlaces: [],
    claims: [
        { name: "Early Five", points: 1500, status: 0 },
        { name: "First Row", points: 1000, status: 0 },
        { name: "Second Row", points: 1000, status: 0 },
        { name: "Last Row", points: 1000, status: 0 },
        { name: "Four Corner", points: 2000, status: 0 },
        { name: "King Queen", points: 2500, status: 0 },
        { name: "Full House", points: 3000, status: 0 },
    ],
    generateRandomPosition: function (min, max) {
        var row1 = 0;
        var row2 = 0;
        var row3 = 0;
        var arr = []
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var isFound = false;
        //var arrIndex = 0
        arr[0] = { status: "OK", number: random }
        row1++;
        row2++;
        row3++;
        //console.log(arr.length)
        while (arr.length <= 15) {
            isFound = false
            random = Math.floor(Math.random() * (max - min + 1)) + min;
            for (var i = 0; i < arr.length; i++) {
                //console.log(arr[i].number)
                if (random == arr[i].number) {
                    isFound = true;
                    break;
                }
            }
            if (isFound == false) {
                if (random > 0 && random < 10 && row1 <= 5) {
                    arr.push({ status: "OK", number: random })
                    row1++;
                }
                if (random >= 10 && random < 19 && row2 <= 5) {
                    arr.push({ status: "OK", number: random })
                    row2++;
                }
                if (random >= 19 && random < 28 && row3 <= 5) {
                    arr.push({ status: "OK", number: random })
                    row3++;
                }

            }
            // if (arr.indexOf(random) == -1) {
            //     arr.push({ status: "OK", number: random })
            // }
        }
        //console.log("arr")

        return arr;
    },
    generateRandom: (min, max) => {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    },
    generateNextRandom: (bingo, min, max) => {
        min = min || 1;
        max = max || 90;
        if (bingo.selectedNumbers.length > 89) {
            return { status: "All numbers Exhausted", number: 0 };
        }
        var random = bingo.generateRandom(min, max);
        while (bingo.selectedNumbers.indexOf(random) > -1) {
            random = bingo.generateRandom(min, max);
        }
        console.log("Flashed no counter", bingo.selectedNumbers.length, " no", random);
        bingo.selectedNumbers.push(random);
        return { status: "OK", number: random };
    },
    generateNextNumber: (bingo, sheetPlace) => {
        if (bingo.selectedNumbers.length > 89) {
            return { status: "All numbers Exhausted", number: 0 };
        }
        let col = 1;
        if (sheetPlace == 1) {
            col = sheetPlace;
            min = 1;
            max = 9;
        } else {
            col = sheetPlace % 9;
            if (col == 0) col = 9;
            min = (col * 10) - 10;
            if (col == 1) min = 1;
            max = (col * 10) - 1;
        }

        var random = bingo.generateRandom(min, max);
        while (bingo.selectedNumbers.indexOf(random) > -1) {
            random = bingo.generateRandom(min, max);
        }
        bingo.selectedNumbers.push(random);
        return { status: "OK", number: random };
    },
    generateNextPlace: (bingo) => {
        if (row1 >= 5 && row2 >= 5 && row3 >= 5) {
            mn = 1, mx = 27;
            row1 = 0, row2 = 0, row3 = 0;
            ex = [];
        }

        if (bingo.sheetPlaces.length > 27) {
            return { status: "All numbers Exhausted", number: 0 };
        }
        var random = bingo.generateRandom(mn, mx);
        //console.log(random, "  and ",bingo.sheetPlaces);
        while (bingo.sheetPlaces.indexOf(random) > -1 || ex.includes(random)) {
            random = bingo.generateRandom(mn, mx);

        }
        if (random >= 1 && random <= 9) row1++;
        if (random >= 10 && random <= 18) row2++;
        if (random >= 19 && random <= 27) row3++;
        if (row3 == 5) mx = 18;
        if (row1 == 5) mn = 10;
        if (row2 == 5) {
            ex = [10, 11, 12, 13, 14, 15, 16, 17, 18];
        }
        if (row1 == 5 && row2 == 5) mn = 19;
        if (row1 == 5 && row3 == 5) {
            mn = 10, mx = 18;
        }
        if (row2 == 5 && row3 == 5) mx = 9;

        bingo.sheetPlaces.push(random);
        return { status: "OK", number: random };
    }
};
const PLAYER = {
    player_id: null,
    bingo_instance: null,
    sheet: [],
    tickets: []
}

const joinPlayer = async (player_id) => {
    let room = Object.assign({}, ROOM);
    let available_room = await room.get_vacant();
    if (available_room) {
        console.log("available room", available_room)
        await available_room.joinRoom(available_room, player_id)
        return available_room;
    } else {
        let newRoom = room.createRoom();
        await newRoom.joinRoom(newRoom, player_id);
        return newRoom
    }

}
const sendNumber = (io) => {

    if (ROOMS.length > 0) {
        ROOMS.map((room, i) => {
            if (room.min_player == room.joined_player.length && room.status == "waiting") {
                setInterval(() => {
                    let number = BINGO.generateNextRandom(room.bingo_instance);
                    //console.log(number);
                    ROOMS[i].status = "Running";
                    io.sockets.in(room.name).emit("onNumber", { message: BINGOWORDS[number], number: number });

                }, 5000)
            }
        })
    }
}

const sendPoints = (io, ruleno, player_id, claimedNos, psheet) => {
    let rowCounter = [0, 0, 0, 0, 0, 0, 0];
    let startLimit = [0, 0, 10, 20, 0, 0, 0], endLimit = [27, 9, 18, 27, 27, 0, 27], fourCorner = [1, 9, 19, 27];
    let maxMatch = 5, king = 1, queen = 89;
    if (ruleno == 5) {
        for (let i = 0; i < psheet.length; i++) {
            if (psheet[i].number.number >= king) king = psheet[i].number.number;
            if (psheet[i].number.number <= queen) queen = psheet[i].number.number;
        }
    }

    console.log("in sendPoints with rule ", ruleno, " status ", BINGO.claims[ruleno].status)
    if (BINGO.claims[ruleno].status == 0) {
        for (let i = 0; i < psheet.length; i++) {
            if (ruleno == 0) {
                if (claimedNos.indexOf(psheet[i].number.number) != -1) rowCounter[ruleno]++;
                if (rowCounter[ruleno] >= maxMatch) break;
            } else if (ruleno == 4) {
                if (claimedNos.indexOf(psheet[i].number.number) != -1 && (fourCorner.indexOf(psheet[i].place.number)) != -1) rowCounter[ruleno]++;
                if (rowCounter[ruleno] == 4) rowCounter[ruleno]++;
            } else if (ruleno == 5) {
                if (claimedNos.indexOf(psheet[i].number.number) != -1 && (psheet[i].number.number == queen)) rowCounter[ruleno]++;
                if (claimedNos.indexOf(psheet[i].number.number) != -1 && (psheet[i].number.number == king)) rowCounter[ruleno]++;
                if (rowCounter[ruleno] == 2) rowCounter[ruleno] = 5;
            } else {
                if (claimedNos.indexOf(psheet[i].number.number) != -1 && psheet[i].place.number >= startLimit[ruleno] && psheet[i].place.number <= endLimit[ruleno]) rowCounter[ruleno]++;
            }
        }
        let claimdSucsess = false;
        if (ruleno == 6) {
            if (rowCounter[6] >= (maxMatch * 3)) claimdSucsess = true;
        } else {
            if (rowCounter[ruleno] >= maxMatch) claimdSucsess = true;
        }
        if (claimdSucsess) {
            console.log("congrats you have claimed sucessfully for", ruleno);
            BINGO.claims[ruleno].status = 1;
            try {
                io.sockets.in(player_id).emit("onPoints", { message: "OK", points: BINGO.claims[ruleno].points });
            } catch{
            }
        }
    } else {
        console.log("already claimed by someone ", ruleno);
    }
}

const initBingo = (io) => {
    io.sockets.on('connection', socket => {
        console.log("connection established")
        socket.on('room', async (player_id) => {
            count++
            let joinedRoom = await joinPlayer(player_id);
            console.log("hhhhhhhhhh" + joinedRoom.joined_player[0].sheet);
            socket.join(joinedRoom.name);
            io.to(socket.id).emit('onGameJoin', { noOfTickets: joinedRoom.noOfTickets, sheet: joinedRoom.joined_player[0].sheet })
            io.sockets.in(joinedRoom.name).emit("onGameJoined", { message: "Room Joined Sucessfully", room_id: joinedRoom.name, joined_player: joinedRoom.joined_player.length });
        })
    })
}

// const initBingo = (io) =>{

//     io.sockets.on("connection", socket => {
//     //sendNumber(io);
//         socket.on("room", async (player_id) =>{
//             let joinedRoom = await joinPlayer(player_id);

//             socket.join(joinedRoom.name);
//             io.sockets.in(joinedRoom.name).emit("onGameJoined", { message: "Room Joind Sucessfully", room_id : joinedRoom.name,joined_player:joinedRoom.joined_player.length, total_player : joinedRoom.max_player });
//             if(joinedRoom.joined_player.length >= joinedRoom.min_player){
//                 joinedRoom.joined_player.map(player =>{
//                     io.sockets.in(joinedRoom.name).emit("onSheet", { message: "Sheet Shared Successfully", player_id:player.player_id,bingo_sheet : player.sheet,claim_rule: BINGO.claims }); 
//                 })
//                 sendNumber(io);

//             }
//         });

//         socket.on("early", async (ename,player_id,claimedNos,psheet) =>{
//             let idx=0;
//             for(let i=0;i<BINGO.claims.length;i++){
//                 if(BINGO.claims[i].name==ename){
//                   idx=i;
//                   break;
//                 }
//             } sendPoints(io,idx,player_id,claimedNos,psheet);
//         });



//         // socket.on("message", function(data) {
//         //     io.sockets.in(data.room).emit("getmessage", { message: data.message });
//         // });
//     });
// }

module.exports = initBingo;




