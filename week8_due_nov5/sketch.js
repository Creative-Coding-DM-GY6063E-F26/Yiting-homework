
/*
 * GESTURE GARDEN — V1.2
 *
 * Move index finger: move the cursor
 * Pinch thumb + index: plant one flower
 * Press C: clear garden
 * Press S: save garden
 *
 * Uses ml5.js HandPose + p5.js
 */

// ----------------------------
// GLOBAL VARIABLES
// ----------------------------

let video;
let handPose;
let hands = [];

let flowers = [];
let stars = [];

let wasPinching = false;
let cursorX = 0;
let cursorY = 0;

const camWidth = 640;
const camHeight = 480;

// Pinch thresholds
const pinchStart = 35;
const pinchEnd = 55;

// Flower colors
let palette = [
  [242, 168, 195],
  [185, 172, 238],
  [250, 211, 145],
  [164, 211, 225],
  [231, 186, 226],
  [185, 224, 190]
];

// ----------------------------
// SETUP
// ----------------------------

async function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(RADIANS);

  createStars();

  // Camera
  video = createCapture(VIDEO);
  video.size(camWidth, camHeight);
  // video.hide();

  // HandPose
  handPose = await ml5.handPose();
  handPose.detectStart(video, gotHands);
}

// ----------------------------
// DRAW LOOP
// ----------------------------

function draw() {
  drawBackground();

  // Draw planted flowers
  flowers.forEach(drawFlower);

  // Track hand and gestures
  updateHand();

  // Draw instructions
  drawInstructions();
}

// ----------------------------
// HAND TRACKING CALLBACK
// ----------------------------

function gotHands(results, err) {
  if (err) {
    console.error(err);
    hands = [];
    return;
  }

  hands = results || [];
}

// ----------------------------
// HAND GESTURES
// ----------------------------

function updateHand() {
  if (hands.length === 0) {
    wasPinching = false;
    return;
  }

  let hand = hands[0];

  let thumb = hand.thumb_tip[4];
  let index = hand.index_tip[8];

  if (!thumb || !index) {
    wasPinching = false;
    return;
  }

  // Mirror camera horizontally
  cursorX = map(
    index.x,
    0,
    camWidth,
    width,
    0
  );

  cursorY = map(
    index.y,
    0,
    camHeight,
    0,
    height
  );

  cursorX = constrain(cursorX, 0, width);
  cursorY = constrain(cursorY, 0, height);

  // Pinch detection
  let d = dist(
    thumb.x,
    thumb.y,
    index.x,
    index.y
  );

  // Plant only once per pinch
  if (!wasPinching && d < pinchStart) {
    plantFlower(cursorX, cursorY);
    wasPinching = true;
  }

  // Release pinch
  if (wasPinching && d > pinchEnd) {
    wasPinching = false;
  }

  drawCursor();
}

// ----------------------------
// PLANT FLOWER
// ----------------------------

function plantFlower(x, y) {
  let colorChoice = random(palette);

  flowers.push({
    x: x,
    y: y,

    size: random(25, 65),
    petals: floor(random(5, 10)),

    rotation: random(TWO_PI),

    color: colorChoice,

    growth: 0,
    growthSpeed: random(0.015, 0.035),

    stemLength: random(35, 95),

    sway: random(TWO_PI)
  });
}

// ----------------------------
// DRAW FLOWER
// ----------------------------

function drawFlower(f) {
  push();

  translate(f.x, f.y);

  // Growing animation
  f.growth = min(
    1,
    f.growth + f.growthSpeed
  );

  let g = easeOutCubic(f.growth);
  let s = f.size * g;

  // Gentle movement
  let sway =
    sin(frameCount * 0.015 + f.sway) * 2;

  // Stem
  stroke(107, 157, 133, 190);
  strokeWeight(2);
  noFill();

  bezier(
    0, 0,
    -12, f.stemLength * 0.3,
    12 + sway, f.stemLength * 0.7,
    sway, f.stemLength
  );

  // Leaves
  noStroke();
  fill(116, 175, 147, 180);

  push();
  translate(-3, f.stemLength * 0.45);
  rotate(-PI / 4);
  ellipse(-9, 0, 20 * g, 9 * g);
  pop();

  push();
  translate(4, f.stemLength * 0.65);
  rotate(PI / 4);
  ellipse(9, 0, 20 * g, 9 * g);
  pop();

  // Flower head
  translate(sway, 0);
  rotate(f.rotation);

  let c = f.color;

  // Soft glow
  noStroke();
  fill(c[0], c[1], c[2], 22);
  circle(0, 0, s * 2.6);

  // Petals
  for (let i = 0; i < f.petals; i++) {
    push();

    rotate(i * TWO_PI / f.petals);

    fill(
      c[0],
      c[1],
      c[2],
      195
    );

    ellipse(
      0,
      -s * 0.45,
      s * 0.48,
      s * 0.85
    );

    pop();
  }

  // Flower center
  fill(255, 226, 157);
  circle(0, 0, s * 0.35);

  fill(255, 247, 211, 170);
  circle(
    -s * 0.05,
    -s * 0.05,
    s * 0.12
  );

  pop();
}

// ----------------------------
// CURSOR
// ----------------------------

function drawCursor() {
  push();

  noFill();
  stroke(255, 255, 255, 90);
  strokeWeight(1.5);

  let cursorSize =
    wasPinching ? 12 : 20;

  circle(
    cursorX,
    cursorY,
    cursorSize
  );

  noStroke();
  fill(255, 255, 255, 120);

  circle(
    cursorX,
    cursorY,
    3
  );

  pop();
}

// ----------------------------
// BACKGROUND
// ----------------------------

function createStars() {
  stars = [];

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(1),
      y: random(1),
      size: random(1, 3),
      phase: random(TWO_PI)
    });
  }
}

function drawBackground() {
  background(16, 27, 48);

  noStroke();

  // Atmospheric glow
  for (let i = 8; i > 0; i--) {
    fill(75, 102, 134, 3);

    circle(
      width * 0.5,
      height * 0.5,
      i * width * 0.18
    );
  }

  // Stars
  for (let star of stars) {
    let alpha =
      100 +
      sin(frameCount * 0.02 + star.phase) * 65;

    fill(
      218,
      231,
      243,
      alpha
    );

    circle(
      star.x * width,
      star.y * height,
      star.size
    );
  }
}

// ----------------------------
// INSTRUCTIONS
// ----------------------------

function drawInstructions() {
  push();

  textAlign(LEFT);
  textSize(14);
  textStyle(NORMAL);

  noStroke();
  fill(235, 240, 245, 180);

  text(
    "Move index finger — Move the cursor",
    25,
    35
  );

  text(
    "Pinch thumb + index — Plant a flower",
    25,
    60
  );

  pop();
}

// ----------------------------
// KEYBOARD CONTROLS
// ----------------------------

function keyPressed() {
  if (key === "c" || key === "C") {
    clearGarden();
  }

  if (key === "s" || key === "S") {
    saveGarden();
  }
}

function clearGarden() {
  flowers = [];
}

function saveGarden() {
  saveCanvas(
    "gesture-garden",
    "png"
  );
}

// ----------------------------
// UTILITIES
// ----------------------------

function easeOutCubic(t) {
  return 1 - pow(1 - t, 3);
}

function windowResized() {
  resizeCanvas(
    windowWidth,
    windowHeight
  );
}
