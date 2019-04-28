var colors = [];  
var yoff = 0.0;     
var amplitude;
var song;
var w;
var h;
var fft;

function preload(){
	miami = loadSound("Miami.mp3");
	
}


function setup() {
  createCanvas(windowWidth, windowHeight);
	amplitude = new p5.Amplitude();
	amplitude.setInput(miami);
	song = miami;
	song.play();
	w = windowWidth/2;
	h = windowHeight/2;
  fft = new p5.FFT();
  fft.setInput(song);
}

function draw() {
	background(color(25,52,70,20));
  fill(color(200,160,160,1));
	stroke(196,212,224);

  // Perlin noise wave
  beginShape(); 
  var xoff = 0;      
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 5) {    
  var y = map(noise(xoff, yoff), 0, 1, windowHeight/2-100,windowHeight/2 + 200);
	y = y - amplitude.getLevel()*100;		
  vertex(x, y); 
		
  // Move to the right for noise
  xoff += 0.02;
  }
	
  // increment y dimension for noise
  yoff += 0.0085;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
	
	push();
	diamond();
	pop();
	
	var spectrum = fft.analyze();
	push();
	stroke("#e9c77b");
	angle = 10 + spectrum[spectrum.length/2]/50;
	translate(w,h-30);
	branch(amplitude.getLevel()*200);
	branch2(amplitude.getLevel()*200);
	pop();
	
}

function diamond(){
	fill("#e2b49a");
	circle(windowWidth/2, windowHeight/2, 300);
	stroke(255);
	strokeWeight(5);	
	fill("#9aabb9");
	circle(windowWidth/2, windowHeight/2, 250);
	
}
function change_song_miami(){
	amplitude.setInput(miami);
	fft.setInput(miami);
	song.stop();
	song = miami;
	song.play();
}

function branch(len) {
  line(0, 0, 0, len);
  translate(0, len);
  var fraction = 2/3;
  if(len > 4) {
    push();
    rotate(angle);
    branch(len*fraction); 
    pop();
    push();
    rotate(-angle);
    branch(len*fraction);
    pop();
	}
}
	function branch2(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  var fraction = 2/3;
  if(len > 4) {
    push();
    rotate(angle);
    branch2(len*fraction); 
    pop();
    push();
    rotate(-angle);
    branch2(len*fraction);
    pop();
	}
}