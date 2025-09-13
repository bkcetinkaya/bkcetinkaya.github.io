let mosfet;
let gateVSlider;
let sourceVSlider;
let freeCharges = [];
let fixedCharges = [];
let dopedRegionCharges = [];
let numPoints = 80; // fake electrons

let Vth = 1.8; // threshold voltage
let gateXMin = 200, gateXMax = 600;
let gateY = 190;

let Ids = 0;
let k = 0.001;
let Vds=0;
let operationMode;

let resetButton;

function preload() {
  mosfet = loadImage('/images/nMOSFET.png');
}

function setup() {
  createCanvas(1200, 800);

  // Slider für Gate-Spannung 0 → 5 V
  gateVSlider = createSlider(0, 5000, 0);
  gateVSlider.position(880, 50);
  gateVSlider.style('width', '300px');

  sourceVSlider = createSlider(0, 9000, 0);
  sourceVSlider.position(880, 100);
  sourceVSlider.style('width', '300px');

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
  gateVSlider.value(0);
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

  let gateV = gateVSlider.value() / 1000; // V
  let Vds = sourceVSlider.value() / 1000;

  drawEfieldLInes(gateV);

// Free charges
for (let c of freeCharges) {
  let y;
  if (c.type === "e") {
    if (gateV >= Vth) {
      // Erst hochziehen (Kanalbildung)
      y = map(gateV, Vth, 5, c.y0, 200);
      c.y = y;

      // Geschwindigkeit ~ Ids
      if (c.y <= 205 && Ids > 0) {
        let speed = map(Ids*1.5, 0, 0.01, 0, 12); // skaliere Ids in Pixel-Geschwindigkeit
        c.x += speed;
        if (c.x > 750) c.x = 140;
      }
    } else {
      y = c.y0;
      c.y = y;
    }
    fill(0, 0, 255);
  } else {
    y = gateV >= Vth ? map(gateV, Vth, 5, c.y0, 470) : c.y0;
    c.y = y;
    fill(255, 0, 0);
  }
  ellipse(c.x, c.y, 10, 10);
}

// Doped region charges
for (let c of dopedRegionCharges) {
  let y;
  if (c.type === "e") {
    if (gateV >= Vth) {
      y = map(gateV, Vth, 5, c.y0, 200);
      c.y = y;

      if (c.y <= 205 && Ids > 0) {
        let speed = map(Ids*1.5, 0, 0.01, 0, 12);
        c.x += speed;
        if (c.x > 750) c.x = 140;
      }
    } else {
      y = c.y0;
      c.y = y;
    }
    fill(0, 0, 255);
  } else {
    y = gateV >= Vth ? map(gateV, Vth, 5, c.y0, 470) : c.y0;
    c.y = y;
    fill(255, 0, 0);
  }
  ellipse(c.x, c.y, 10, 10);
}

  // Fixed charges
  for (let c of fixedCharges) {
    fill(c.type === "e" ? color(0, 0, 255) : color(255, 0, 0));
    ellipse(c.x, c.y0, 10, 10);
  }

  // Calculate Ids
 

  if (gateV >= Vth) {
    const Vov = gateV - Vth;
    if (Vds < Vov) {
      // linear region
      Ids = k * (Vov * Vds - 0.5 * Vds * Vds);
    } else if(Vds > Vov) {
      // saturation
      Ids = 0.5 * k * Vov * Vov;
    }
  }


  if(gateV < Vth){
    operationMode = "Cut Off";
  }else if(gateV >= Vth && Vds < gateV - Vth){
    operationMode = "Linear";
  }else if(gateV >= Vth && Vds >= gateV - Vth){
    operationMode = "Saturation";
  }


  // UI
  noStroke();
  fill(0);
  textSize(22);
  text(`Gate voltage: ${gateV.toFixed(2)} V`, 880, 30);
  textSize(22);
  text(`Vds: ${Vds.toFixed(2)} V`, 880, 95);

  fill(255, 0, 0);
  ellipse(890, 137, 10, 10);
  fill(0, 0, 255);
  ellipse(890, 163, 10, 10);

  fill(0);
  textSize(18);
  text(": holes", 902, 141);
  text(": electrons", 902, 169);



  textSize(18);
  text("Ids :" + ` ${nf(Ids * 1e3,1,1)}`+" mA", 888, 200);

  textSize(18);
  text("(Vgs - Vth) :" + ` ${nf(gateV - Vth ,1,1)}`+" V", 888, 230);

 

  drawArrow2(888,250,888,280,color(0, 0, 255));
  textSize(18);
  fill(0);
  strokeWeight(0);
  text(": E-Field Lines", 900, 270);  
  

  textSize(19);
  text("Operation Mode: "+`${operationMode}` , 880, 310);

  textSize(32);
  text("n-FET" , 375, 545);
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
