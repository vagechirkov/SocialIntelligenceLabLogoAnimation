const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];


ctx.fillStyle = 'black';
ctx.font = 'bold 30px Arial';
ctx.fillText('Social Intelligence Lab', 0, 50);
const textCoordinates = ctx.getImageData(0, 0, 500, 100);


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
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDx = dx / distance;
        let forceDy = dy / distance;

        if (distance < 300){
            this.x += forceDx;
            this.y += forceDy;
        } else {
            if (this.x !== this.initX){
                let dx = this.x - this.initX;
                this.x -= dx / 10;
            }
            if (this.y !== this.initY){
                let dy = this.y - this.initY;
                this.y -= dy / 10;
            }
        }
    }
}

function init(){
    particles = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if (textCoordinates.data[(y * 4 * x2) + (x * 4) + 3] > 128){
                const scale = 20;
                particles.push(new Particle(x*scale, y*scale));
            }
        }
    }

}

init();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i<particles.length; i++){
        particles[i].draw();
        particles[i].update();
    }
    requestAnimationFrame(animate);
}

animate();