
let useCircle = true;
let showStroke = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  // Mouse X controls brush size
  let brushSize = map(mouseX, 0, width, 5, 100);

  // Mouse Y controls brush color
  let red = map(mouseY, 0, height, 100, 255);
  let blue = map(mouseY, 0, height, 255, 100);

  fill(red, 180, blue);

  // Turn stroke on or off
  if (showStroke) {
    stroke('darkblue');
    strokeWeight(3);
  } else {
    noStroke();
  }

  // Draw circles or squares
  if (mouseIsPressed) {
    if (useCircle) {
      circle(mouseX, mouseY, brushSize);
    } else {
      rectMode(CENTER);
      square(mouseX, mouseY, brushSize);
    }
  }
}

function keyPressed() {
  // Spacebar: clear canvas
  if (keyCode === 32) {
    background(220);
  }

  // S: switch between circles and squares
  if (key === 's' || key === 'S') {
    useCircle = !useCircle;
  }

  // B: toggle stroke
  if (key === 'b' || key === 'B') {
    showStroke = !showStroke;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
