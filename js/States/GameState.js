var GameState = {
    //initiate game settings
    init: function () {
        //Load the plugin
        this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
        //Configure the plugin
        this.game.kineticScrolling.configure({
            kineticMovement: true,
            verticalScroll: true,
            // horizontalScroll: true
        });

    },
    update: function () {
        for (var i = 0; i < 90; i++) {
            if (this.randomNumber == this.numberSpriteArray[i]._text) {
                this.numberSpriteArray[i].setStyle({ font: "15px Arial", fill: "#FF0000" })
                break;
            }
        }
        if (this.isNewNumber) {
            this.tweenCircleGroup()
            this.isNewNumber = false;
        }
    },

    create: function () {
        console.log(client.sheet);
        //Starts the plugin
        this.game.kineticScrolling.start();

        this.background = this.game.add.sprite(0, 0, 'background')
        this.world.setBounds(0, 0, 450, 1000)

        this.buttonPropArr = [{ claimButtonName: "early five", prize: 1000 }, { claimButtonName: "top line", prize: 1000 }, { claimButtonName: "middle line", prize: 1000 }, { claimButtonName: "bottom line", prize: 1000 }, { claimButtonName: "four corner", prize: 1000 }, { claimButtonName: "full house", prize: 1000 }]
        this.graphics = game.add.graphics(40, 90);
        this.radius = 1.5707963267948966
        this.isBlackboardCreated = false;
        this.isBlackboardTweened = false;
        this.isTicketCreated = false;
        this.isTicketTweened = false;
        this.numberParams = [];
        this.numberSpriteArray = []
        this.claimButtonArray = []
        this.buttonGroupArray = []
        this.ticketIdCounter = 0;
        this.ticketGroupArray = []
        this.clickableNoArr = []
        this.isNewNumber = false;
        this.indexForArrayOfRandNoToShow = 0;
        this.circlesArray = []
        this.totCircle = 0;
        this.iconSpriteArray = []
        this.noOfTickets = 2
        this.sheet = client.sheet;
        this.arrayOfRandNoForTickets = [];
        this.randomNoIndex = 0;
        this.random;
        for (var i = 1; i < 91; i++) {
            this.numberParams.push({ "number": i, "isPresent": false });
        }

        switch (this.noOfTickets) {
            case 1: {
                this.ticket1 = this.generateBoardAndTicket(0, 0, 0, 15, "ticket1");
                break;
            }
            case 2: {
                this.ticket1 = this.generateBoardAndTicket(0, 0, 0, 15, "ticket1");
                this.ticket2 = this.generateBoardAndTicket(0, 160, 15, 30, "ticket2");
                break;
            }
            case 3: {
                this.ticket1 = this.generateBoardAndTicket(0, 0, 0, 15, "ticket1");
                this.ticket2 = this.generateBoardAndTicket(0, 160, 15, 30, "ticket2");
                this.ticket3 = this.generateBoardAndTicket(0, 320, 30, 45, "ticket3");
                break;
            }
            case 4: {
                this.ticket1 = this.generateBoardAndTicket(0, 0, 0, 15, "ticket1");
                this.ticket2 = this.generateBoardAndTicket(0, 160, 15, 30, "ticket2");
                this.ticket3 = this.generateBoardAndTicket(0, 320, 30, 45, "ticket3");
                this.ticket4 = this.generateBoardAndTicket(0, 480, 45, 60, "ticket4");
                break;
            }
        }

        this.arrow = this.add.sprite(40, 310, 'arrow')
        this.arrow.fixedToCamera = true;
        this.arrow.inputEnabled = true;
        this.arrow.input.pixelPerfectClick = true;
        this.arrow.events.onInputDown.add(this.showBlackboard, this)
        this.arrow.anchor.setTo(0.5)
        this.isArrowUp = false;

        var whiteStyle = { font: "15px Arial", fill: "#ffffff" }
        var text;
        this.numberBoard = this.add.group();
        this.numberBoard.create(30, 690, 'blackboard')
        var x = 33;
        var y = 690;
        var X_Text_Spacing = 32;
        var Y_Text_Spacing = 20;
        var n = 0;
        var one;
        for (var i = 0; i < 90; i++) {
            text = this.numberParams[i].number
            one = this.add.text(x, y, text, whiteStyle);
            one.isPresent = false;
            this.numberSpriteArray.push(one)
            this.numberBoard.add(one);
            x = x + X_Text_Spacing;
            n++;
            if (n == 20) {
                x = 33;
                y = y + Y_Text_Spacing;
            }
            if (n == 40) {
                x = 33;
                y = y + Y_Text_Spacing;
            }
            if (n == 60) {
                x = 33;
                y = y + Y_Text_Spacing;
            }
            if (n == 80) {
                x = 33;
                y = y + Y_Text_Spacing;
            }
            if (n == 90) {
                x = 33;
                y = y + Y_Text_Spacing;
            }
        }
    },

    tweenCircleGroup: function () {
        if (this.totCircle == 0) {
            this.circleGroup = this.add.group()
            this.circle = this.add.sprite(40, 90, 'circle1')
            this.circle.fixedToCamera = true;
            this.circle.moveUp();
            this.circle.anchor.setTo(0.5)
            this.tempText = this.add.text(this.circle.position.x, this.circle.position.y, this.randomNumber)
            this.prevRandNo = this.randomNumber;
            this.tempText.fixedToCamera = true;
            this.tempText.anchor.setTo(0.5)
            this.totCircle++;
        }
        else if (this.totCircle < 5) {
            console.log(this.randomNumber)
            console.log(this.prevRandNo)
            this.tempText.setText(this.randomNumber)
            var circle = this.add.sprite(40, 90, 'circle1')
            circle.fixedToCamera = true;
            circle.anchor.setTo(0.5)
            var text = this.add.text(circle.position.x, circle.position.y, this.prevRandNo)
            this.prevRandNo = this.randomNumber;
            text.fixedToCamera = true;
            text.anchor.setTo(0.5)
            circle.group = this.add.group();
            circle.group.add(circle)
            circle.group.add(text)
            this.circleGroup.add(circle.group)
            this.circlesArray.push(circle.group)
            this.totCircle++;

        } else {
            var temp = this.circlesArray[0];
            for (var i = 1; i < 5; i++) {
                this.circlesArray[i - 1] = this.circlesArray[i]
            }
            this.circlesArray[3] = temp;
            this.circlesArray[3].children[1].setText(this.prevRandNo);
            this.prevRandNo = this.randomNumber;
            this.circlesArray[3].position.y = 0;
            this.tempText.setText(this.randomNumber)

        }
        var tween;
        for (var i = 0; i < this.circlesArray.length; i++) {
            tween = this.add.tween(this.circlesArray[i])
            tween.to({ y: "+40" }, 1000)
            tween.start();
        }
    },

    generateBoardAndTicket: function (x1, y2, minimum, maximum, ticketId) {
        if (minimum == 0) {
            for (var i = 0; i < 15 - 1; i++) {
                for (var j = 0; j < 15 - i - 1; j++) {
                    if (this.sheet[j].place.number > this.sheet[j + 1].place.number) {
                        var temp = this.sheet[j];
                        this.sheet[j] = this.sheet[j + 1]
                        this.sheet[j + 1] = temp
                    }
                }
            }
        } else {
            n = 0
            for (var i = minimum; i < maximum - 1; i++) {
                for (var j = minimum; j < maximum - n - 1; j++) {
                    if (this.sheet[j].place.number > this.sheet[j + 1].place.number) {
                        var temp = this.sheet[j];
                        this.sheet[j] = this.sheet[j + 1]
                        this.sheet[j + 1] = temp
                    }
                }
                n++;
            }
        }

        //ticket
        this.ticket = this.add.sprite(350 + x1, 130 + y2, 'ticket')
        this.ticket.buttonGroup = this.add.group()
        this.ticket.buttonGroup.add(this.ticket)
        this.ticket.anchor.setTo(0.5)
        this.ticket.isTweened = false;
        var ticketGroup = this.add.group();

        // array with every button
        this.ticket.topLineArr = [];
        this.ticket.middleLineArr = [];
        this.ticket.bottomLineArr = [];
        this.ticket.fourCornerArr = [];
        this.ticket.clickedNoArr = [];

        // button
        var buttonPropArrIndex = 0;
        var button_X_Spacing = 150;
        var button_Y_Spacing = 70;
        var button_X_Pos = this.ticket.position.x - 160;
        var button_Y_Pos = this.ticket.position.y - 35;
        var whiteStyle = { font: "15px Arial", fill: "#ffffff" }
        for (var i = 0; i < 3; i++) {
            this.ticket.button = this.add.sprite(button_X_Pos, button_Y_Pos, 'button')

            // this.ticket.button.topLineArr = this.ticket.topLineArr;
            // this.ticket.button.middleLineArr = this.ticket.middleLineArr;
            // this.ticket.button.clickedNoArr = this.ticket.clickedNoArr;
            this.ticket.button.identity = ticketId
            this.ticket.button.anchor.setTo(0.5)
            this.ticket.button.inputEnabled = true;
            this.ticket.button.events.onInputDown.add(this.clickButton, this)
            this.ticket.button.prop = this.buttonPropArr[buttonPropArrIndex]
            var coin = this.add.sprite(this.ticket.button.position.x - 40, this.ticket.button.position.y, 'coin')
            var prizeButtonText = this.buttonPropArr[buttonPropArrIndex].claimButtonName + "\n  " + this.buttonPropArr[buttonPropArrIndex].prize
            var text = this.add.text(this.ticket.button.position.x, this.ticket.button.position.y, prizeButtonText, whiteStyle)
            text.anchor.setTo(0.5)
            buttonPropArrIndex++;
            this.ticket.buttonGroup.add(this.ticket.button)
            this.ticket.buttonGroup.add(text);
            this.ticket.buttonGroup.add(coin);
            ticketGroup.add(this.ticket.buttonGroup)
            button_X_Pos = button_X_Pos + button_X_Spacing;
        }

        button_X_Pos = this.ticket.position.x - 160
        button_Y_Pos = button_Y_Pos + button_Y_Spacing;
        for (var i = 0; i < 3; i++) {
            this.ticket.button = this.add.sprite(button_X_Pos, button_Y_Pos, 'button')

            // this.ticket.button.bottomLineArr = this.ticket.bottomLineArr;
            // this.ticket.button.fourCornerArr = this.ticket.fourCornerArr;
            //this.ticket.button.fullHouseArr = this.ticket.arrayOfRandNo;
            // this.ticket.button.clickedNoArr = this.ticket.clickedNoArr;

            this.ticket.button.identity = ticketId;

            this.ticket.button.anchor.setTo(0.5)
            this.ticket.button.inputEnabled = true;
            this.ticket.button.events.onInputDown.add(this.clickButton, this)
            this.ticket.button.prop = this.buttonPropArr[buttonPropArrIndex]
            var coin = this.add.sprite(this.ticket.button.position.x - 40, this.ticket.button.position.y, 'coin')
            var prizeButtonText = this.buttonPropArr[buttonPropArrIndex].claimButtonName + "\n\t\t" + this.buttonPropArr[buttonPropArrIndex].prize
            var text = this.add.text(this.ticket.button.position.x, this.ticket.button.position.y, prizeButtonText, whiteStyle)
            text.anchor.setTo(0.5)
            buttonPropArrIndex++;
            this.ticket.buttonGroup.add(this.ticket.button)
            this.ticket.buttonGroup.add(text);
            this.ticket.buttonGroup.add(coin);
            ticketGroup.add(this.ticket.buttonGroup)
            button_X_Pos = button_X_Pos + button_X_Spacing;
        }
        this.ticket.buttonGroup.isButtonGroupClicked = false
        this.buttonGroupArray.push(this.ticket.buttonGroup)

        // board
        this.ticket.board = this.add.sprite(this.ticket.position.x, this.ticket.position.y, 'ticket')
        this.ticket.board.inputEnabled = true;
        this.ticket.board.anchor.setTo(0.5)
        ticketGroup.add(this.ticket.board)

        // claim button
        this.ticket.board.claimButton = this.add.sprite(this.ticket.board.position.x + 210, this.ticket.board.position.y, 'claimButton')
        ticketGroup.add(this.ticket.board.claimButton)
        this.ticket.board.claimButton.buttonGroup = this.ticket.buttonGroup
        this.ticket.board.claimButton.anchor.setTo(0.5);
        this.ticket.board.claimButton.ID = this.ticketIdCounter
        this.ticketIdCounter = this.ticketIdCounter + 1;
        this.ticket.board.claimButton.inputEnabled = true;
        this.ticket.board.claimButton.events.onInputDown.add(this.claimTicket, this)
        this.ticket.board.claimButton.isClaimButtonClicked = false
        this.ticket.board.claimButton.tweenClaimTicket = false
        this.claimButtonArray.push(this.ticket.board.claimButton)

        let x = 47;
        let y = 50;
        let x_position = this.ticket.board.position.x - 225;
        let y_position = this.ticket.board.position.y - 50;
        var whiteStyle = { font: "15px Arial", fill: "#ffffff" }
        var randomNoPosArray = this.generateArrayOfRandPos(1, 9)
        randomNoPosArray.sort()
        this.sheetIndex = minimum;
        console.log(minimum)
        this.randomPosArrIndex = 0;
        this.randomNoArrIndex = 0
        var iconIndex = 1;
        var iconSpriteArray = []
        var mn = 1;
        var mx = 9;
        for (var i = 1; i < 10; i++) {
            this.ticket.board.icon = this.add.sprite(x_position, y_position, 'icon' + iconIndex)
            ticketGroup.add(this.ticket.board.icon)
            this.ticket.board.icon.anchor.setTo(0.5);
            this.ticket.board.icon.star = this.add.sprite(this.ticket.board.icon.position.x, this.ticket.board.icon.position.y, 'star')
            ticketGroup.add(this.ticket.board.icon.star)
            this.ticket.board.icon.star.alpha = 0
            this.ticket.board.icon.star.anchor.setTo(0.5)
            iconSpriteArray.push(this.ticket.board.icon)
            if (i == this.sheet[this.sheetIndex].place.number) {
                console.log(this.sheetIndex)
                this.ticket.board.icon.inputEnabled = true;
                this.ticket.board.icon.events.onInputDown.add(this.clickNumber, this)
                this.ticket.board.icon.text = this.sheet[this.sheetIndex].number.number;
                //this.ticket.board.icon.clickedNoArr = this.ticket.clickedNoArr;
                // this.ticket.clickedNoArr.push(this.sheet[this.sheetIndex].number.number)
                this.ticket.topLineArr.push(this.sheet[this.sheetIndex].number.number);
                this.ticket.board.icon.identity = ticketId
                var text = this.add.text(this.ticket.board.icon.position.x, this.ticket.board.icon.position.y, this.ticket.board.icon.text, whiteStyle)
                text.anchor.setTo(0.5)
                ticketGroup.add(text)
                text.stroke = '#000000'
                text.strokeThickness = 3
                
                this.iconSpriteArray.push(this.ticket.board.icon);
                this.sheetIndex++;
            }
            iconIndex++;
            mn = mn + 10;
            mx = mx + 10;
            x_position = x_position + x;
        }
        randomNoPosIndex = 0
        randomNoPosArray = this.generateArrayOfRandPos(1, 9)
        console.log(randomNoPosArray)
        randomNoPosArray.sort()
        y_position = y_position + y;
        x_position = this.ticket.board.position.x - 225;
        iconIndex = 1
        mn = 1;
        mx = 9;
        for (var i = 10; i < 19; i++) {
            this.ticket.board.icon = this.add.sprite(x_position, y_position, 'icon' + iconIndex)
            ticketGroup.add(this.ticket.board.icon)
            this.ticket.board.icon.anchor.setTo(0.5);
            this.ticket.board.icon.star = this.add.sprite(this.ticket.board.icon.position.x, this.ticket.board.icon.position.y, 'star')
            ticketGroup.add(this.ticket.board.icon.star)
            this.ticket.board.icon.star.alpha = 0
            this.ticket.board.icon.star.anchor.setTo(0.5)
            if (i == this.sheet[this.sheetIndex].place.number) {
                console.log(this.sheetIndex)
                this.ticket.board.icon.inputEnabled = true;
                this.ticket.board.icon.events.onInputDown.add(this.clickNumber, this)
                this.ticket.board.icon.text = this.sheet[this.sheetIndex].number.number;
                this.ticket.board.icon.identity = ticketId;
                //this.ticket.board.icon.clickedNoArr = this.ticket.clickedNoArr;
                this.ticket.middleLineArr.push(this.sheet[this.sheetIndex].number.number)
                var text = this.add.text(this.ticket.board.icon.position.x, this.ticket.board.icon.position.y, this.ticket.board.icon.text, whiteStyle)
                text.anchor.setTo(0.5)
                ticketGroup.add(text)
                text.stroke = '#000000'
                text.strokeThickness = 3
                randomNoPosIndex++;
                this.randomNoIndex++
                this.iconSpriteArray.push(this.ticket.board.icon);
                this.sheetIndex++;
            }
            iconIndex++;
            mn = mn + 10;
            mx = mx + 10;
            x_position = x_position + x;
        }

        randomNoPosIndex = 0
        randomNoPosArray = this.generateArrayOfRandPos(1, 9)
        console.log(randomNoPosArray)
        randomNoPosArray.sort()
        y_position = y_position + y;
        x_position = this.ticket.board.position.x - 225;
        iconIndex = 1
        mn = 1;
        mx = 9;
        console.log(this.sheetIndex)
        for (var i = 19; i < 28; i++) {
            this.ticket.board.icon = this.add.sprite(x_position, y_position, 'icon' + iconIndex)
            ticketGroup.add(this.ticket.board.icon)
            this.ticket.board.icon.anchor.setTo(0.5);
            this.ticket.board.icon.star = this.add.sprite(this.ticket.board.icon.position.x, this.ticket.board.icon.position.y, 'star')
            ticketGroup.add(this.ticket.board.icon.star)
            this.ticket.board.icon.star.alpha = 0
            this.ticket.board.icon.star.anchor.setTo(0.5)
            this.ticket.board.icon.isClicked = false;
            console.log("hhhhhhhh" + this.sheetIndex)
            if (this.sheetIndex < this.sheet.length && i == this.sheet[this.sheetIndex].place.number) {
                console.log(this.sheetIndex)
                this.ticket.board.icon.inputEnabled = true;
                this.ticket.board.icon.events.onInputDown.add(this.clickNumber, this)
                this.ticket.board.icon.text = this.sheet[this.sheetIndex].number.number;
                this.ticket.board.icon.identity = ticketId;
                //this.ticket.board.icon.clickedNoArr = this.ticket.clickedNoArr;
                this.ticket.bottomLineArr.push(this.sheet[this.sheetIndex].number.number)
                var text = this.add.text(this.ticket.board.icon.position.x, this.ticket.board.icon.position.y, this.ticket.board.icon.text, whiteStyle)
                text.anchor.setTo(0.5)
                ticketGroup.add(text)
                text.stroke = '#000000'
                text.strokeThickness = 3
                
                randomNoPosIndex++;
                this.randomNoIndex++
                this.iconSpriteArray.push(this.ticket.board.icon);
                this.sheetIndex++;
            }
            iconIndex++;
            mn = mn + 10;
            mx = mx + 10;
            x_position = x_position + x;
        }
        
        // for the four corner array
        this.ticket.fourCornerArr[0] = this.ticket.topLineArr[0]
        this.ticket.fourCornerArr[1] = this.ticket.topLineArr[4]
        this.ticket.fourCornerArr[2] = this.ticket.bottomLineArr[0]
        this.ticket.fourCornerArr[3] = this.ticket.bottomLineArr[4]
        this.ticketGroupArray.push(ticketGroup)
        console.log(this.arrayOfRandNoForTickets);
        return this.ticket;
    },
    generateRandNo: function (min, max) {
        this.random = Math.floor(Math.random() * (max - min + 1)) + min;
        // while(this.arrayOfRandNoForTickets.includes(random)){
        //     this.arrayOfRandNoForTickets.push(this.random)
        // }
        if (this.arrayOfRandNoForTickets.indexOf(this.random) == -1) {
            this.arrayOfRandNoForTickets.push(this.random)
            return this.random;
        } else {
            //this.generateRandNo(min, max);
        }
    },

    claimTicket: function (sprite) {
        if (sprite.isClaimButtonClicked == false) {

            console.log("I am in false conditoin")
            var tween;
            for (var i = 0; i < this.buttonGroupArray.length; i++) {
                this.buttonGroupArray[i].position.y = 0;
                this.claimButtonArray[i].isClaimButtonClicked = false
                tween = this.add.tween(this.ticketGroupArray[i])
                tween.to({ y: 0 }, 100);
                tween.start();
                //this.ticketGroupArray[i].position.y = 0;
            }
            tween = this.add.tween(sprite.buttonGroup)
            tween.to({ y: 155 }, 100);
            tween.start();
            //sprite.buttonGroup.position.y = 155;

            for (var i = sprite.ID; i < this.ticketGroupArray.length; i++) {

                if (this.ticketGroupArray[i + 1] != undefined) {
                    //console.log(this.ticketGroupArray[i].y)
                    tween = this.add.tween(this.ticketGroupArray[i + 1])
                    tween.to({ y: 155 }, 100);
                    tween.start();
                    //this.ticketGroupArray[i + 1].position.y = 155;

                }
            }
            sprite.isClaimButtonClicked = true;

        }
        else {
            console.log("I am in true conditoin")
            tween = this.add.tween(sprite.buttonGroup)
            tween.to({ y: 0 }, 100);
            tween.start();
            // sprite.buttonGroup.position.y = 0;
            for (var i = sprite.ID; i < this.ticketGroupArray.length; i++) {
                if (this.ticketGroupArray[i + 1] != undefined) {
                    tween = this.add.tween(this.ticketGroupArray[i + 1])
                    tween.to({ y: 0 }, 100);
                    tween.start();
                    //this.ticketGroupArray[i + 1].position.y = 0;
                }
            }
            sprite.isClaimButtonClicked = false;
        }
    },

    checkInClickedNoArr: function (arr, clickedNoArr) {
        if (clickedNoArr.length < arr.length) {
            return false;
        }
        var isMatched = false;
        var index = 0;
        while (arr[index] !== undefined) {
            for (var i = 0; i < clickedNoArr.length; i++) {
                if (arr[index] == clickedNoArr[i]) {
                    isMatched = true;
                    break;
                }
                if (arr[index] != clickedNoArr[i]) {
                    isMatched = false;
                }
            }
            if (isMatched == false) {
                return false;
            }
            index++;
        }
        return isMatched;
    },

    clickButton: function (sprite) {

        console.log(sprite.clickedNoArr)
        if (sprite.prop.claimButtonName.toLowerCase() == "early five") {
            console.log('early five clicked')
        }
        if (sprite.prop.claimButtonName.toLowerCase() == "top line") {
            console.log(sprite.topLineArr)
            if (this.checkInClickedNoArr(sprite.topLineArr, sprite.clickedNoArr)) {
                console.log('congratulations! top line is secured')
            } else {
                console.log('badly claimed top line')
            }
        }
        if (sprite.prop.claimButtonName.toLowerCase() == "bottom line") {
            console.log(sprite.bottomLineArr)
            if (this.checkInClickedNoArr(sprite.bottomLineArr, sprite.clickedNoArr)) {
                console.log('congratulations! bottom line is secured')
            } else {
                console.log('badly claimed bottom line')
            }
        }
        if (sprite.prop.claimButtonName.toLowerCase() == "middle line") {
            console.log(sprite.middleLineArr)
            if (this.checkInClickedNoArr(sprite.middleLineArr, sprite.clickedNoArr)) {
                console.log('congratulations! middle line is secured')
            } else {
                console.log('badly claimed middle line')
            }
        }
        if (sprite.prop.claimButtonName.toLowerCase() == "four corner") {
            console.log(sprite.fourCornerArr)
            if (this.checkInClickedNoArr(sprite.fourCornerArr, sprite.clickedNoArr)) {
                console.log('congratulations! four corner is secured')
            } else {
                console.log('badly claimed four corner')
            }
        }
        if (sprite.prop.claimButtonName.toLowerCase() == "full house") {
            console.log(sprite.fullHouseArr)
            console.log('full house clicked')
            if (this.checkInClickedNoArr(sprite.fullHouseArr, sprite.clickedNoArr)) {
                console.log('congratulations! top line is secured')
            } else {
                console.log('badly claimed top line')
            }
        }
    },

    generateArrayOfRandPos: function (min, max) {
        var randomNoPosArray = []
        while (randomNoPosArray.length < 5) {
            var index = Math.floor(Math.random() * (max - min + 1)) + min;
            if (randomNoPosArray.indexOf(index) === -1) randomNoPosArray.push(index);
        }
        return randomNoPosArray;
    },
    generateArrayOfRandNoToShow: function (min, max, no_of_randNumber) {
        var arrayOfRandNo = []
        while (arrayOfRandNo.length < no_of_randNumber) {
            var index = Math.floor(Math.random() * (max - min + 1)) + min;
            if (arrayOfRandNo.indexOf(index) === -1) arrayOfRandNo.push(index);
        }
        return arrayOfRandNo
    },

    // generateArrayOfRandNo: function (min, max, no_of_randNumber, max_no_in_clm) {
    //     var temp_index;
    //     var occuredNoRecord = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     var arrayOfRandNo = []
    //     while (arrayOfRandNo.length < no_of_randNumber) {
    //         var index = Math.floor(Math.random() * (max - min + 1)) + min;
    //         if (index > 0 && index < 10) { occuredNoRecord[0] = occuredNoRecord[0] + 1; temp_index = 0 }
    //         if (index >= 10 && index < 20) { occuredNoRecord[1] = occuredNoRecord[1] + 1; temp_index = 1 }
    //         if (index >= 20 && index < 30) { occuredNoRecord[2] = occuredNoRecord[2] + 1; temp_index = 2 }
    //         if (index >= 30 && index < 40) { occuredNoRecord[3] = occuredNoRecord[3] + 1; temp_index = 3 }
    //         if (index >= 40 && index < 50) { occuredNoRecord[4] = occuredNoRecord[4] + 1; temp_index = 4 }
    //         if (index >= 50 && index < 60) { occuredNoRecord[5] = occuredNoRecord[5] + 1; temp_index = 5 }
    //         if (index >= 60 && index < 70) { occuredNoRecord[6] = occuredNoRecord[6] + 1; temp_index = 6 }
    //         if (index >= 70 && index < 80) { occuredNoRecord[7] = occuredNoRecord[7] + 1; temp_index = 7 }
    //         if (index >= 80 && index < 90) { occuredNoRecord[8] = occuredNoRecord[8] + 1; temp_index = 8 }
    //         if (arrayOfRandNo.indexOf(index) === -1 && occuredNoRecord[temp_index] <= max_no_in_clm) arrayOfRandNo.push(index);
    //     }
    //     return arrayOfRandNo
    // },

    clickNumber: function (sprite) {
        if(sprite.identity === 'ticket1')
            this.ticket1.clickedNoArr.push(sprite.text);
        if(sprite.identity === 'ticket2')
            this.ticket2.clickedNoArr.push(sprite.text);
        if(sprite.identity === 'ticket3')
            this.ticket3.clickedNoArr.push(sprite.text);
        if(sprite.identity === 'ticket4')
            this.ticket4.clickedNoArr.push(sprite.text);
        sprite.inputEnabled = false;
        sprite.star.alpha = 0.7
        sprite.alpha = 0.7
    },

    showBlackboard: function () {
        if (this.isBlackboardCreated == false && this.isArrowUp == false) {
            this.tween = this.add.tween(this.numberBoard);
            this.tween.to({ y: -180 }, 100)
            this.tween.start();
            this.arrow.scale.y = -1;
            this.isBlackboardCreated = true;
            this.isArrowUp = true;
        }
        else if (this.isArrowUp == true && this.isBlackboardCreated == true) {
            console.log('arrow down')
            this.tween.to({ y: 0 }, 100)
            this.tween.start();
            this.arrow.scale.y = 1;
            this.isArrowUp = false;
            this.isBlackboardCreated = false;
            this.isArrowUp = false;

        }
    },

};
