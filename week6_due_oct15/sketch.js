function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(240);

  // Drag mouse to change the viewing angle
  // Scroll to zoom in or out
  orbitControl();

  // OUTER SNAKE
  drawSnake(
    185, 16,
    85, 125, 95,
    12000,
    60, 80,
    175, 195,
    6, -10,
    70, 0,
    60000
  );

  // MIDDLE SNAKE
  drawSnake(
    135, 16,
    70, 110, 80,
    6000,
    55, 75,
    126, 144,
    6, -10,
    10, 25,
    35000
  );

  // INNER SNAKE
  drawSnake(
    85, 14,
    55, 95, 70,
    3000,
    48, 65,
    77, 93,
    5, -8,
    45, -40,
    20000
  );
}


// Draw one complete 3D snake
function drawSnake(
  radius,
  thickness,
  red, green, blue,
  speed,
  headWidth, headHeight,
  eyeLeft, eyeRight,
  eyeSize,
  eyeY,
  tiltX, tiltY,
  orbitSpeed
) {
  push();

  // 1. Slowly rotate the entire orbit in 3D space
  let orbitAngle = (millis() / orbitSpeed) * 360;

  rotateY(orbitAngle);
  rotateX(tiltX);
  rotateY(tiltY);

  // 2. Rotate the snake along its own circular orbit
  let snakeAngle = -(millis() / speed) * 360;
  rotateZ(snakeAngle);

  // 3D GRADIENT BODY
  drawGradientTorus(
    radius,
    thickness,
    red, green, blue
  );

  // 3D HEAD
  push();

  translate(radius, 0, 10);

  noStroke();
  fill(red, green, blue);

  ellipsoid(
    headWidth / 2,
    headHeight / 2,
    17,
    32,
    24
  );

  pop();

  // 3D EYES
  noStroke();
  fill(20);

  push();
  translate(eyeLeft, eyeY, 26);
  sphere(eyeSize / 2, 12, 8);
  pop();

  push();
  translate(eyeRight, eyeY, 26);
  sphere(eyeSize / 2, 12, 8);
  pop();

  pop();
}


// Draw a 3D torus with a color gradient
function drawGradientTorus(
  radius,
  thickness,
  red, green, blue
) {
  // Optimized geometry
  let segments = 60;
  let tubeSegments = 12;

  noStroke();

  for (let i = 0; i < segments; i++) {

    let angle1 = map(i, 0, segments, 0, 360);
    let angle2 = map(i + 1, 0, segments, 0, 360);

    // Original color near the head,
    // darker color toward the tail
    let t = i / segments;
    let brightness = lerp(1, 0.45, t);

    fill(
      red * brightness,
      green * brightness,
      blue * brightness
    );

    beginShape(TRIANGLE_STRIP);

    for (let j = 0; j <= tubeSegments; j++) {

      let tubeAngle = map(
        j,
        0,
        tubeSegments,
        0,
        360
      );

      let x1 =
        (radius + thickness * cos(tubeAngle)) *
        cos(angle1);

      let y1 =
        (radius + thickness * cos(tubeAngle)) *
        sin(angle1);

      let z1 =
        thickness * sin(tubeAngle);

      let x2 =
        (radius + thickness * cos(tubeAngle)) *
        cos(angle2);

      let y2 =
        (radius + thickness * cos(tubeAngle)) *
        sin(angle2);

      let z2 =
        thickness * sin(tubeAngle);

      vertex(x1, y1, z1);
      vertex(x2, y2, z2);
    }

    endShape();
  }
}