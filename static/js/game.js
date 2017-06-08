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
var car_loan = 0;
var family_needs = 0;
var pet_food = 0;

function preload() {
  game.load.spritesheet('button', 'static/images/buttons.png', 160, 40);
  game.load.spritesheet('square', 'static/images/itsasquare.png', 50, 50);
  game.stage.disableVisibilityChange = true;
}

function create() {

  game.stage.backgroundColor = '#fffff0';

  rent_button = game.add.button(10, 60, 'button', payHouse, this, 0, 0, 2);
  car_button = game.add.button(10, 90, 'button', payCar, this, 0, 0, 2);
  family_button = game.add.button(10, 120, 'button', payFamily, this, 0, 0, 2);
  pet_button = game.add.button(10, 150, 'button', payPet, this, 0, 0, 2);

  house_upgrade_button = game.add.button(710, 30, 'square', buyHouse, this, 1, 1, 1);
  car_upgrade_button = game.add.button(760, 30, 'square', buyCar, this, 1, 1, 1);
  family_upgrade_button = game.add.button(810, 30, 'square', buyFamily, this, 1, 1, 1);
  pet_upgrade_button = game.add.button(860, 30, 'square', buyPet, this, 1, 1, 1);
  lottery_upgrade_button = game.add.button(910, 30, 'square', buyLottery, this, 1, 1, 1);

  credit_score_text = game.add.text(10, 20, "Credit Score: " + credit_score, { font: "16px Arial", fill: "000000"});
  income_text = game.add.text(10, 570, "Income: " + income + "/hr", { font: "16px Arial", fill: "000000"});
  cash_text = game.add.text(430, 570, "Cash: " + cash, { font: "16px Arial", fill: "000000"});
  time_text = game.add.text(740, 570, "Time: " + time + " hours", { font: "16px Arial", fill: "000000"});

  home_rent_text = game.add.text(20, 67, "Pay Rent: " + home_rent,  { font: "12px Arial", fill: "000000"});
  car_loan_text = game.add.text(20, 97, "Pay Car Loan: " + car_loan,  { font: "12px Arial", fill: "000000"});
  family_needs_text = game.add.text(20, 127, "Pay Family Needs: " + family_needs, { font: "12px Arial", fill: "000000"});
  pet_food_text = game.add.text(20, 157, "Pay Pet Food: " + pet_food, { font: "12px Arial", fill: "000000"});
}

function payHouse() {
  cash -= home_rent;
  cash_text.setText("Cash: " + cash);
}

function payCar() {
  cash -= car_loan;
  cash_text.setText("Cash: " + cash);
}

function payFamily() {
  cash -= family_needs;
  cash_text.setText("Cash: " + cash);
}

function payPet() {
  cash -= pet_food;
  cash_text.setText("Cash: " + cash);
}

function buyHouse() {
  if (home_rent == 0) {
    home_rent = 600;
  } else if (home_rent == 600) {
    home_rent = 1200;
  } else if (home_rent == 1200) {
    home_rent = 2000;
  } else if (home_rent == 2000) {
    home_rent = 5000;
  } else {
    house_upgrade_button.input.stop();
    house_upgrade_button.destroy();
  }
  home_rent_text.setText("Pay Rent: " + home_rent);
}

// TODO: More accurate car prices/loans
function buyCar() {
  if (car_loan == 0) {
    car_loan = 600;
  } else if (car_loan == 600) {
    car_loan = 1200;
  } else if (car_loan == 1200) {
    car_loan = 2000;
  } else if (car_loan == 2000) {
    car_loan = 5000;
  } else {
    car_upgrade_button.input.stop();
    car_upgrade_button.destroy();
  }
  car_loan_text.setText("Pay Car Loan: " + car_loan);
}

// TODO: More accurate price for a family of X
function buyFamily() {
  if (family_needs == 0) {
    family_needs = 600;
  } else if (family_needs == 600) {
    family_needs = 1200;
  } else if (family_needs == 1200) {
    family_needs = 2000;
  } else if (family_needs == 2000) {
    family_needs = 5000;
  } else {
    family_upgrade_button.input.stop();
    family_upgrade_button.destroy();
  }
  family_needs_text.setText("Pay Family Needs: " + family_needs);
}

// TODO: More accurate pet food prices
function buyPet() {
  if (pet_food == 0) {
    pet_food = 600;
  } else if (pet_food == 600) {
    pet_food = 1200;
  } else if (pet_food == 1200) {
    pet_food = 2000;
  } else if (pet_food == 2000) {
    pet_food = 5000;
  } else {
    pet_upgrade_button.input.stop();
    pet_upgrade_button.destroy();
  }
  pet_food_text.setText("Pay Pet Food: " + pet_food);
}

// TODO: Accurate lottery chances with random jackpot
function buyLottery() {
  cash -= 200;
  //If the player spends more cash than they have, subtract the amount of cash
  //less than 0 divided by 2 from their credit score
  if (cash < 0) {
    credit_score += Math.floor(cash / 2);
    credit_score_text.setText("Credit Score: " + credit_score);
    cash = 0
  }
  cash_text.setText("Cash: " + cash);
  for(i = 0; i < 100; i++) {
    key = Math.floor((Math.random() * 300000000) + 1);
    roll = Math.floor((Math.random() * 300000000) + 1);
    if (key == roll) {
      cash += Math.floor((Math.random()) + 1);
      cash_text.setText("Cash: " + cash);
      break;
    }
  }
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
      time_text.setText("Time: " + years + " years " + months + " months " + time2 + " hours");
  }
}