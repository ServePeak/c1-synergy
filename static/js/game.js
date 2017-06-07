var config = {
  "width": 1000,
  "height": 600,
  "renderer": Phaser.CANVAS,
  "parent": 'phaser-example',
  "resolution": window.devicePixelRatio,
  "state": { "preload": preload, "create": create, "update": update }
};

var game = new Phaser.Game(config);

var credit_score = 600;
var income = 1;
var cash = 0;
var old_time = 0;
var real_time = 0;
var time = 0;
var home_rent = 0;
var car_pay = 0;
var pet_pay = 0;

function preload() {
  game.load.spritesheet('button', 'static/images/buttons.png', 160, 40);
  game.load.spritesheet('square', 'static/images/itsasquare.png', 50, 50);
  game.stage.disableVisibilityChange = true;
}

function create() {

  game.stage.backgroundColor = '#fffff0';

  rent_button = game.add.button(10, 60, 'button', test, this, 0, 0, 2);
  pet_button = game.add.button(10, 90, 'button', test, this, 0, 0, 2);
  car_button = game.add.button(10, 120, 'button', test, this, 0, 0, 2);
  house_upgrade_button = game.add.button(910, 30, 'square', test, this, 1, 1, 1);
  car_upgrade_button = game.add.button(860, 30, 'square', test, this, 1, 1, 1);
  family_upgrade_button = game.add.button(810, 30, 'square', test, this, 1, 1, 1);
  pet_upgrade_button = game.add.button(760, 30, 'square', test, this, 1, 1, 1);
  lottery_upgrade_button = game.add.button(710, 30, 'square', test, this, 1, 1, 1);

  credit_score_text = game.add.text(10, 20, "Credit Score: " + credit_score, { font: "12px Arial", fill: "000000"});
  income_text = game.add.text(10, 570, "Income: " + income + "/hr", { font: "16px Arial", fill: "000000"});
  cash_text = game.add.text(430, 570, "Cash: " + cash, { font: "16px Arial", fill: "000000"});
  time_text = game.add.text(740, 570, "Time: " + time + " hours", { font: "16px Arial", fill: "000000"});
  home_rent_text = game.add.text(20, 67, "Pay rent: " + home_rent,  { font: "12px Arial", fill: "000000"});
  car_pay_text = game.add.text(20, 97, "Pay car fee: " + car_pay,  { font: "12px Arial", fill: "000000"});
  pet_pay_text = game.add.text(20, 127, "Pay pet fee: " + pet_pay, { font: "12px Arial", fill: "000000"})
}

function test() {
  credit_score++;
  credit_score_text.setText("Credit Score: " + credit_score);
}

function update() {
  var current_time = this.game.time.totalElapsedSeconds();
  if (old_time + 0.082 < current_time) {
    old_time = current_time;
  }
  real_time = current_time;

  if (old_time == real_time) {
      cash += income;
      cash_text.setText("Cash: " + cash);
      time++;
      time2 = time % 720;
      months = Math.floor(time / 720);
      years = Math.floor(time / 8640)
      months = months % 13;
      time_text.setText("Time: " + years + " years  " + months + " months  " + time2 + " hours");
  }
}
