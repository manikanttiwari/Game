//initiate the Phaser framework
var game = new Phaser.Game(700, 450, Phaser.AUTO);
game.state.add('BootState', BootState);
game.state.add('GameState', GameState);
game.state.start('BootState');