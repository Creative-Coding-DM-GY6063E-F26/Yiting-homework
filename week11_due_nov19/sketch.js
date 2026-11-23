/**
 * My Weekly Drink Diary
 * map, forEach, filter
 */

const data = [
    {'days of week': 'Mon', 'milktea': 0, 'admilk': 2},
    {'days of week': 'Tue', 'milktea': 500, 'admilk': 0},
    {'days of week': 'Wed', 'milktea': 0, 'admilk': 1},
    {'days of week': 'Thu', 'milktea': 600, 'admilk': 0},
    {'days of week': 'Fri', 'milktea': 100, 'admilk': 1},
    {'days of week': 'Sat', 'milktea': 500, 'admilk': 0},
    {'days of week': 'Sun', 'milktea': 0, 'admilk': 0}
];

let milkTea = data.map((day) => day['milktea']);
let adMilk = data.map((day) => day['admilk'] * 210);
let daysOfWeek = data.map((day) => day['days of week']);

let selectedDrink = 'milktea';
let cups = [];

function setup(){
    createCanvas(700, 380);
    textAlign(CENTER, CENTER);
}

function draw(){
    background(242, 235, 221);

    let drinkAmount;

    if(selectedDrink === 'milktea'){
        drinkAmount = milkTea;
    } else {
        drinkAmount = adMilk;
    }


    noStroke();
    fill(81, 75, 64);
    textSize(25);
    text('My Weekly Drink Diary', width/2, 35);


    textSize(14);

    if(selectedDrink === 'milktea'){
        text('Milk Tea', width/2, 65);
    } else {
        text('AD Calcium Milk', width/2, 65);
    }

    let maxVolume = max(max(milkTea), max(adMilk), 1);

    cups = [];

    drinkAmount.forEach((amount, index) => {
        let xPos = map(index, 0, drinkAmount.length - 1, 80, width - 80);
        let liquidHeight = map(amount, 0, maxVolume, 0, 140);

        drawDrink(xPos, 130, liquidHeight);

        cups.push({
            x: xPos,
            y: 130,
            liquidHeight: liquidHeight
        });

        noStroke();
        fill(81, 75, 64);
        textSize(12);

        let oz = amount / 29.5735;

        text(oz.toFixed(1) + ' fl oz', xPos, 320);
    });

    daysOfWeek.forEach((day, index) => {
        let xPos = map(index, 0, daysOfWeek.length - 1, 80, width - 80);

        noStroke();
        fill(81, 75, 64);
        textSize(14);
        text(day, xPos, 298);
    });

    textSize(11);
    fill(129, 119, 103);
    text('Click the liquid to switch drinks', width/2, 360);
}

function drawDrink(x, y, liquidHeight){
    push();
    translate(x, y);

    noStroke();
    fill(255, 249, 237);
    quad(-29, 0, 29, 0, 21, 140, -21, 140);

    let liquidWidth = map(liquidHeight, 0, 140, 21, 29);

    if(selectedDrink === 'milktea'){
        fill(196, 145, 102);
    } else {
        fill(214, 227, 176);
    }

    if(liquidHeight > 0){
        quad(
            -liquidWidth, 140 - liquidHeight,
            liquidWidth, 140 - liquidHeight,
            21, 140,
            -21, 140
        );
    }

  
    noFill();
    stroke(168, 155, 133);
    strokeWeight(1.5);
    quad(-29, 0, 29, 0, 21, 140, -21, 140);

    strokeWeight(5);
    line(0, 0, 12, -32);

    noStroke();
    fill(168, 155, 133);
    rect(-33, -5, 66, 9, 3);

    if(selectedDrink === 'milktea' && liquidHeight >= 10){
        fill(96, 67, 50);

        for(let i = 0; i < 3; i++){
            circle(-12 + i * 12, 134, 8);
        }
    }

    pop();
}

function mousePressed(){
    let clicked = cups.filter((cup) => {
        let localY = mouseY - cup.y;

        let halfWidth = map(localY, 0, 140, 29, 21);

        return cup.liquidHeight > 0 &&
               localY >= 140 - cup.liquidHeight &&
               localY <= 140 &&
               abs(mouseX - cup.x) <= halfWidth;
    });

    if(clicked.length > 0){
        if(selectedDrink === 'milktea'){
            selectedDrink = 'admilk';
        } else {
            selectedDrink = 'milktea';
        }
    }
}
