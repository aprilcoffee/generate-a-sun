var sun;
var SB = [];
var capture;
var video
var osc;
var reverb;
var playing = false;

function setup() {
  createCanvas(displayWidth, displayHeight);
  sun = loadImage("sun.jpg");
  capture = createCapture(VIDEO);
  capture.size(800, 800);
  video = createVideo("transit.mov");
  video.loop();
  for (var s = 0; s < 5000; s++) {
    SB.push(new sunBall(100, random(360), s, width / 2, height / 2));
  }
  video.hide();
  capture.hide();
  background(0);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(10);
  osc.amp(1);
  osc.start();


  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
 recorder.record(soundFile);
}

function draw() {
for(var i=0;i<10;i++){
  image(video, 0, 0, 100, 100);}
  blendMode(BLEND);
  background(0);
  blendMode(ADD);
  image(capture, 0, 0, width, height);
  for (var s = 0; s < SB.length; s++) {
    SB[s].update();
    SB[s].show(sun);
  }

}

function sunBall(A, _delta, B, C, D) {
  this.R = A;
  this.theta = B;
  this.delta = _delta;
  this.cx = C;
  this.cy = D;
  this.v = random(0.01, 0.02);

  this.update = function() {
    this.theta += this.v;
    this.delta += this.v * 10;
  }
  this.show = function(a) {
    this.px = this.cx + this.R * (0.5 + 0.1 * tan(radians(this.delta - 90))) * sin(radians(this.theta));
    this.py = this.cy + this.R * (0.5 + 0.1 * tan(radians(this.delta - 90))) * cos(radians(this.theta));
    //colorMode(HSB);

    if (this.delta % 180 > 135) {
      noStroke();
      fill(240, 80, 10, map(this.delta % 180, 135, 180, 255, 25));
      //tint(255, map(this.delta % 180, 135, 180, 255, 0));
    } else if (this.delta % 180 < 45) {
      noStroke();
      fill(240, 80, 10, map(this.delta % 180, 0, 45, 25, 255));
      //tint(255, map(this.delta % 180, 0, 45, 25, 255));
    } else {
      noStroke();
      fill(240, 80, 20);
    }
    //image(a, this.px, this.py, 6, 4.5);

    ellipse(this.px, this.py, 3, 2);
  }
}
