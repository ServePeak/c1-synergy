var config = {
  "width": 1000,
  "height": 600,
  "renderer": Phaser.CANVAS,
  "parent": 'phaser-example',
  // "resolution": window.devicePixelRatio, // This changes sizes for every device try not to use
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
  game.load.spritesheet('button', 'static/images/buttons.png', 200, 40);
  game.load.image('gameOver', 'static/images/gameover.png'); 
  game.load.image('empty', 'static/images/pixel.png');
  game.load.image('homeUpgrade', 'static/images/houseupgrade.png');
  game.load.image('carUpgrade', 'static/images/bikeupgrade.png');
  game.load.image('familyUpgrade', 'static/images/stickupgrade.png');
  game.load.image('petUpgrade', 'static/images/petupgrade.png');
  game.load.image('lotteryTicket', 'static/images/lottery.png');
  game.load.image('adultHuman', 'static/images/defaultperson.png');
  game.load.image('childHuman', 'static/images/child.png');
  game.load.image('basement', 'static/images/basement.png');
  game.load.image('sharedApt', 'static/images/apartment.png');
  game.load.image('singleApt', 'static/images/singleapartment.png');
  game.load.image('house', 'static/images/house.png');
  game.load.image('vacationHouse', 'static/images/vacationhouse.png');
  game.load.image('mansion', 'static/images/mansion.png');
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

  var general_style = { font: "16px Arial", fill: "#ffffff", stroke: "#000000", strokeThickness: "4" };
  var button_style = { font: "16px Arial", fill: "#f0f0f0", boundsAlignH: "center", boundsAlignV: "middle" };
  var hover_style = { font: "16px Arial", fill: "#ffffff", stroke: "#000000", strokeThickness: "4", boundsAlignH: "center", align: "center" };

  // Background
  background = game.add.sprite(0, 0, 'basement');

  // Sprites
  main_sprite = game.add.sprite(200, 330, 'adultHuman');
  spouse_sprite = game.add.sprite(250, 330, 'empty');
  child1_sprite = game.add.sprite(150, 405, 'empty');
  child2_sprite = game.add.sprite(100, 405, 'empty');
  child3_sprite = game.add.sprite(50, 405, 'empty');
  car_sprite = game.add.sprite(750, 340, 'empty');
  pet_sprite = game.add.sprite(600, 400, 'empty');

  // Pay buttons (left)
  home_button = game.add.button(10, 60, 'button', payHouse, this, 0, 0, 0);
  car_button = game.add.button(10, 100, 'button', payCar, this, 0, 0, 0);
  family_button = game.add.button(10, 140, 'button', payFamily, this, 0, 0, 0);
  pet_button = game.add.button(10, 180, 'button', payPet, this, 0, 0, 0);
  home_button.alpha = 0.5;
  home_button.inputEnabled = false;
  car_button.alpha = 0.5;
  car_button.inputEnabled = false;
  family_button.alpha = 0.5;
  family_button.inputEnabled = false;
  pet_button.alpha = 0.5;
  pet_button.inputEnabled = false;

  // Upgrade buttons (top-right)
  home_upgrade_button = game.add.button(780, 50, 'homeUpgrade', buyHouse, this, 1, 1, 1);
  car_upgrade_button = game.add.button(830, 50, 'carUpgrade', buyCar, this, 1, 1, 1);
  family_upgrade_button = game.add.button(880, 50, 'familyUpgrade', buyFamily, this, 1, 1, 1);
  pet_upgrade_button = game.add.button(930, 50, 'petUpgrade', buyPet, this, 1, 1, 1);
  lottery_button = game.add.button(900, 480, 'lotteryTicket', buyLottery, this, 1, 1, 1);

  // The various text that the user needs to know
  credit_score_text = game.add.text(10, 20, "Credit Score: " + credit_score, general_style);
  income_text = game.add.text(10, 570, "Income: " + income + "/hr", general_style);
  cash_text = game.add.text(430, 570, "Cash: " + cash, general_style);
  time_text = game.add.text(740, 570, "Time: " + time + " hours", general_style);
  home_text = game.add.text(10, 230, "Home: " + homes[home_level], general_style);
  car_text = game.add.text(10, 250, "Transportation: " + transportation[car_level], general_style);
  job_text = game.add.text(10, 270, "Job: " + jobs[job_level][0], general_style);
  upgrade_info = game.add.text(840, 20, "Upgrades", general_style);
  lottery_text = game.add.text(910, 450, "Lottery", general_style);

  // Pay button text
  home_rent_text = game.add.text(0, 0, "Pay Rent: " + home_rent, button_style);
  home_rent_text.setTextBounds(20, 60, 180, 45);
  car_loan_text = game.add.text(0, 0, "Pay Car Loan: " + car_loan, button_style);
  car_loan_text.setTextBounds(20, 100, 180, 45);
  family_needs_text = game.add.text(0, 0, "Pay Family Needs: " + family_needs, button_style);
  family_needs_text.setTextBounds(20, 140, 180, 45);
  pet_food_text = game.add.text(0, 0, "Pay Pet Food: " + pet_food, button_style);
  pet_food_text.setTextBounds(20, 180, 180, 45);

  // Upgrade button hover text
  upgrade_text = game.add.text(0, 0, "", hover_style);
  upgrade_text.setTextBounds(780, 110, 200, 0);
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
  lottery_hover_text = game.add.text(875, 540, "", hover_style);
  lottery_button.events.onInputOver.add(lotteryHover, this);
  lottery_button.events.onInputUp.add(lotteryHover, this);
  lottery_button.events.onInputOut.add(upgradeTextOff, this);
}

