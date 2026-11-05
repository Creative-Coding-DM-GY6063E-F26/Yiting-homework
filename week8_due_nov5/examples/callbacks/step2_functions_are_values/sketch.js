
/**
 *
 * STEP 2: Functions are values.
 *
 * 1 - Draw circles
 * 2 - Draw squares
 * 3 - Draw triangles
 *
 */

// Store the function without ()
let currentShape = drawCircle;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill('tomato');
  noStroke();

  // Run the currently selected function
  currentShape(width / 2, height / 2, 200);
}

// Draw a circle
function drawCircle(x, y, size) {
  circle(x, y, size);
}

// Draw a square
function drawSquare(x, y, size) {
  rectMode(CENTER);
  square(x, y, size);
}

// Draw a triangle
function drawTriangle(x, y, size) {
  triangle(
    x, y - size / 2,
    x - size / 2, y + size / 2,
    x + size / 2, y + size / 2
  );
}

// Switch shapes using keyboard
function keyPressed() {
  if (key === '1') {
    currentShape = drawCircle;
  }

  if (key === '2') {
    currentShape = drawSquare;
  }

  if (key === '3') {
    currentShape = drawTriangle;
  }
}
