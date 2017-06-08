var config = {
  "width": 1000,
  "height": 600,
  "renderer": Phaser.CANVAS,
  "parent": 'phaser-example',
  "resolution": window.devicePixelRatio,
  "state": { "preload": preload, "create": create, "update": update, "render": render }
};

var game = new Phaser.Game(config);

var credit_score = 600;
var income = 8;
var cash = 0;

var old_time = 0;
var real_time = 0;
var income_time = 0;
var button_time = 0;
var time = 0;

var home_rent = 0;
var car_loan = 0;
var family_needs = 0;
var pet_food = 0;

var home_type = "Basement";
var home_level = 0;
var car_type = "Shoes";
var car_level = 0;
var job_level = 0;
var family_type = "Single";
var pet_type = "None";

var homes = ["Basement", "Shared Apartment", "Single Apartment", "House", "Vacation Home", "Mansion"];
var jobs = [["Freelance Developer", 8], ["Junior Software Engineer", 15], ["Senior Software Enginner", 30], ["Principal Software Engineer", 60], ["Product Manager", 80], ["Chief Technology Officer", 120]];
var transportation = ["Shoes", "Bicycle", "Motorcycle", "Used Car", "New Car", "Sports Car"];

function preload() {
  game.load.spritesheet('button', 'static/images/buttons.png', 160, 40);
  game.load.spritesheet('square', 'static/images/itsasquare.png', 50, 50);
  game.load.image('adultHuman', 'static/images/defaultperson.png');
  game.load.image('childHuman', 'static/images/child.png');
  game.load.image('bicycle', 'static/images/bicycle.png');
  game.load.image('motorcycle', 'static/images/motorcycle.png');
  game.load.image('oldCar', 'static/images/oldcar.png');
  game.load.image('newCar', 'static/images/car.png');
  game.load.image('sportsCar', 'static/images/sportscar.png');
  game.load.image('petFish', 'static/images/fish.png');
  game.load.image('petTurtle', 'static/images/turtle.png');
  game.load.image('petDog', 'static/images/dog.png');
  game.load.image('petCat', 'static/images/cat.png');
  game.load.image('petTiger', 'static/images/tiger.png');

  game.stage.disableVisibilityChange = true;
}

