let button, input;
let normal, happy, bloom, sad, depress, together, light;

let flowerL, flowerR, petal, petal2, petal3;
let cloud1, cloud2;
let star1, star2, star3;
let go;
let pList = [], rList = [], gList = [], sList = [], ssList = [], llList = [];
function preload (){
  normal = loadImage("Drawings/normal.jpg");
  happy = loadImage("Drawings/smile.jpg");
  sad = loadImage("Drawings/sad.jpg");
  bloom = loadImage("Drawings/happy.jpg");
  depress = loadImage("Drawings/depress.jpg");
  together = loadImage("Drawings/together.png");
  light = loadImage("Drawings/light.png");
  
  flowerL = loadImage("Drawings/flowerLeft.png");
  flowerR = loadImage("Drawings/flowerRight.png");
  petal = loadImage("Drawings/flowerPetal.png");
  petal2 = loadImage("Drawings/flowerPetal 2.png");
  petal3 = loadImage("Drawings/flowerPetal 3.png");
  cloud1 = loadImage("Drawings/cloud2.png");
  cloud2 = loadImage("Drawings/cloud.png");
  go = loadImage("Drawings/go.png");
  star1 = loadImage("Drawings/star/star1.png");
  star2 = loadImage("Drawings/star/star2.png");
  star3 = loadImage("Drawings/star/star3.png");
}

// class petal ///////////////////////////////////////////////////////
class Petal {
  constructor(x, n){
    this.x = x;
    this.y = 100;
    this.s = 2;
    this.n = n;
  } // end constructor
  
  drawPetal(){
    this.y = this.y + this.s;
    this.x = this.x - 0.5;
        
    if (this.n == 1) {
      image(petal, this.x, this.y);
      
    } else if (this.n == 2) {
      image(petal2, this.x, this.y);
      
    } else if (this.n == 3) {
      image(petal3, this.x, this.y);
      
    }
    
  } // end draw
  
}

// rain class ////////////////////////////////////////////////////////
class Rain {
  constructor(x){
    this.x = x;
    this.y = 100;
  }
  
  pour(){
    this.x += 1;
    this.y += 7;
    
    stroke(color(0,255,255));
    line(this.x, this.y, this.x+5, this.y+10);
  }
}

// go class //////////////////////////////////////////////////////////
class Go {
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.s = size;
  }
  
  gogo(){
    this.x += random(-1, 3.5);
    this.y += random(-2.5, 1.5);
    image(go, this.x, this.y, this.s, this.s+3);
  }
  
}

// star class ////////////////////////////////////////////////////////
class Star {
  constructor(x, y, n, s){
    this.x = x;
    this.y = y;
    this.n = n;
    this.s = s;
    this.max = this.s + 10;
    this.min = this.s - 10;
    this.dir = 1;
  }
  
  starDrop(){
    
    this.y += 2;
    
    switch (this.n) {
      case 1:
        image(star1, this.x, this.y, this.s, this.s);
        break;
      case 2:
        image(star2, this.x, this.y, this.s, this.s);
        break;
      case 3:
        image(star3, this.x, this.y, this.s, this.s);
        break;
        
    }
  }
  
  shine() {
    
    if (this.s < this.max && this.dir == 1) {
      this.s += 0.4;
    } else {
      this.dir = -1;
    }
    
    if (this.s > this.min && this.dir == -1){
      this.s -= random(0.2, 0.4);
    } else {
      this.dir = 1;
    }
    
    switch (this.n) {
      case 1:
        image(star1, this.x, this.y, this.s, this.s);
        break;
      case 2:
        image(star2, this.x, this.y, this.s, this.s);
        break;
      case 3:
        image(star3, this.x, this.y, this.s, this.s);
        break;
        
    }
  }
}

// light class
class FinalLight{
  constructor(x, y, s, speed){
    this.x = x;
    this.y = y;
    this.s = s;
    this.speed = speed;
  }
  
  shine(){
    this.y -= this.speed;
    image(light, this.x, this.y, this.s, this.s);
  }
}
// set up ////////////////////////////////////////////////////////////
var pressEnter = 0;
function setup() {
  createCanvas(800, 550);
  
  // modes
  imageMode(CENTER);
  textAlign(CENTER);
  rectMode(CENTER);

  // input setup
  input = createInput();
  input.position(30, height*0.5+230);
  button = createButton('ENTER');
  button.position(input.x, height*0.5+250);
  
  // petal rain setup
  let n = int(random(1,4));
  let p = new Petal(random(50, 750), n);
  pList.push(p);
  
  // rain rain setup
  let r = new Rain(random(50, 750));
  rList.push(r);
  
  // go rain setup
  let s = random(30, 70);
  let g = new Go(-s, random(100, 450), s);
  gList.push(g);
  
  // star rain setup
  let sr;
  for (var i = 0; i < 10; i++){
    sr = new Star(random(20, width-20), random(20, 200), int(random(1, 4)), random(10, 30));
    sList.push(sr);
    sr = new Star(random(20, 100), random(80, 450), int(random(1, 4)), random(10, 30));
    sList.push(sr);
    sr = new Star(random(width*0.5-50, width*0.5+50), random(80, 450), int(random(1, 4)), random(10, 30));
    sList.push(sr);
    sr = new Star(random(width-100, width-20), random(80, 450), int(random(1, 4)), random(10, 30));
    sList.push(sr);
  }
  
  sr = new Star(random(20, 530), 0, int(random(1, 4)), random(10, 30));
  ssList.push(sr);
  
  // light rain setup
  let light = new FinalLight(random(10, 790), height*0.5, random(30, 50), int(random(1,4)));
  llList.push(light);
   
}

