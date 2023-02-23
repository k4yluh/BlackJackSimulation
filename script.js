// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    colorMode, createCanvas, background, backgroundColor, random
 *    ellipse, mouseX, mouseY, text, HSB, width, height, fill, rect, textSize
 *    keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, image, frog, loadImage, goalline, frogbg, car, carright, frogD
 *    color, createButton, createSlider, clear, random, round, noLoop, textFont, stroke, noFill, noStroke
 */

let backgroundColor,
  mode = 0;
let buttonheight,
  gameColor,
  budget,
  decision,
  playbutton,
  settingbutton,
  backbutton,
  volumeSlider,
  music;
let standbutton, doublebutton, hitbutton, play2button, endbutton, birds;
let pCards, dCards, dCardFlipped, hAllBtn, hDBtn, dSum, pSum, bet;

// 0 = title screen
// 1 = game
// 2 = settings
// 3 = game over
budget = 500;
function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = color("#1983E9");
  gameColor = color("#FFF");
  pCards = [];
  dCards = [];
  let numberOfCards = 2;
  bet = window.prompt("Enter your bet: ");
  alert("Your bet is " + bet);
  // add code once everything else works^^
  let pCardX = 30;
  let pCardY = 260;
  for (var i = 0; i < numberOfCards; i++) {
    pCards.push(new playerCard(pCardX, pCardY));
    pCardX = pCardX + 40;
    pCardY = pCardY + 30;
  }

  let dCardX = 30;
  let dCardY = 50;
  for (var i = 0; i < 1; i++) {
    dCards.push(new dealerCard(dCardX, dCardY));
  }
  dCardFlipped = new dealerCard(dCardX + 40, dCardY + 30);

  buttonheight = 200;
  decision = "";
  // data

  //buttons
  playbutton = createButton("Play");
  playbutton.mousePressed(playGame);
  playbutton.id("playbutton");
  playbutton.position(width / 2 - 15, height / 2 - -20);
  playbutton.addClass("buttons");
  //setting button
  settingbutton = createButton("Settings");
  settingbutton.mousePressed(settings);
  settingbutton.id("settingbutton");
  settingbutton.position(width / 2 - 50, height / 2 - -70);
  settingbutton.addClass("buttons");
  /// setting back
  backbutton = createButton("Back");
  backbutton.mousePressed(titleScreen);
  backbutton.position(width / 2 - 15, height / 2 - -20);
  backbutton.hide();
  backbutton.addClass("buttons");

  //sound slider
  volumeSlider = createSlider(0, 5, 1.5, 0.5);
  volumeSlider.position(width / 2 - 20, height / 2 - 10);
  volumeSlider.addClass("sliders");
  volumeSlider.hide();

  standbutton = createButton("Stand");
  standbutton.mousePressed(stand);
  standbutton.id("standbutton");
  standbutton.position(50, 230);
  standbutton.addClass("buttons");

  doublebutton = createButton("Double");
  doublebutton.mousePressed(double);
  doublebutton.id("doublebutton");
  doublebutton.position(180, 230);
  doublebutton.addClass("buttons");

  hitbutton = createButton("Hit");
  hitbutton.mousePressed(hit);
  hitbutton.id("hitbutton");
  hitbutton.position(320, 230);
  hitbutton.addClass("buttons");

  play2button = createButton("Play Again?");
  play2button.mousePressed(playAgain);
  play2button.id("play2button");
  play2button.position(200, buttonheight);
  play2button.addClass("buttons");

  endbutton = createButton("End Game");
  endbutton.mousePressed(end);
  endbutton.id("endbutton");
  endbutton.position(200, buttonheight + 100);
  endbutton.addClass("buttons");
}

function titleScreen() {
  mode = 0;
}
function playGame() {
  mode = 1;
}
function settings() {
  mode = 2;
}
function gameOver() {
  mode = 3;
}
function draw() {
  checkGame();
}

function checkGame() {
  if (mode === 0) {
    // title screen
    starter();
  }
  else if (mode === 1) {
    /// play
    playScreen();
  }

  else if (mode === 2) {
    /// settings
    volumeSlider.show();
    background(backgroundColor);
    playbutton.hide();
    settingbutton.hide();
    const volume = volumeSlider.value();
    music.setVolume(volume);
    backbutton.show();
  }
  else if (mode === 3) {
    //end screen
    lastScreen();
  }
}

