// import { Socket } from "dgram";

var BootState = {

    //initiate some game-level settings
    init: function () {
        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function () {
        this.load.image('button', 'assets/images/button1.png')
        this.load.image('background', 'assets/images/background2.jpg')
        this.load.image('ticket', 'assets/images/ticket3.jpg')
        this.load.image('claimButton', 'assets/images/claimButton.png')
        this.load.image('arrow', 'assets/images/arrow2.png')
        this.load.image('blackboard', 'assets/images/ticket4.jpg')
        this.load.image('star', 'assets/images/star10.png')
        this.load.image('coin', 'assets/images/coinImage1.png')
        for (var i = 1; i <= 5; i++) {
            this.load.image('circle' + i, 'assets/images/circle.png')
        }
        for (var i = 1; i < 10; i++) {
            this.load.image('icon' + i, 'assets/images/icon' + i + '.png')
        }
        this.load.image('playButton', 'assets/images/playButton.png')
    },
    create: function () {
        this.game.stage.backgroundColor = '#fff';
        this.playButton = this.add.sprite(270, 160, 'playButton')
        this.playButton.inputEnabled = true;
        this.playButton.events.onInputDown.add(this.playGame, this)
    },
    playGame: function () {
        client.askNewClient();
        this.text = this.add.text(200, 300, 'waiting for the players')
        console.log(this)
        //this.state.start('GameState')
    }
};
//module.exports = BootState;