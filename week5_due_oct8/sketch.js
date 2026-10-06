function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
}

function draw() {
  background(240);

  translate(width / 2, height / 2);

let s = second();
let m = minute();
let h = hour();

  // OUTER SNAKE
  push();

  let snakeColor2 = color(85, 125, 95);

  // One full rotation every 12 seconds
  let snakeAngle2 = -(millis() / 12000) * 360;

  rotate(snakeAngle2);


  // BODY
  noFill();
  stroke(snakeColor2);
  strokeWeight(32);
  strokeCap(ROUND);

  let bodySize2 = 370 + sin(millis() * 0.12) * 4;

  circle(0, 0, bodySize2);


  // HEAD
  noStroke();
  fill(snakeColor2);

  ellipse(185, 0, 60, 80);


  // BITE SEPARATION LINE
  noFill();
  stroke(50, 80, 60);
  strokeWeight(4);
  strokeCap(ROUND);

  arc(
    185, 0,
    60, 80,
    225, 315
  );


  // EYES
  noStroke();
  fill(20);

  circle(175, -10, 6);
  circle(195, -10, 6);

  pop();



  // MIDDLE SNAKE

  push();

  let snakeColor1 = color(70, 110, 80);

  // One full rotation every 6 seconds
  let snakeAngle1 = -(millis() / 6000) * 360;

  rotate(snakeAngle1);


  // BODY
  noFill();
  stroke(snakeColor1);
  strokeWeight(32);
  strokeCap(ROUND);

  let bodySize1 = 270 + sin(millis() * 0.15) * 4;

  circle(0, 0, bodySize1);


  // HEAD
  noStroke();
  fill(snakeColor1);

  ellipse(135, 0, 55, 75);


  // BITE SEPARATION LINE
  noFill();
  stroke(45, 75, 55);
  strokeWeight(4);
  strokeCap(ROUND);

  arc(
    135, 0,
    55, 75,
    225, 315
  );


  // EYES
  noStroke();
  fill(20);

  circle(126, -10, 6);
  circle(144, -10, 6);

  pop();



  // INNER SNAKE

  push();

  let snakeColor3 = color(55, 95, 70);

  // Fastest — one full rotation every 3 seconds
  let snakeAngle3 = -(millis() / 3000) * 360;

  rotate(snakeAngle3);


  // BODY
  noFill();
  stroke(snakeColor3);
  strokeWeight(28);
  strokeCap(ROUND);

  let bodySize3 = 170 + sin(millis() * 0.2) * 3;

  circle(0, 0, bodySize3);


  // HEAD
  noStroke();
  fill(snakeColor3);

  ellipse(85, 0, 48, 65);


  // BITE SEPARATION LINE
  noFill();
  stroke(35, 65, 45);
  strokeWeight(4);
  strokeCap(ROUND);

  arc(
    85, 0,
    48, 65,
    225, 315
  );


  // EYES
  noStroke();
  fill(20);

  circle(77, -8, 5);
  circle(93, -8, 5);

  pop();
}