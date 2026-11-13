
let sounds = [];

const keys = ['A', 'S', 'D', 'F', 'G'];
const files = [
  'test0.mp3',
  'test1.mp3',
  'test2.mp3',
  'test3.mp3',
  'test4.mp3'
];

let activeKey = -1;
let activeUntil = 0;

function preload() {
  for (let file of files) {
    sounds.push(loadSound(file));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Arial');
}

function draw() {
  background(248, 248, 246);

  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  // Keyboard layout
  let spacing = min(100, (width - 30) / 5);
  let startX = width / 2 - spacing * 2;

  for (let i = 0; i < keys.length; i++) {
    let x = startX + i * spacing;
    let y = height / 2;

    let active = (activeKey === i && millis() < activeUntil);

    stroke(active ? 40 : 210);
    strokeWeight(1.5);
    fill(active ? 40 : 255);

    rect(x, y, spacing - 12, 85, 10);

    noStroke();
    fill(active ? 255 : 45);
    textSize(28);
    textStyle(NORMAL);
    text(keys[i], x, y);
  }

  // Instructions
  noStroke();
  fill(145);
  textSize(13);
  text('Press A S D F G to play', width / 2, height / 2 + 85);
}

function keyPressed() {
  let index = keys.indexOf(key.toUpperCase());

  if (index === -1) return;

  userStartAudio();

  sounds[index].play();

  activeKey = index;
  activeUntil = millis() + 180;

  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
