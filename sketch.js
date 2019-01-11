
var sun;
var SB = [];
var capture;
var video
var osc;
var reverb;
var playing = false;
var reverb;
var x,y,z;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  capture = createCapture(VIDEO);
  capture.hide();
  sun = loadImage("sun.jpg");
  video = createVideo("transit.mov");
  video.loop();
  for (var s = 0; s < 1000; s++) {
    SB.push(new sunBall(90, random(360), random(360), width / 2, height / 2));
  }
  video.hide();
  capture.hide();
  background(0);

   osc = new p5.Oscillator();
   osc.setType('sine');
   osc.freq(140);
   osc.amp(0.8,0.8);

   osc.start();

}

function draw() {
	blendMode(BLEND);
	background(25 + 20*sin(frameCount/80));
translate(-x*3,-y*5);
  image(capture, 0, 0, 1,1);
	image(capture,0,0,2,2);
  blendMode(ADD);
  for(var i = 0; i <50; i++){
  fill(240,80,20,100-i*2);
  var tempR = 25*sin(frameCount/80);
  ellipse(width/2,height/2,100+i*3+tempR,100+i*3+tempR);
  }
  for (var s = 0; s < SB.length; s++) {
    SB[s].update();
    SB[s].show(sun);
  }
	 //filter(BLUR, 3);
}

function sunBall(A, _delta, B, C, D) {
  this.R = A;
  this.R_ori = A;
  this.theta = B;
  this.delta = _delta;
  this.cx = C;
  this.cy = D;
  this.v = random(0.01, 0.02);

  this.update = function() {
    this.theta += this.v;
    this.delta += this.v * 10;
    this.R = this.R_ori + 15*sin(frameCount/80);
  }
  this.show = function(a) {
    this.px = this.cx + this.R * (0.5 + 0.1 * tan(radians(this.delta - 90))) * sin(radians(this.theta));
    this.py = this.cy + this.R * (0.5 + 0.1 * tan(radians(this.delta - 90))) * cos(radians(this.theta));
    //colorMode(HSB);

    if (this.delta % 180 > 60) {
      noStroke();
      fill(240, 80, 10, map(this.delta % 180, 60, 180, 60, 0));
      //tint(255, map(this.delta % 180, 135, 180, 255, 0));
    } else if (this.delta % 180 < 60) {
      noStroke();
      fill(240, 80, 10, map(this.delta % 180, 0, 60, 0, 60));
      //tint(255, map(this.delta % 180, 0, 45, 25, 255));
    } else {
      noStroke();
      fill(240, 80, 40,20);
    }
    //image(a, this.px, this.py, 6, 4.5);
	smooth();
    ellipse(this.px, this.py, 8,6);
  }
}


window.addEventListener('devicemotion', function(e)
{
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z);
});
