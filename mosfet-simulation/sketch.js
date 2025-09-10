let mosfet;
let slider;
let freeCharges = [];
let fixedCharges = [];
let dopedRegionCharges = [];
let numPoints = 80; // fake electrons

let Vth = 1.8; // threshold voltage
let gateXMin = 200, gateXMax = 600;
let gateY = 190;

let Ids = 0;
let k = 5e-5;

let resetButton;

function preload() {
  mosfet = loadImage('/images/nMOSFET.png');
}

function setup() {
  createCanvas(1200, 800);

  // Slider für Gate-Spannung 0 → 5 V
  slider = createSlider(0, 5000, 0);
  slider.position(880, 50);
  slider.style('width', '300px');

  // Button zum Zurücksetzen der Ladungen
  resetButton = createButton('Reset');
  resetButton.position(1222,40);
  resetButton.mousePressed(resetCharges);
  resetButton.style('font-size', '30px');
  resetButton.style('background-color', "blue");
  resetButton.style("border-radius", "10px")
  resetButton.style("color", "white")

  SetRandomChargePositions();
}

function resetCharges() {
  freeCharges = [];
  fixedCharges = [];
  dopedRegionCharges = [];
  SetRandomChargePositions();
  
}

function drawArrow2(x1, y1, x2, y2, col) {
  stroke(col);
  fill(col);
  strokeWeight(2);
  let angle = atan2(y2 - y1, x2 - x1);
  let size = 10;

  line(x1, y1, x2, y2);

  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -size, -size/2, -size, size/2);
  pop();
}

function SetRandomChargePositions() {
  slider.value(0);
  let xMin = 200, xMax = 600;
  let yMin = 200, yMax = 480;
  let xMinl = 4, xMaxl = 184, yMinl = 235, yMaxl = 480;
  let xMinr = 615, xMaxr = 790, yMinr = 235, yMaxr = 480;
  let xMind = 6, xMaxd = 178, yMind = 174, yMaxd = 215;
  let xMind2 = 619, xMaxd2 = 788, yMind2 = 174, yMaxd2 = 215;

  // Free charges
  for (let i = 0; i < 600; i++) {
    let x = random(xMin, xMax);
    let y0 = random(yMin, yMax);
    let type = random(1) < 0.9 ? "h" : "e";
    freeCharges.push({ x, y0, type });
  }

  // Fixed charges left
  for (let i = 0; i < 100; i++) {
    let x = random(xMinl, xMaxl);
    let y0 = random(yMinl, yMaxl);
    let type = random(1) < 0.85 ? "h" : "e";
    fixedCharges.push({ x, y0, type });
  }

  // Fixed charges right
  for (let i = 0; i < 100; i++) {
    let x = random(xMinr, xMaxr);
    let y0 = random(yMinr, yMaxr);
    let type = random(1) < 0.95 ? "h" : "e";
    fixedCharges.push({ x, y0, type });
  }

  // Doped regions
  for (let i = 0; i < 20; i++) {
    let x = random(xMind, xMaxd);
    let y0 = random(yMind, yMaxd);
    let type = "e"; // nur Elektronen für Dopings
    dopedRegionCharges.push({ x, y0, type });
  }
  for (let i = 0; i < 20; i++) {
    let x = random(xMind2, xMaxd2);
    let y0 = random(yMind2, yMaxd2);
    let type = "e";
    dopedRegionCharges.push({ x, y0, type });
  }
}

function draw() {
  translate(50, 0);
  noStroke();
  background(255);
  image(mosfet, 0, 0, 800, 500);

  let gateV = slider.value() / 1000; // V

  drawEfieldLInes(gateV);

  // Free charges
  for (let c of freeCharges) {
    let y;
    if (c.type === "e") {
      if (gateV >= Vth) {
        y = map(gateV, Vth, 5, c.y0, 200);
        if (y <= 209) {
          c.x += map(gateV, Vth, 5, 1, 10);
          if (c.x > 750) c.x = 140;
        }
      } else y = c.y0;
      fill(0, 0, 255);
    } else {
      if (gateV >= Vth) y = map(gateV, Vth, 5, c.y0, 470);
      else y = c.y0;
      fill(255, 0, 0);
    }
    ellipse(c.x, y, 10, 10);
  }

  // Doped region charges
  for (let c of dopedRegionCharges) {
    let y;
    if (c.type === "e") {
      if (gateV >= Vth) {
        y = map(gateV, Vth, 5, c.y0, 200);
        if (y <= 202 && y >= 200) {
          c.x += map(gateV, Vth, 5, 1, 10);
          if (c.x > 750) c.x = 140;
        }
      } else y = c.y0;
      fill(0, 0, 255);
    } else {
      if (gateV >= Vth) y = map(gateV, Vth, 5, c.y0, 470);
      else y = c.y0;
      fill(255, 0, 0);
    }
    ellipse(c.x, y, 10, 10);
  }

  // Fixed charges
  for (let c of fixedCharges) {
    fill(c.type === "e" ? color(0, 0, 255) : color(255, 0, 0));
    ellipse(c.x, c.y0, 10, 10);
  }

  // Calculate Ids
  Ids = gateV >= Vth ? k * Math.pow(gateV - Vth, 2) : 0;

  // UI
  noStroke();
  fill(0);
  textSize(24);
  text(`Gate voltage: ${gateV.toFixed(2)} V`, 880, 30);

  fill(255, 0, 0);
  ellipse(890, 97, 10, 10);
  fill(0, 0, 255);
  ellipse(890, 123, 10, 10);

  fill(0);
  textSize(18);
  text(": holes", 902, 101);
  text(": electrons", 902, 129);

  textSize(18);
  text("Ids :" + `${nf(Ids * 1e6,1,0)}`+"µA", 888, 160);

  drawArrow2(888,180,888,220,color(0, 0, 255));
  textSize(18);
  fill(0);
  strokeWeight(0);
  text(": E-Field Lines", 900, 197);  
  fill(0); 
  textSize(14);
  text(`${mouseX},${mouseY}`, 100, 110);
}

function drawEfieldLInes(gateV) {
  let numLines = 15;
  stroke(color(0, 0, 255));
  strokeWeight(2);
  for (let i = 0; i < numLines; i++) {
    let x = map(i, 0, numLines - 1, gateXMin, gateXMax);
    let yStart = gateY;
    let yEnd = 200 + map(gateV, 0, 5, 0, 240);
    line(x, yStart, x, yEnd);
    line(x, yEnd, x - 3, yEnd - 5);
    line(x, yEnd, x + 3, yEnd - 5);
  }
  noStroke();

  
}
