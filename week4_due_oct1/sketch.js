// This is the sketch.js file.
// Press 's' to export the SVG.
// Note that p5.js is used in 'global mode'. 

p5.disableFriendlyErrors = true; 
let bDoExportSvg = false; 
let lineLength = 20;

function setup(){
  createCanvas(816, 1056); 

  randomSeed(100);
}

function keyPressed(){
  if (key == 'r'){
    draw();
  }

  if (key == 's'){
    bDoExportSvg = true;
    console.log("SVG export requested");
  }
}

function mousePressed(){
  lineLength = random(5, 60);
}

function draw(){

  background(255); 

  if (bDoExportSvg){
    beginRecordSvg("myOutput.svg");
  }

  for(let i = 40; i < width; i += 80){
    for(let j = 40; j < height; j += 80){

      push();

      translate(i, j);

      // Rotation changes according to the Y position
      let angle = map(j, 40, height, 0, 180) 
                  + frameCount * 0.1;

      rotate(angle);

      // Lines become thicker from top to bottom
      let thickness = map(j, 40, height, 1, 5);
      strokeWeight(thickness);

      line(-lineLength, 0, lineLength, 0);

      pop();

    }
  }

  if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
  }

}