function create() {

  game.stage.backgroundColor = '#fffff0';

  var style = { font: "16px Arial", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle" };

  // Your character
  main_sprite = game.add.sprite(400, 320, 'adultHuman');

  // Pay buttons (left)
  home_button = game.add.button(10, 60, 'button', payHouse, this, 1, 1, 2);
  car_button = game.add.button(10, 105, 'button', payCar, this, 1, 1, 2);
  family_button = game.add.button(10, 150, 'button', payFamily, this, 1, 1, 2);
  pet_button = game.add.button(10, 195, 'button', payPet, this, 1, 1, 2);

  // Upgrade buttons (top-right)
  home_upgrade_button = game.add.button(710, 50, 'square', buyHouse, this, 1, 1, 1);
  car_upgrade_button = game.add.button(760, 50, 'square', buyCar, this, 1, 1, 1);
  family_upgrade_button = game.add.button(810, 50, 'square', buyFamily, this, 1, 1, 1);
  pet_upgrade_button = game.add.button(860, 50, 'square', buyPet, this, 1, 1, 1);
  lottery_button = game.add.button(785, 230, 'square', buyLottery, this, 1, 1, 1);

  // The various text that the user needs to know
  credit_score_text = game.add.text(10, 20, "Credit Score: " + credit_score, { font: "16px Arial", fill: "000000"});
  income_text = game.add.text(10, 570, "Income: " + income + "/hr", { font: "16px Arial", fill: "#000000"});
  cash_text = game.add.text(430, 570, "Cash: " + cash, { font: "16px Arial", fill: "#000000"});
  time_text = game.add.text(740, 570, "Time: " + time + " hours", { font: "16px Arial", fill: "#000000"});
  home_text = game.add.text(10, 280, "Home: " + homes[home_level], { font: "16px Arial", fill: "#000000"});
  car_text = game.add.text(10, 300, "Transportation: " + transportation[car_level], { font: "16px Arial", fill: "#000000"});
  job_text = game.add.text(10, 320, "Job: " + jobs[job_level][0], { font: "16px Arial", fill: "#000000"});
  upgrade_info = game.add.text(770, 20, "Upgrades", { font: "16px Arial", fill: "#000000"});
  lottery_text = game.add.text(780, 210, "Lottery", { font: "16px Arial", fill: "#000000"});

  // Pay button text
  home_rent_text = game.add.text(0, 0, "Pay Rent: " + home_rent, style);
  home_rent_text.setTextBounds(20, 60, 160, 45);
  car_loan_text = game.add.text(0, 0, "Pay Car Loan: " + car_loan, style);
  car_loan_text.setTextBounds(20, 105, 160, 45);
  family_needs_text = game.add.text(0, 0, "Pay Family Needs: " + family_needs, style);
  family_needs_text.setTextBounds(20, 150, 160, 45);
  pet_food_text = game.add.text(0, 0, "Pay Pet Food: " + pet_food, style);
  pet_food_text.setTextBounds(20, 195, 160, 45);

  // Upgrade button hover text
  upgrade_text = game.add.text(0, 0, "", style);
  upgrade_text.setTextBounds(680, 110, 255, 0);
  pet_upgrade_button.events.onInputOver.add(petHover, this);
  pet_upgrade_button.events.onInputUp.add(petHover, this);
  pet_upgrade_button.events.onInputOut.add(upgradeTextOff, this);
  family_upgrade_button.events.onInputOver.add(familyHover, this);
  family_upgrade_button.events.onInputUp.add(familyHover, this);
  family_upgrade_button.events.onInputOut.add(upgradeTextOff, this);
  car_upgrade_button.events.onInputOver.add(carHover, this);
  car_upgrade_button.events.onInputUp.add(carHover, this);
  car_upgrade_button.events.onInputOut.add(upgradeTextOff, this);
  home_upgrade_button.events.onInputOver.add(homeHover, this);
  home_upgrade_button.events.onInputUp.add(homeHover, this);
  home_upgrade_button.events.onInputOut.add(upgradeTextOff, this);

  // Lottery button hover text
  lottery_button.events.onInputOver.add(lotteryHover, this);
  lottery_button.events.onInputUp.add(lotteryHover, this);
  lottery_button.events.onInputOut.add(upgradeTextOff, this);
}

function payHouse() {
  cash -= home_rent;
  cash_text.setText("Cash: " + cash);

  home_button.alpha = 0.5;
  home_button.setFrames(0, 0, 0);
  home_button.inputEnabled = false;
  home_rent_text.addColor("#f0f0f0", 0);
}

function payCar() {
  cash -= car_loan;
  cash_text.setText("Cash: " + cash);

  car_button.alpha = 0.5;
  car_button.setFrames(0, 0, 0);
  car_button.inputEnabled = false;
  car_loan_text.addColor("#f0f0f0", 0);
}

function payFamily() {
  cash -= family_needs;
  cash_text.setText("Cash: " + cash);

  family_button.alpha = 0.5;
  family_button.setFrames(0, 0, 0);
  family_button.inputEnabled = false;
  family_needs_text.addColor("#f0f0f0", 0);
}

function payPet() {
  cash -= pet_food;
  cash_text.setText("Cash: " + cash);

  pet_button.alpha = 0.5;
  pet_button.setFrames(0, 0, 0);
  pet_button.inputEnabled = false;
  pet_food_text.addColor("#f0f0f0", 0);
}

function buyHouse() {
  if (home_type == "Basement") {
    home_rent = 600;
    home_type = "Shared Apartment";
  } else if (home_type == "Shared Apartment") {
    home_rent = 1200;
    home_type = "Single Apartment";
  } else if (home_type == "Single Apartment") {
    home_rent = 2000;
    home_type = "House";
  } else if (home_type == "House") {
    home_rent = 3500;
    home_type = "Vacation Home";
  } else if (home_type == "Vacation Home") {
    home_rent = 5000;
    home_type = "Mansion";
    home_upgrade_button.input.stop();
    home_upgrade_button.destroy();
  }
  home_level += 1;
  job_level = Math.min(home_level, car_level, 5);
  job_text.setText("Job: " + jobs[job_level][0]);
  income = jobs[job_level][1];
  income_text.setText("Income: " + income + "/hr");
  home_text.setText("Home: " + homes[home_level]);
  home_rent_text.setText("Pay Rent: " + home_rent);
}

function buyCar() {
  if (car_type == "Shoes") {
    car_loan = 0;
    car_type = "Bicycle";
    car_sprite = game.add.sprite(700, 400, 'bicycle');
  } else if (car_type == "Bicycle") {
    car_loan = 50;
    car_type = "Motorcycle";
    car_sprite.loadTexture('motorcycle', 0);
  } else if (car_type == "Motorcycle") {
    car_loan = 150;
    car_type = "Used Car";
    car_sprite.loadTexture('oldCar', 0);
  } else if (car_type == "Used Car") {
    car_loan = 650;
    car_type = "New Car"
    car_sprite.loadTexture('newCar', 0);
  } else if (car_type == "New Car") {
    car_loan = 1300;
    car_type = "Sports Car"
    car_sprite.loadTexture('sportsCar', 0);
    car_upgrade_button.input.stop();
    car_upgrade_button.destroy();
  }
  car_level += 1;
  job_level = Math.min(home_level, car_level, 5);
  job_text.setText("Job: " + jobs[job_level][0]);
  income = jobs[job_level][1];
  income_text.setText("Income: " + income + "/hr");
  car_text.setText("Transportation: " + transportation[car_level]);
  car_loan_text.setText("Pay Car Loan: " + car_loan);
}

// TODO: More accurate price for a family of X
function buyFamily() {
  if (family_type == "Single") {
    family_needs = 1000;
    family_type = "Married";
  } else if (family_type == "Married") {
    family_needs = 2000;
    family_type = "Married With A Child";
  } else if (family_type == "Married With A Child") {
    family_needs = 3000;
    family_type = "Married With Two Children";
  } else if (family_type == "Married With Two Children") {
    family_needs = 4000;
    family_type = "Married With Three Children";

    family_upgrade_button.input.stop();
    family_upgrade_button.destroy();
  }
  family_needs_text.setText("Pay Family Needs: " + family_needs);
}

function buyPet() {
  if (pet_type == "None") {
    pet_food = 10;
    pet_type = "Fish";
    pet_sprite = game.add.sprite(600, 400, 'petFish');
  } else if (pet_type == "Fish") {
    pet_food = 30;
    pet_type = "Turtle";
    pet_sprite.loadTexture('petTurtle', 0);
  } else if (pet_type == "Turtle") {
    pet_food = 100;
    pet_type = "Dog";
    pet_sprite.loadTexture('petDog', 0);
  } else if (pet_type == "Dog") {
    pet_food = 150;
    pet_type = "Exotic Cat";
    pet_sprite.loadTexture('petCat', 0);
  } else if (pet_type == "Exotic Cat") {
    pet_food = 500;
    pet_type = "Endangered Tiger";
    pet_sprite.loadTexture('petTiger', 0);

    pet_upgrade_button.input.stop();
    pet_upgrade_button.destroy();
    upgrade_text.setText("");
  }
  pet_food_text.setText("Pay Pet Food: " + pet_food);
}

// TODO: Accurate lottery chances with random jackpot
function buyLottery() {
  cash -= 200;
  //If the player spends more cash than they have, subtract the amount of cash
  //less than 0 divided by 2 from their credit score
  /*if (cash < 0) {
    credit_score += Math.floor(cash / 2);
    credit_score_text.setText("Credit Score: " + credit_score);
    cash = 0
  }*/
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

function upgradeTextOff() {
    upgrade_text.setText("");
}

function homeHover() {
  if (home_type == "Basement") {
    upgrade_text.setText("Shared Apartment");
  } else if (home_type == "Shared Apartment") {
    upgrade_text.setText("Single Apartment");
  } else if (home_type == "Single Apartment") {
    upgrade_text.setText("House")
  } else if (home_type == "House") {
    upgrade_text.setText("Mansion");
  }
}

function carHover() {
  if (car_type == "Shoes") {
    upgrade_text.setText("Bicycle");
  } else if (car_type == "Bicycle") {
    upgrade_text.setText("Motorcycle");
  } else if (car_type == "Motorcycle") {
    upgrade_text.setText("Used Car");
  }else if (car_type == "Used Car") {
    upgrade_text.setText("New Car")
  } else if (car_type == "New Car") {
    upgrade_text.setText("Sports Car");
  }
}

function familyHover() {
  if (family_type == "Single") {
    upgrade_text.setText("Spouse");
  } else if (family_type == "Spouse") {
    upgrade_text.setText("Spouse With A Child");
  } else if (family_type == "Spouse With A Child") {
    upgrade_text.setText("Spouse With Two Children")
  } else if (family_type == "Spouse With Two Children") {
    upgrade_text.setText("Spouse With Three Children");
  }
}

function petHover() {
  if (pet_type == "None") {
    upgrade_text.setText("Fish");
  } else if (pet_type == "Fish") {
    upgrade_text.setText("Turtle");
  } else if (pet_type == "Turtle") {
    upgrade_text.setText("Dog")
  } else if (pet_type == "Dog") {
    upgrade_text.setText("Exotic Cat");
  } else if (pet_type == "Exotic Cat") {
    upgrade_text.setText("Endangered Tiger");
  }
}

function update() {
  var current_time = this.game.time.totalElapsedSeconds();
  var hours;
  var months;

  // 0.082 to convert 1 month in hours to a minute
  if (old_time + 0.082 < current_time) {
    old_time = current_time;
  }
  real_time = current_time;

  // Time display values
  if (old_time == real_time) {
    time++;
    hours = time % 720;
    months = Math.floor(time / 720);
    years = Math.floor(time / 8640)
    months = months % 13;
    time_text.setText("Time: " + years + " years " + months + " months " + hours + " hours");
  }

  // Enable buttons again on new month
  if (button_time < months) {
    button_time = months;

    home_button.alpha = 1.0;
    home_button.setFrames(1, 1, 2);
    home_button.inputEnabled = true;
    home_rent_text.addColor("#000000", 0);

    car_button.alpha = 1.0;
    car_button.setFrames(1, 1, 2);
    car_button.inputEnabled = true;
    car_loan_text.addColor("#000000", 0);

    family_button.alpha = 1.0;
    family_button.setFrames(1, 1, 2);
    family_button.inputEnabled = true;
    family_needs_text.addColor("#000000", 0);

    pet_button.alpha = 1.0;
    pet_button.setFrames(1, 1, 2);
    pet_button.inputEnabled = true;
    pet_food_text.addColor("#000000", 0);
  }

  // Only earn income for first 8 hours per day
  if (income_time + 8 >= hours) {
    cash += income;
    cash_text.setText("Cash: " + cash);
  } else if (income_time + 24 < hours) {
    income_time = hours;
  }
}

function render() {

}
