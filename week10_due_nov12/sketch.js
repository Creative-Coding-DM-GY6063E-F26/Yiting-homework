
let mic;
let ripples = [];
let started = false;
let volume = 0;
let lastRipple = 0;

const colors = [
  [110, 210, 255],
  [175, 160, 255],
  [125, 235, 215]
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
}

function draw() {
  background(7, 22, 37);

  if (!started) {
    fill(220);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Click to enable microphone", width / 2, height / 2);
    return;
  }

  volume = lerp(volume, mic.getLevel(), 0.2);

  if (volume > 0.015 && millis() - lastRipple > 180) {
    ripples.push({
      x: random(width),
      y: random(height),
      r: 5,
      speed: map(volume, 0.015, 0.25, 1.5, 4, true),
      maxR: map(volume, 0.015, 0.25, 100, 300, true),
      color: random(colors)
    });
    lastRipple = millis();
  }

  for (let i = ripples.length - 1; i >= 0; i--) {
    let p = ripples[i];
    p.r += p.speed;

    let alpha = map(p.r, 0, p.maxR, 180, 0);
    let c = p.color;

    noFill();

    for (let j = 0; j < 3; j++) {
      let radius = p.r - j * 14;
      if (radius <= 0) continue;

      stroke(c[0], c[1], c[2], alpha * 0.15);
      strokeWeight(8);
      circle(p.x, p.y, radius * 2);

      stroke(c[0], c[1], c[2], alpha);
      strokeWeight(1.5);
      circle(p.x, p.y, radius * 2);
    }

    if (p.r >= p.maxR) {
      ripples.splice(i, 1);
    }
  }
}

async function mousePressed() {
  if (started) return;

  await userStartAudio();

  mic.start(
    () => started = true,
    err => console.error(err)
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
