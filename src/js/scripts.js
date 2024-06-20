/*! The following code is a Random JS Script only to test this file */
/*! Credit: https://codepen.io/creativeocean/pen/gOJoZjE */
/*! DELETE THE FOLLOWING SCRIPT IF YOU INTEND TO USE THIS FILE*/ 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const size = 350;
const cw = canvas.width = size*3;
const ch = canvas.height = size*3;
const dots = [];
const maxDots = 999;
const tries = 2000;
const format = (n)=> n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

let tl, baseHue, n;


window.onload = window.onclick = init;


function init(e){  
  while (dots.length > 0) dots.pop();
  baseHue = gsap.utils.random(0,300,1);
  gsap.to('body', {duration:2, background:'hsl('+(baseHue+50)+',62%,95%)', ease:'power1.inOut'});
  n = 0;
  tl = gsap.timeline({onUpdate:render, paused:true});
  for (let i=0; i<maxDots; i++) makeDots();
  tl.play();
  console.clear();
  console.log('Psst, it only took '+format(n)+' hit-tests to make '+ dots.length+' dots.');
}


function makeDots() {  
  let d;
  const angle = (Math.random() * Math.PI*2)- Math.PI/2;
    
  for (let t=0; t<tries; t++) {
    d = {
      x: Math.round( Math.cos(angle) * Math.random() * size ),
      y: Math.round( Math.sin(angle) * Math.random() * size ),
      r: gsap.utils.random(8, 11, 1),
      l: gsap.utils.random(56, 79, 1),
      a: 0,
      padding: gsap.utils.random(0.8, 1.3, 0.01),
      draw: false
    }    
    //keep looping until hitTest returns false
    if ( hitTest(d) ) { continue; }
    else { d.draw=true; break; }
  }

  if (d.draw) {
    const distX = d.x - cw/size;
    const distY = d.y - ch/size;
    d.dist = Math.sqrt( (distX*distX) + (distY*distY) );
    dots.push(d);
    tl.add( gsap.to(d, {duration:1, ease:'power1.inOut', a:100}), 0.1+0.3*Math.random()+d.dist/(size/2) )
  }
}


function hitTest(d1) {
  for (let i=0; i<dots.length; i++) {
    n++
    const d2 = dots[i];
    const distX = d1.x - d2.x;
    const distY = d1.y - d2.y;
    if (Math.sqrt((distX*distX)+(distY*distY)) <= d1.r+d2.r) return true;
  }
  return false;
}


function drawDot(d){
  ctx.translate(cw/2, ch/2);
  ctx.beginPath();
  ctx.arc(d.x, d.y, d.r-d.padding, 0, 2*Math.PI);
  ctx.fillStyle = 'hsla('+(baseHue+d.dist/4.15)+', 95%, '+d.l+'%, '+d.a+'%)';
  ctx.fill(); 
  ctx.translate(-cw/2, -ch/2);
}


function render(){
  ctx.clearRect(0,0,cw,ch);
  dots.forEach(drawDot)  
}