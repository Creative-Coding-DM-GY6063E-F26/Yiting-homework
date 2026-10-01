//homework p5.js link:
//https://editor.p5js.org/YtX/sketches/K3R0DpWjZ

//homework code：
let circleScale;
let triangle1Scale;
let triangle2Scale;
let rectangleScale;

let triangle1Angle;
let triangle2Angle;

let bgColor;
let circleColor;
let triangle1Color;
let triangle2Color;
let rectangleColor;

let palettes = [
  ["#E8EFF5", "#547A9C", "#243B53", "#91B8D0", "#36566F"],
  ["#F7E9D7", "#D9825B", "#59443B", "#E8B56A", "#A64F3C"],
  ["#F0ECF8", "#8172B3", "#3D355B", "#B6A4D8", "#66518E"],
  ["#E7EEE7", "#729B83", "#304C40", "#B2C9A8", "#52745D"],
  ["#F7E8EC", "#D58A9B", "#633B52", "#E9B8C5", "#9C526C"],
  ["#E4F1F2", "#5B9EA6", "#254B59", "#9BC9C9", "#397583"],
  ["#F8F0D8", "#D5A84B", "#5C4A32", "#E9CD7D", "#9A7137"],
  ["#F6E8E1", "#D88972", "#3C536B", "#91B4CA", "#A95E50"]
];

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);

  randomizeDesign();
}

function draw() {
  background(bgColor);

  // 圆
  push();
  translate(165, 165);
  scale(circleScale);

  noStroke();
  fill(circleColor);
  circle(0, 0, 140);

  pop();

  // 小三角形
  push();
  translate(350, 175);
  rotate(triangle1Angle);
  scale(triangle1Scale);

  noStroke();
  fill(triangle1Color);

  triangle(
    -60, 40,
    60, 40,
    0, -60
  );

  pop();

  // 大三角形
  push();
  translate(350, 300);
  rotate(triangle2Angle);
  scale(triangle2Scale);

  noStroke();
  fill(triangle2Color);

  triangle(
    -115, 70,
    115, 70,
    0, -115
  );

  pop();

  // 长方形
  push();
  translate(350, 395);
  scale(rectangleScale);

  noStroke();
  fill(rectangleColor);
  rectMode(CENTER);
  rect(0, 0, 25, 150);

  pop();
}

function mousePressed() {
  if (
    mouseX > 50 && mouseX < 450 &&
    mouseY > 50 && mouseY < 450
  ) {
    randomizeDesign();
  }
}

function randomizeDesign() {
  circleScale = random([0.8, 1, 1.2]);
  triangle1Scale = random([0.8, 1, 1.2]);
  triangle2Scale = random([0.8, 1, 1.2]);
  rectangleScale = random([0.8, 1, 1.2]);

  triangle1Angle = random([-20, -15, -10, 10, 15, 20]);
  triangle2Angle = random([-20, -15, -10, 10, 15, 20]);

  let palette = random(palettes);

  bgColor = palette[0];
  circleColor = palette[1];
  triangle1Color = palette[2];
  triangle2Color = palette[3];
  rectangleColor = palette[4];
}
