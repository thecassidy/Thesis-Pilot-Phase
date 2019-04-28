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

	
 

	button2 = createButton('Play - Kali Uchis');
  button2.position(20,60, 65);
  button2.mousePressed(change_song_miami);
}

function draw() {
	background(color("#1B87CC"));
  fill(color("#0E73B3"));
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
	stroke("#FFFC21");
	angle = 10 + spectrum[spectrum.length/2]/50;
	translate(w,h-30);
	branch(amplitude.getLevel()*200);
	branch2(amplitude.getLevel()*200);
	pop();
	
}

function diamond(){
	fill("#B31717");
	quad(w, h-320, w+220, h, w, h+320, w-220,h);
	stroke(255);
	strokeWeight(5);	
	fill("#B3625E");
	quad(w, h-300, w+200,h, w, h+300, w-200,h);
	
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