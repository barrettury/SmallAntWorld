var state = 0;
var ant;
var donk;
var moom;
var nut;
var mar;
var rev;
var jumpman;
var marPos;
let moons = [];
var nutson;
var timey;
var lives;
let grace = 1;
let graceTimer = 60;

function preload() {
  ant = loadSound("FlyMetotheAntLoop.mp3");
}

function setup() {
  createCanvas(750, 500);
  imageMode(CENTER);
  textAlign(CENTER);
  donk = loadImage("NewDonk.jpg");
  moom = loadImage("Moom.png");
  nut = loadImage("NUT.png");
  mar = loadImage("SuperMario.png");
  rev = loadImage("SuperMarioReverse.png");
  ant.play();
  ant.pause();
  jumpman = loadFont("Jumpman.ttf");
}

function draw() {
  switch (state) {
    case 0:
      setGame();
      ant.loop();
      timey = 180;
      state = 1;
      break;
    case 1:
      image(donk, width / 2, height / 2, width, height);
      fill("Black");
      textFont(jumpman);
      textSize(50);
      text("Welcome to\nSmallAnt\nWorld", width / 2, 100);

      timey--;
      if (timey < 0) state = 2;
      break;
    case 2:
      image(donk, width / 2, height / 2, width, height);
      fill("Black");
      textFont(jumpman);
      textSize(30);
      text("Collect the Moons\nAnd Avoid the nuts\nto Win!!!\n\n Good Luck!", width / 2, 100);
      break;
    case 3:
      image(donk, width / 2, height / 2, width, height);
      playGame();
      break;
    case 4:
      ant.pause();
      background("green");
      fill("black");
      textSize(80);
      textFont(jumpman);
      text("Congrats!\n You Nutted!", width / 2, height / 2);
      break;
    case 5:
      ant.pause();
      background("white");
      fill("red");
      textSize(80);
      textFont(jumpman);
      text("You Lose", width / 2, height / 2);
      break;

  }
}

function setGame() {
  lives = 3;
  marPos = createVector(width / 2, height);
  for (let i = 0; i < 5; i++) {
    moons.push(new Moon());
  }
  nutson = new Nut();
}

function playGame() {
  fill("black")
  textFont(jumpman);
  textSize(20);
  text("Lives: " + lives, 40, 20);
  for (let i = 0; i < moons.length; i++) {
    moons[i].display();
    moons[i].move();
    if (moons[i].pos.dist(marPos) < 75) {
      moons.splice(i, 1);
    }
  }
  nutson.display();
  nutson.move();

  if ((nutson.pos.dist(marPos) < 75) && (grace == 1)) {
    lives--;
    //ouch.play();
    grace = 0;
  }

  if (grace == 0)
    graceTimer--;
  if (graceTimer < 0) {
    grace = 1;
    graceTimer = 150;
  }

  checkForKeys();
  if (moons.length = 0) state = 4;
  if (lives < 1) state = 5;

}

function mouseReleased() {
  switch (state) {
    case 2:
      state = 3;
      break;
    case 4:
      state = 0;
      break;
    case 5:
      state = 0;
      break;
  }
}

class Moon {

  // constructor and attributes
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(random(-4, 4), random(-4, 4));
  }

  // methods

  display() {
    image(moom, this.pos.x, this.pos.y);
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

  }
}
class Nut {

  // constructor and attributes
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(-3, -8);
  }

  // methods

  display() {
    image(nut, this.pos.x, this.pos.y);
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

  }
}


function checkForKeys() {
  if (keyIsDown(UP_ARROW)) {
    marPos.y -= 6;
  }
  if (keyIsDown(UP_ARROW) && !(keyIsDown(LEFT_ARROW))) {
    image(mar, marPos.x, marPos.y);
  }
  if (keyIsDown(DOWN_ARROW)) {
    marPos.y += 6;
  }
  if (keyIsDown(DOWN_ARROW) && !(keyIsDown(LEFT_ARROW))) {
    image(mar, marPos.x, marPos.y);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    marPos.x += 6;
  }
  if (keyIsDown(RIGHT_ARROW) && !(keyIsDown(LEFT_ARROW))) {
    image(mar, marPos.x, marPos.y);
  }

  if (keyIsDown(LEFT_ARROW)) {
    marPos.x -= 6;
    image(rev, marPos.x, marPos.y);

  }
  if (!(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)))
    image(mar, marPos.x, marPos.y);

  if (marPos.x > width) marPos.x = width;
  if (marPos.y > height) marPos.y = height;
  if (marPos.x < 0) marPos.x = 0;
  if (marPos.y < 0) marPos.y = 0;
}

function touchStarted() {
  getAudioContext().resume();
}