// draw //////////////////////////////////////////////////////////////
function draw() {
  background("black");
  
  // input control
  button.mousePressed(wordControl());
  
}

var frameX = 400, frameY = 275, frameDir = -1;
var frameSize = 430;
function happiness(){
  image(flowerL, frameX-220,frameY-80,frameSize, frameSize);
  image(flowerR, frameX+220,frameY-80,frameSize, frameSize);
  
  if (frameSize > 400 && frameDir == -1) {
    frameSize -= 0.2;
  } else {
    frameDir = 1;
  }
  if (frameSize < 430 && frameDir == 1) {
    frameSize += 1;
  } else {
    frameDir = -1;
  }
  
  for (var p = 0; p < pList.length; p++) {
    pList[p].drawPetal();
  }
  if (frameCount % 25 == 0) {
    let r = int(random(1, 4));
    let newP = new Petal(random(5,750), r);
    pList.push(newP);
  }
  
  if (pList.length > 100) {
    pList.splice(0, 1);
  } 
}

var cloudX = 350, cloudDir = 1;
function sadge(){
  for (var r = 0; r < rList.length; r++) {
    rList[r].pour();
  }
  
  if (frameCount % 1 == 0) {
    let newR = new Rain(random(5,750));
    rList.push(newR);
  }
  
  if (rList.length > 150) {
    rList.splice(0, 1);
  }
  
  if (cloudX <= 450 && cloudDir == 1){
    cloudX += 1;
  } else {
    cloudDir = -1;
  }
  if (cloudX >= 350 && cloudDir == -1) {
    cloudX -= 1;
  } else {
    cloudDir = 1;
  }
    
  image(cloud2, cloudX-240, height*0.5-200, 500, 200);
  image(cloud1, cloudX,     height*0.5-200, 300, 200);
  image(cloud2, cloudX+220, height*0.5-200, 500, 200);
  
}

function jojo(){
  for (var i = 0; i < gList.length; i++) {
    gList[i].gogo();
  }
  
  if (frameCount % 50 == 0) {
    let s = random(40, 60);
    let g = new Go(-s, random(100, 450), s);
    gList.push(g);
  }
  
  if (gList.length > 100){
    gList.splice(0,1);
  }
}

function stars(){
  for (var i = 0; i < sList.length; i++) {
    sList[i].shine();
  }
  
  for (var j = 0; j < ssList.length; j++) {
    ssList[j].starDrop();
  }
  
  if (frameCount % 50 == 0) {
    let sr2 = new Star(random(20, 780), 0, int(random(1, 4)), random(10, 30));
  ssList.push(sr2);
  }
}

function shineLights(){
   for (var i = 0; i < llList.length; i++){
     llList[i].shine();
   } 
  if (frameCount % 1 == 0) {
    let light = new FinalLight(random(10, 790), height, random(30, 50), int(random(1,4)));
    llList.push(light);
  }
  if (llList.length > 200) {
    llList.splice(0,1);
  }
  
}

function shapes() {
  noStroke();
  ///////////////////////////////////// MIDDLE
  fill("orange");
  rect(width*0.5-25, 480, 30, 40);
  fill("blue");
  rect(width*0.5+25, 500, 30, 50);
  ///////////////////////////////////// SECOND FROM MIDDLE
  fill("violet");
  rect(width*0.5-80, 450, 80, 100);
  fill("yellow");
  rect(width*0.5+50, 450, 50, 80);
  ///////////////////////////////////// LEFT
  fill("pink");
  rect(80, 350, 150, 500);
  shineLights();
  ///////////////////////////////////// SECOND TO MIDDLE
  fill("yellow");
  rect(width*0.5-220, 500, 200, 500);
  fill("violet");
  rect(width*0.5+100, 450, 50, 80);
  fill("cyan")
  rect(100, 400, 100, 200);
  ///////////////////////////////////// RIGHT
  fill("cyan")
  rect(720, 300, 150, 500);
  fill("pink");
  rect(650, 400, 100, 300);
  ///////////////////////////////////// BOTTOM
  fill("black");
  rect(width*0.5, height, 800, 120);
  ///////////////////////////////////// LIGHT
  image(light, width*0.5-5, height*0.5+25, 350, 350);
}

// variable arries
var list = [];
var posList = [], negList = [], keyList = [];

var negWords = 
    ["jealousy", "hate", "blame", "inscurity", "discrimination", "anger", "complains"];

