const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;

class Player extends Schema {
    constructor() {
        super();
        //this.sheet = new ArraySchema()
        this.setArray();
    }
    setArray() {
        this.noOfTickets = 2;
    }
    async initializePlayer() {
        this.selectedNumbers = []
        this.sheet = await this.generateSheet(this.noOfTickets).catch((err) => { console.log(err) });
    }
    async generateSheet(noOfTickets) {
        let sheet = [];
        var place = [];
        for (let j = 0; j < noOfTickets; j++) {
            place = await this.generateRandomPosition(1, 27).catch((err) => { console.log(err) });
            for (let i = 1; i <= 15; i++) {
                sheet.push({ place: place[i], number: await this.generateNextNumber(place[i].number).catch((err) => { console.log(err) }) });

            }
        }
        return sheet;
    }
    async generateUniqueRndmNoArr(min, max) {
        let arrayOfRandNo = []
        while (arrayOfRandNo.length < 90) {
            var index = Math.floor(Math.random() * (max - min + 1)) + min;
            if (arrayOfRandNo.indexOf(index) === -1) arrayOfRandNo.push(index);
        }
        return arrayOfRandNo
    }
    async generateRandomPosition(min, max) {
        var row1 = 0;
        var row2 = 0;
        var row3 = 0;
        var arr = []
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var isFound = false;
        arr[0] = { status: "OK", number: random }
        row1++;
        row2++;
        row3++;
        while (arr.length <= 15) {
            isFound = false
            random = Math.floor(Math.random() * (max - min + 1)) + min;
            for (var i = 0; i < arr.length; i++) {
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
        }
        return arr;
    }
    async generateNextNumber(sheetPlace) {
        let min;
        let max;
        console.log(this.selectedNumbers)
        if (this.selectedNumbers.length > 89) {
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
        var random = await this.generateRandom(min, max).catch((err) => { console.log(err) });
        while (this.selectedNumbers.indexOf(random) > -1) {
            random = await this.generateRandom(min, max).catch((err) => { console.log(err) });
        }
        this.selectedNumbers.push(random);
        return { status: "OK", number: random };
    }
    async generateRandom(min, max) {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    }
}
schema.defineTypes(Player, {
    name: "string",
    player_id: "string",
    noOfTickets: "number",
    roomId: "string"
});

class Ticket extends Schema {
    constructor() {
        super();
    }

}
schema.defineTypes(Ticket, {
    places: ["string"],
    number: ["string"]
})
const player = new Player()
const ticket = new Ticket()
module.exports = { player, ticket };