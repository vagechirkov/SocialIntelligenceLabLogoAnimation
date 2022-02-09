const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// mouse position
let mouse = {
    x: undefined,
    y: undefined,
    radius: 10
}


window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

//create particle
class Particle {
    constructor(x, y, directionX, directionY, radius, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX
        this.directionY = directionY
        this.radius = radius;
        this.color = color;
    }

    // draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // update particle
    update() {
        if (this.x - this.radius > canvas.width || this.x - this.radius < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y - this.radius > canvas.width || this.y - this.radius < 0) {
            this.directionY = -this.directionY;
        }
        // collision detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.radius * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.radius * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.radius * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.radius * 10) {
                this.y -= 10;
            }
        }
        // move particle
        this.x += this.directionX;
        this.y += this.directionY;

        //draw particle
        this.draw();

    }
}


// create array of particles
function init() {

    let numberOfParticles = 100;
    for (let i = 0; i < numberOfParticles; i++) {
        let radius = Math.random() * 10 + 1;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let directionX = (Math.random() - 0.5) * 2;
        let directionY = (Math.random() - 0.5) * 2;
        let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        particles.push(new Particle(x, y, directionX, directionY, radius, color));
    }
}

// animation loop
function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

let particles = [];
init();
animate();
