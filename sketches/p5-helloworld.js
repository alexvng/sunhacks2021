p5.disableFriendlyErrors = true;
let theta = 0,
  phi = 0;
let words = 'hello world';

function preload() {
  createVRCanvas();
  courier = loadFont("../../../assets/courier.otf");
}

function setup() {
  setVRBackgroundColor(100, 100, 100);
  rectMode(CENTER);
  textSize(0.5);
  textFont(courier);
  textAlign(CENTER,CENTER);
}

function calculate() {
  theta += 0.01;
  phi += 0.01;
}

function draw() {
  ftranslate(0,0,500);
  rotateX(theta);
  rotateY(phi);
  textWrap(CHAR);
  ftext(words,0,0,1);
}

function ftranslate(x, y, z) {
  const scaleFactor = 100;
  x /= scaleFactor;
  y /= scaleFactor;
  z /= scaleFactor;
  translate(x, y, -z);
}

function ftext(userString, x, y) {
  push();
  rotateX(PI);
  text(userString,x,y);
}