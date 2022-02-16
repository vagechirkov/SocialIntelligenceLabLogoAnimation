const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];


ctx.fillStyle = 'white';
ctx.font = 'bold 30px Arial';
ctx.fillText('Hello World', canvas.width / 2 - 100, canvas.height / 2);
const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;


//create particle
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.initX = this.x;
        this.initY = this.y;
        this.dencity = (Math.random() * 30) + 1;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fill();
    }

}

function init(){
    particles = [];
    particles.push(new Particle(canvas.width / 2, canvas.height / 2));
}

init();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i<particles.length; i++){
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

animate();