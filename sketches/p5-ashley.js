let sound;
let planet_img;
let space_image;

var networker;
//let heartRate;

let stars = [];

let theta;
let xpos;
let zpos;
let dx;
let dz;
let ring_rate;

function preload() {
  createVRCanvas();
  sound = loadSound('https://cdn.glitch.com/c0bfe0ba-b50a-4d9a-9801-3df11f4ea05f%2Fspace_AShamaluevMusic.mp3?v=1633207499533');
  planet_img = loadImage('https://cdn.glitch.com/c0bfe0ba-b50a-4d9a-9801-3df11f4ea05f%2Fweird_planet.jpg?v=1633158302771');
  space_img = loadImage('https://cdn.glitch.com/c0bfe0ba-b50a-4d9a-9801-3df11f4ea05f%2Fdark_space.jpg?v=1633162075934');
  
}

function setup() {
  networker = new Networker();
  
  setVRBackgroundColor(16, 19, 23); //dark blue
  noStroke();
  sound.loop();
  sound.play();
  
  xpos = 0; //x position of planet
  zpos = -6; //z position of planet
  dx = .005; //x speed of planet
  dz = .003; //z speed of planet
  
  heartRate = 1;
  
  theta = 0.02; //controls planet rotation
  
  //creates 100 Star objects
  for (let i = 0; i <= 100; i++) {
    stars.push(new Star());
  }
}

function calculate() {
  ring_rate = networker.getAvgBMP(1, 2, 0, 120); //min, max, range of heartbeat
}

function draw() {
  //space box (outer textured boundary)
  texture(space_img);
  translate(0, 0, 0);
  box(35);
  
  //draw stars
  fill(255); //white
  for (let i = 0; i < stars.length; i++) {
    stars[i].move();
    stars[i].display();
  }
  
  //planet stays above user at y = 8, x and z positions change according to x and z speeds (variables)
  translate(xpos, 8, zpos);
  xpos += dx;
  zpos -= dz;
  
  //change sphere direction when boundary is hit
  if(xpos < -10 || xpos > 10) {
    dx = -dx;
    dz = -dz;
  }
  
  //rotates planet in x, y, z angles
  rotateX(theta);
  rotateY(theta);
  rotateZ(theta);
  
  theta += .0005;
  
  //draw planet rings
  fill(180, 102, 20, 100) //orange (rgb color from planet texture)
  torus(3 * ring_rate, .3); //smaller ring around sphere
  fill(216,207,156, 100) //light brown (rgb color from planet texture)
  torus(3.8 * ring_rate, .1); //larger ring around sphere
  
  //pass image as texture
  texture(planet_img);
  sphere(2);
}

class Star {
  constructor() {
    this.x = random(-15, 15);
    this.y = random(-15, 15);
    this.z = random(-20, 20);
    this.diameter = random(0.005, 0.15);
    this.speed = 0.002;
  }

  //stars move gently according to set (star) speed
  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }
  
  display() {
    push();
    translate(this.x, this.y, this.z);
    sphere(this.diameter);
    pop();
  }
}

