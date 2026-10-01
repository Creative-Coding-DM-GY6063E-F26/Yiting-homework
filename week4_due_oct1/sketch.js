// This is the sketch.js file.
// Press 's' to export the SVG.
// Note that p5.js is used in 'global mode'. 

p5.disableFriendlyErrors = true; 
let bDoExportSvg = false; 
let offset = 0;

function setup() {
  createCanvas(816, 1056);
}

function keyPressed() {
  if (key == 'r') {
    redraw();
  }

  if (key == 's') {
    bDoExportSvg = true;
    console.log("SVG export requested");
    redraw();
  }
}

function mousePressed() {
  offset += 2;
  redraw();
}

function draw() {

  background(255);

  if (bDoExportSvg) {
    beginRecordSvg("myOutput.svg");
  }
 
  push();

  translate(width / 2, 190);

  stroke(0);
  strokeWeight(1);
  noFill();

  for (let y = -130; y <= 130; y += 8) {
    line(-150, y, 150, y);
  }
  
  push();
  rotate(radians(7 + offset % 6));

  for (let y = -130; y <= 130; y += 8) {
    line(-150, y, 150, y);
  }

  pop();
  pop();

  push();

  translate(width / 2, 520);

  stroke(0);
  strokeWeight(1);
  noFill();

  for (let r = 10; r <= 145; r += 10) {
    ellipse(0, 0, r * 2, r * 2);
  }

  push();
  translate(5 + offset % 8, 0);

  for (let r = 10; r <= 145; r += 10) {
    ellipse(0, 0, r * 2, r * 2);
  }

  pop();
  pop();

  push();

  translate(width / 2, 850);

  stroke(0);
  strokeWeight(1);
  noFill();

  for (let y = -130; y <= 130; y += 10) {

    beginShape();

    for (let x = -150; x <= 150; x += 10) {

      let curve = 25 * sin((x + 150) * 0.025);

      vertex(x, y + curve);
    }

    endShape();
  }

  push();
  rotate(radians(3 + offset % 4));

  for (let y = -130; y <= 130; y += 10) {

    beginShape();

    for (let x = -150; x <= 150; x += 10) {

      let curve = 25 * sin((x + 150) * 0.025);

      vertex(x, y + curve);
    }

    endShape();
  }

  pop();
  pop();

  if (bDoExportSvg) {
    endRecordSvg();
    bDoExportSvg = false;
  }
}