function payHouse() {
  cash -= home_rent;
  credit_score++;

  home_button.alpha = 0.5;
  home_button.setFrames(0, 0, 0);
  home_button.inputEnabled = false;
  home_rent_text.addColor("#f0f0f0", 0);
}

function payCar() {
  cash -= car_loan;
  credit_score++;

  car_button.alpha = 0.5;
  car_button.setFrames(0, 0, 0);
  car_button.inputEnabled = false;
  car_loan_text.addColor("#f0f0f0", 0);
}

function payFamily() {
  cash -= family_needs;
  credit_score += family_needs / 20;

  family_button.alpha = 0.5;
  family_button.setFrames(0, 0, 0);
  family_button.inputEnabled = false;
  family_needs_text.addColor("#f0f0f0", 0);
}

function payPet() {
  cash -= pet_food;
  credit_score += pet_food / 20;

  pet_button.alpha = 0.5;
  pet_button.setFrames(0, 0, 0);
  pet_button.inputEnabled = false;
  pet_food_text.addColor("#f0f0f0", 0);
}

function buyHouse() {
  if (home_type == "Basement") {
    home_rent = 600;
    home_type = "Shared Apartment";
    background.loadTexture('sharedApt', 0);
    credit_score = credit_score + 1;
  } else if (home_type == "Shared Apartment") {
    home_rent = 1200;
    home_type = "Single Apartment";
    background.loadTexture('singleApt', 0);
    credit_score = credit_score + 2;
  } else if (home_type == "Single Apartment") {
    home_rent = 2000;
    home_type = "House";
    background.loadTexture('house', 0);
    credit_score = credit_score + 3;
    cash -= 5000;
  } else if (home_type == "House") {
    home_rent = 3500;
    home_type = "Vacation Home";
    background.loadTexture('vacationHouse', 0);
    credit_score = credit_score + 4;
    cash -= 15000;
  } else if (home_type == "Vacation Home") {
    home_rent = 5000;
    home_type = "Mansion";
    background.loadTexture('mansion', 0);
    credit_score = credit_score + 5;
    cash -= 25000;

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
  upgrade_text.setText("");
}

function buyCar() {
  if (car_type == "Shoes") {
    car_loan = 25;
    car_type = "Bicycle";
    car_sprite.loadTexture('bicycle');
    credit_score = credit_score + 1;
    cash -= 325;
  } else if (car_type == "Bicycle") {
    car_loan = 100;
    car_type = "Motorcycle";
    car_sprite.loadTexture('motorcycle', 0);
    credit_score = credit_score + 2;
    cash -= 1500;
  } else if (car_type == "Motorcycle") {
    car_loan = 150;
    car_type = "Used Car";
    car_sprite.loadTexture('oldCar', 0);
    credit_score = credit_score + 3;
    cash -= 3000;
  } else if (car_type == "Used Car") {
    car_loan = 650;
    car_type = "New Car"
    car_sprite.loadTexture('newCar', 0);
    credit_score = credit_score + 4;
    cash -= 2000;
  } else if (car_type == "New Car") {
    car_loan = 1300;
    car_type = "Sports Car"
    cash -= 8000;

    car_sprite.loadTexture('sportsCar', 0);
    credit_score = credit_score + 5;
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
  upgrade_text.setText("");
}

// TODO: More accurate price for a family of X
function buyFamily() {
  if (family_type == "Single") {
    family_needs = 1000;
    family_type = "Spouse";
    spouse_sprite.loadTexture('adultHuman');
    credit_score = credit_score + 1;
    cash -= 10000;
  } else if (family_type == "Spouse") {
    family_needs = 2000;
    family_type = "Spouse With A Child";
    child1_sprite.loadTexture('childHuman');
    credit_score = credit_score + 2;
    cash -= 5000;
  } else if (family_type == "Spouse With A Child") {
    family_needs = 3000;
    family_type = "Spouse With Two Children";
    child2_sprite.loadTexture('childHuman');
    credit_score = credit_score + 3;
    cash -= 5000;
  } else if (family_type == "Spouse With Two Children") {
    family_needs = 4000;
    family_type = "Spouse With Three Children";
    child3_sprite.loadTexture('childHuman');
    credit_score = credit_score + 4;
    cash -= 5000;

    family_upgrade_button.input.stop();
    family_upgrade_button.destroy();
  }
  family_needs_text.setText("Pay Family Needs: " + family_needs);
  upgrade_text.setText("");
}

function buyPet() {
  if (pet_type == "None") {
    pet_food = 10;
    pet_type = "Fish";
    pet_sprite.loadTexture('petFish');
    credit_score = credit_score + 1;
    cash -= 100;
  } else if (pet_type == "Fish") {
    pet_food = 30;
    pet_type = "Turtle";
    pet_sprite.loadTexture('petTurtle', 0);
    credit_score = credit_score + 2;
    cash -= 20;
  } else if (pet_type == "Turtle") {
    pet_food = 100;
    pet_type = "Dog";
    pet_sprite.loadTexture('petDog', 0);
    credit_score = credit_score + 3;
    cash -= 250;
  } else if (pet_type == "Dog") {
    pet_food = 200;
    pet_type = "Exotic Cat";
    pet_sprite.loadTexture('petCat', 0);
    credit_score = credit_score + 4;
    cash -= 800;
  } else if (pet_type == "Exotic Cat") {
    pet_food = 500;
    pet_type = "Endangered Tiger";
    pet_sprite.loadTexture('petTiger', 0);
    credit_score = credit_score + 5;
    cash -= 3000;

    pet_upgrade_button.input.stop();
    pet_upgrade_button.destroy();
  }
  pet_food_text.setText("Pay Pet Food: " + pet_food);
  upgrade_text.setText("");
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
  for(i = 0; i < 100; i++) {
    key = Math.floor((Math.random() * 300000000) + 1);
    roll = Math.floor((Math.random() * 300000000) + 1);
    if (key == roll) {
      cash += Math.floor((Math.random()) + 1);
      break;
    }
  }
}

function upgradeTextOff() {
    upgrade_text.setText("");
    lottery_hover_text.setText("");
}

function homeHover() {
  if (home_type == "Basement") {
    upgrade_text.setText("Shared Apartment\nDown Payment: 0\nRent: 600");
  } else if (home_type == "Shared Apartment") {
    upgrade_text.setText("Single Apartment\nDown Payment: 0\nRent: 1200");
  } else if (home_type == "Single Apartment") {
    upgrade_text.setText("House\nDown Payment: 5000\nMortgage: 2000");
  } else if (home_type == "House") {
    upgrade_text.setText("Vacation Home\nDown Payment: 15000\nMortgage: 3500");
  } else if (home_type == "Vacation Home") {
    upgrade_text.setText("Mansion\nDown Payment: 25000\nMortgage: 5000");
  }
}

function carHover() {
  if (car_type == "Shoes") {
    upgrade_text.setText("Bicycle\nPrice: 325\nMaintenance: 25");
  } else if (car_type == "Bicycle") {
    upgrade_text.setText("Motorcycle\nPrice: 1500\nInsurance: 100");
  } else if (car_type == "Motorcycle") {
    upgrade_text.setText("Used Car\nPrice: 3000\nInsurance: 150");
  } else if (car_type == "Used Car") {
    upgrade_text.setText("New Car\nPrice: 2000\nLoan & Insurance: 600");
  } else if (car_type == "New Car") {
    upgrade_text.setText("Sports Car\nPrice: 8000\nLoan & Insurance: 1300");
  }
}

function familyHover() {
  if (family_type == "Single") {
    upgrade_text.setText("Spouse\nMarriage: 10000\nLifestyle: 1000");
  } else if (family_type == "Spouse") {
    upgrade_text.setText("Spouse With A Child\nChildbirth: 5000\nLifestyle: 2000");
  } else if (family_type == "Spouse With A Child") {
    upgrade_text.setText("Spouse With Two Children\nChildbirth: 5000\nLifestyle: 2000");
  } else if (family_type == "Spouse With Two Children") {
    upgrade_text.setText("Spouse With Three Children\nChildbirth: 5000\nLifestyle: 2000");
  }
}

function petHover() {
  if (pet_type == "None") {
    upgrade_text.setText("Fish\nPrice: 100\nFood: 10");
  } else if (pet_type == "Fish") {
    upgrade_text.setText("Turtle\nPrice: 20\nFood: 30");
  } else if (pet_type == "Turtle") {
    upgrade_text.setText("Dog\nPrice: 250\nFood: 100");
  } else if (pet_type == "Dog") {
    upgrade_text.setText("Exotic Cat\nPrice: 800\nFood: 200");
  } else if (pet_type == "Exotic Cat") {
    upgrade_text.setText("Endangered Tiger\nPrice: 3000\nFood: 500");
  }
}

function lotteryHover() {
  lottery_hover_text.setText("100 Tickets: 200");
}

function update() {
  if (credit_score > 300) {
    var current_time = this.game.time.totalElapsedSeconds();
    var hours;
    var months;

    // 0.082 to convert 1 month in hours to a minute
    if (old_time + 0.041 < current_time) {
      old_time = current_time;
    }
    real_time = current_time;

    // Time display values
    if (old_time == real_time) {
      time++;
      hours = time % 720;
      /*//At the end of the month if the player's cash is negative decrease their credit score
      if (hours / 719 == 0 && cash < 0) {
        credit_score -= 25;
        credit_score_text.setText("Credit Score: " + credit_score);
      }*/
      months = Math.floor(time / 720);
      years = Math.floor(time / 8640)
      months = months % 13;
      time_text.setText("Time: " + years + " years " + months + " months " + hours + " hours");
    }

    // Enable buttons again on new month
    if (months == 0) {
      button_Time = -1;
    }
    if (button_time < months) {
      button_time = months;
      
      if (cash < 0) {
          credit_score += cash / 10;
      }

      if (home_rent > 0) {
        home_button.alpha = 1.0;
        home_button.setFrames(1, 1, 2);
        home_button.inputEnabled = true;
        home_rent_text.addColor("#000000", 0);
      }

      if (car_loan > 0) {
        car_button.alpha = 1.0;
        car_button.setFrames(1, 1, 2);
        car_button.inputEnabled = true;
        car_loan_text.addColor("#000000", 0);
      }

      if (family_needs > 0) {
        family_button.alpha = 1.0;
        family_button.setFrames(1, 1, 2);
        family_button.inputEnabled = true;
        family_needs_text.addColor("#000000", 0);
      }

      if (pet_food > 0) {
        pet_button.alpha = 1.0;
        pet_button.setFrames(1, 1, 2);
        pet_button.inputEnabled = true;
        pet_food_text.addColor("#000000", 0);
      }
    }

    // Only earn income for first 8 hours per day
    if (hours == 0) {
      income_time = 0;
    }
    if (income_time + 8 >= hours) {
      cash += income;
    } else if (income_time + 24 < hours) {
      income_time = hours;
    }
    
    if (credit_score > 850) {
        credit_score = 850;
    }
  } else {
    game_over = game.add.sprite(0, 0, 'gameOver');
  }
}

function render() {
  credit_score_text.setText("Credit Score: " + Math.floor(credit_score));
  cash_text.setText("Cash: " + cash);
}
