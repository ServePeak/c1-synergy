var config = {
  "width": 800,
  "height": 600,
  "renderer": Phaser.CANVAS,
  "parent": 'phaser-example',
  "resolution": window.devicePixelRatio,
  "state": { "preload": preload, "create": create, "update": update }
};

var game = new Phaser.Game(config);

var credit_score = 650;
var income = 1;
var cash = 0;
var old_time = 0;
var time = 0;

function preload() {
  game.load.spritesheet('button', 'static/images/buttons.png', 160, 40);
}

function create() {

  game.stage.backgroundColor = '#fffff0';

  credit_score_text = game.add.text(10, 20, "Credit Score: " + credit_score, { font: "12px Arial", fill: "000000"});
  income_text = game.add.text(10, 570, "Income: " + income + "/hr", { font: "12px Arial", fill: "000000"});
  cash_text = game.add.text(game.world.centerX-50, 570, "Cash: " + cash, { font: "12px Arial", fill: "000000"});
  time_text = game.add.text(680, 570, "Time: " + time + " hours", { font: "12px Arial", fill: "000000"});

  rent_button = game.add.button(10, 60, 'button', test, this, 0, 0, 2);
  pet_button = game.add.button(10, 90, 'button', test, this, 0, 0, 2);
  car_button = game.add.button(10, 120, 'button', test, this, 0, 0, 2);

}

function test() {
  credit_score++;
  credit_score_text.setText("Credit Score: " + credit_score);
}

function update() {
  old_time = time;
  time = Math.floor(this.game.time.totalElapsedSeconds());
  time_text.setText("Time: " + time + " hours");

  if (time > old_time) {
      cash += income;
      cash_text.setText("Cash: " + cash);
  }
}
