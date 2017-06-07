var config = {
  "width": 800,
  "height": 600,
  "renderer": Phaser.CANVAS,
  "parent": 'phaser-example',
  "resolution": window.devicePixelRatio,
  "state": { "preload": preload, "create": create, "update": update }
};

var game = new Phaser.Game(config);

var clicks = 0;
var text;

function preload() {
  game.load.spritesheet('button', 'static/images/flixel-button.png', 80, 20);
}

function create() {

  game.stage.backgroundColor = '#ffffff';

  credit_score = game.add.text(10, 20, clicks, { font: "12px Arial", fill: "000000"});

  button = game.add.button(game.world.centerX - 95, 400, 'button', test, this, 0, 0, 2);

}

function test() {
  clicks++;
  credit_score.setText(clicks);
}

function update() {
  if (game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown){
    clicks++;
    credit_score.setText(clicks);
  }
}