var posWords = 
    ["happiness", "love", "courage", "healthy", "peace", "kind", "joy"];

var keyWords = ["we", "are", "in", "this", "together"];

let pCount = 0;
let nCount = 0;

// function handle inputs
function wordControl(){
  // decalare variable
  var res, isReset = 0;
  
  // get inputs
  const words = input.value();
  
  // text style
  noStroke();
  fill("white");
  
  // print text
  translate(15, height-60);
  rotate(-PI/2);
  text("// "+words, 0,0);
  rotate(PI/2);
  translate(-15, -(height-60));

  // enter to delete from screen
  if (pressEnter == 1) {
    if (words == "reset"){
      negList = [];
      posList = [];
      keyList = [];
      isReset = 1;
      
    } else {
      
      if (keyWords.includes(words)) {
        keyList.push(words);
        posList.splice(0,1);
        negList.splice(0,1);
        
        // make sure lists are cleared
        if (words == "together"){
          posList.splice(0,posList.length);
          negList.splice(0,negList.length);
        }
        
      } else if (negWords.includes(words)){
        negList.push(words); 
        if (negList.length + posList.length >7) {
          posList.splice(0,1);
        } 
      } else if (posWords.includes(words)) {
        posList.push(words);
        if (negList.length + posList.length >7) {
          negList.splice(0,1);
        }
      }

      if (posList.length > 7) {
        posList.splice(0,1);
      } 
      if (negList.length > 7) {
        negList.splice(0,1);
      }
    }
    
    // clear
    input.value('');
    pressEnter = 0;
  }
  
  // conpute the result - stage
  // -2 - depressed
  // -1 - sad
  //  0 - normal
  //  1 - smile
  //  2 - happiness
  //  5 - together - face it together
  // as much as we are separated by varity of factors, we should have showed our care for each other, 
  if (isReset){
    res = 0;
    isReset = 0;
  } else {
    res = compute();
  }//print("MODE - ", res);
  
  switch (res) {
    case 5:
      print("mode 5");
      shapes();
      image(together,width*0.5,height*0.5-10,750,450);
      break;
    case 0:
      image(normal,width*0.5,height*0.5-10,750,450);
      break;
    case 1:
      print("mode 1");
      image(happy,width*0.5,height*0.5-10,750,450);
      stars();
      break;
    case 2:
      print("mode 2");
      image(bloom,width*0.5,height*0.5-10,750,450);
      happiness();
      break;
    case -1:
      print("mode -1");
      image(sad,width*0.5,height*0.5-10,750,450);
      jojo();
      break;
    case -2:
      print("mode -2");
      image(depress,width*0.5,height*0.5-10,750,450);
      sadge();
      break;
  }
  
}

// computation takes place
function compute(){
  // enter 7 words calculate percentage
  printWords();
  
  let diff = 0;
  let level = 0;
  
  // after words count > 3 
  if ( (pCount == 0 && nCount > 1) || (nCount == 0 && pCount > 1) || (pCount + nCount) > 2) {
    if (pCount > nCount) {         // happy
      // possible diff = 1
      diff = pCount - nCount;
      level = getRatio(diff, 1);
      
    } else if (pCount < nCount) {  // sad
      diff = nCount - pCount;
      level = getRatio(diff, 0);
      
    } else {
      level = 0;
      
    }
  }
  
  if (keyList.length == 5) {
    return 5;
  }
  
  return level;
}

// get ratio of current inputs
function getRatio(num, mood){
  // can be 1 to 5 in difference
  if (num < 4) {
    return (mood == 1)?1:-1;
    
  } else {
    return (mood == 1)?2:-2;
    
  }
}

// printing words
function printWords(){
  // styles
  textAlign(LEFT);
  noStroke();
  textSize(20);
  let textXP = input.x+200;
  let textYP = input.y+10;
  
  let textXN = input.x+250;
  let textYN = input.y+35;
  
  let textXK = input.x+300;
  let textYK = input.y+12.5;
  
  let wordsP = "";
  let wordsN = "";
  let wordsK = "";
  
  let colorN = color(43, 249, 255);
  let colorP = color(255, 153, 255);
  let colorK = color(255, 223, 55);
  
  // reset word count
  pCount = 0;
  nCount = 0;
  
  // calculate the index
  let startI;
  
  
  
  list = [];
  list = concat(list, posList);
  list = concat(list, negList);
  list = concat(list, keyList);
  
  // only display 5 words
  for (i = 0; i < list.length; i++) {
    if (negWords.includes(list[i])) {
      wordsN += list[i]+"\t";
      
    } else if (posWords.includes(list[i])) {
      wordsP += list[i]+"\t";
      
    } else {
      wordsK += list[i]+"\t";
      
    }
  }
  
  nCount = negList.length;
  pCount = posList.length;

  fill(colorP);
  text(wordsP, textXP, textYP);
  fill(colorN);
  text(wordsN, textXN, textYN);
  fill(colorK);
  text(wordsK, textXK, textYK);
  
}

//keyboard input
function keyPressed(){
  if (keyCode == ENTER) {
    pressEnter = 1;
  }
}