function starter() {
  // code for the starter screen
  background(backgroundColor);
  playbutton.show();
  settingbutton.hide();
  fill(0);
  text("Blackjack!", 150, 75);
  text(`Your budget is $ ${budget}`, 50, 150);
  textFont("Alfa Slab One");
  textSize(20);
  backbutton.hide();
  volumeSlider.hide();
  standbutton.hide();
  doublebutton.hide();
  hitbutton.hide();
  play2button.hide();
  endbutton.hide();
}

function playScreen() {
  // code to formate the play page
  background(gameColor);
  fill(0);
  noStroke();
  text("The Dealer", 150, 30);
  text("Player", 170, 385);
  textFont("Alfa Slab One");
  // Code for gold goal line
  standbutton.show();
  hitbutton.show();
  doublebutton.show();
  playbutton.hide();
  settingbutton.hide();
  volumeSlider.hide();
  play2button.hide();
  endbutton.hide();
  // code for cards
  for (var i = 0; i < pCards.length; i++) {
    const playCards = pCards[i];
    playCards.suitChoice();
    playCards.royalNums();
    playCards.showSelf();
  }

  for (var i = 0; i < dCards.length; i++) {
    const dealCards = dCards[i];
    dealCards.suitChoice();
    dealCards.royalNums();
    dealCards.showSelf();
  }

  dCardFlipped.suitChoice();
  dCardFlipped.royalNums();
  dCardFlipped.showSelfNot();

  if (hAllBtn === true) {
    standbutton.hide();
    doublebutton.hide();
    hitbutton.hide();
    text(dSum, 150, 60);
    text(pSum, 150, 250);
    text("You " + decision + " $" + bet, 200, 200);
    text("Your budget: " + budget, 200, 215);
    play2button.show();
    play2button.position(270, 350);
  }

  if (hDBtn === true) {
    doublebutton.hide();
  }
}

function lastScreen() {
  // code to format the end screen
  background(gameColor); //Decision equals win or lose, will change depending on outcome
  play2button.show();
  endbutton.show();
  standbutton.hide();
  hitbutton.hide();
  doublebutton.hide();
  playbutton.hide();
  settingbutton.hide();
  volumeSlider.hide();
}

function playAgain() {
  // code for button that plays game again
  // enter code that resets the cards and starts the game again
  mode = 0;
}

function end() {
  // ends the loop and game
  noLoop();
}

class playerCard {
  constructor(x, y) {
    this.number = round(random(1, 13));
    this.suit = round(random(1, 4));
    this.suit2 = "";
    this.x = x;
    this.y = y;
    //card number; 1= Ace, 2= 2, so on,
    // suit ; 1 = spades, 2 = hearts, 3 = diamonds, 4 = clubs
  }
  suitChoice() {
    if (this.suit === 1) {
      this.suit2 = "♤";
    } else if (this.suit === 2) {
      this.suit2 = "♡";
    } else if (this.suit === 3) {
      this.suit2 = "♢";
    } else if (this.suit === 4) {
      this.suit2 = "♧";
    }
  }

  royalNums() {
    if (this.number === 1) {
      this.number = "A";
    } else if (this.number === 11) {
      this.number = "J";
    } else if (this.number === 12) {
      this.number = "Q";
    } else if (this.number === 13) {
      this.number = "K";
    }
  }

  showSelf() {
    stroke("black");
    noFill();
    rect(this.x, this.y, 60, 60);
    text(this.number, this.x + 20, this.y + 40);
    text(this.suit2, this.x + 5, this.y + 17);
    textSize(15);
  }
}

class dealerCard {
  constructor(x, y) {
    this.number = round(random(1, 13));
    this.suit = round(random(1, 4));
    this.suit2 = "";
    this.x = x;
    this.y = y;
    //card number; 1= Ace, 2= 2, so on,
    // suit ; 1 = spades, 2 = hearts, 3 = diamonds, 4 = clubs
  }
  suitChoice() {
    if (this.suit === 1) {
      this.suit2 = "♤";
    } else if (this.suit === 2) {
      this.suit2 = "♡";
    } else if (this.suit === 3) {
      this.suit2 = "♢";
    } else if (this.suit === 4) {
      this.suit2 = "♧";
    }
  }

  royalNums() {
    if (this.number === 1) {
      this.number = "A";
    } else if (this.number === 11) {
      this.number = "J";
    } else if (this.number === 12) {
      this.number = "Q";
    } else if (this.number === 13) {
      this.number = "K";
    }
  }

  showSelf() {
    stroke("black");
    noFill();
    rect(this.x, this.y, 60, 60);
    text(this.number, this.x + 20, this.y + 40);
    text(this.suit2, this.x + 5, this.y + 17);
    textSize(15);
  }

  showSelfNot() {
    stroke("black");
    noFill();
    rect(this.x, this.y, 60, 60);
  }
}

function stand() {
  hAllBtn = true;
  // enter code to "stand" during game
  let pVal;
  let dVal;
  pSum = 0;
  dSum = 0;
  for (var i = 0; i < pCards.length; i++) {
    pVal = pCards[i];
    if (pVal.number === "K" || pVal.number === "J" || pVal.number === "Q") {
      pVal.number = 10;
    } else if (pSum < 11 && pVal.number === "A") {
      pVal.number = 11;
    } else if (pSum > 10 && pVal.number === "A") {
      pVal.number = 1;
    }
    pSum = pSum + pVal.number;
  }

  dCards.push(dCardFlipped);
  for (var i = 0; i < dCards.length; i++) {
    dVal = dCards[i];
    if (dVal.number === "K" || dVal.number === "J" || dVal.number === "Q") {
      dVal.number = 10;
    } else if (dSum < 11 && dVal.number === "A") {
      dVal.number = 11;
    } else if (dSum > 10 && dVal.number === "A") {
      dVal.number = 1;
    }
    dSum = dSum + dVal.number;
  }

  let newDCard;
  while (dSum <= 16) {
    newDCard = dCards[dCards.length - 1];
    dCards.push(new dealerCard(newDCard.x + 65, 60));
    newDCard = dCards[dCards.length - 1];
    newDCard.showSelf();
    newDCard.suitChoice();
    newDCard.royalNums();
    dVal = newDCard;
    if (dVal.number === "K" || dVal.number === "J" || dVal.number === "Q") {
      dVal.number = 10;
    } else if (dSum < 11 && dVal.number === "A") {
      dVal.number = 11;
    } else if (dSum > 10 && dVal.number === "A") {
      dVal.number = 1;
    }
    dVal = dCards[dCards.length - 1];
    dSum = dSum + dVal.number;
  }
  console.log("stand");
  winOrLose();
  earnings();
}

function double() {
  hAllBtn = true;
  bet = bet * 2;
  let oneNewPCard;
  // enter code to 'double' during game
  oneNewPCard = pCards[pCards.length - 1];
  pCards.push(new playerCard(oneNewPCard.x + 50, 280));
  oneNewPCard.showSelf();
  oneNewPCard.suitChoice();
  oneNewPCard.royalNums();
  console.log("Double");
  stand();
}

function hit() {
  let newPCard;
  hDBtn = true;
  // enter code to 'hit' during game
  newPCard = pCards[pCards.length - 1];
  pCards.push(new playerCard(newPCard.x + 50, 280));
  newPCard.showSelf();
  newPCard.suitChoice();
  newPCard.royalNums();
  console.log("hit");
}

function winOrLose() {
  if (pSum === 21 && dSum != 21) {
    decision = "Win";
  } else if (pSum < 21 && dSum > 21) {
    decision = "Win";
  } else if (pSum > dSum && dSum < 21 && pSum < 21) {
    decision = "Win";
  } else if (pSum > 21 || pSum < dSum) {
    decision = "Lose";
  } else if (pSum === dSum) {
    decision = "Tie";
  }
}

function earnings() {
  if (decision === "Win") {
    budget = budget + bet;
  } else if (decision === "Lose") {
    budget = budget - bet;
  } else if (decision === "tie") {
    return;
  }
}
