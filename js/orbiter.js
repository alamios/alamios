class Astro {
    constructor(name, mass, radius, x, y, vx, vy) {
        this.name = name;
        this.mass = mass;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    acelerate(gx, gy) {
        this.vx += gx;
        this.vy += gy;
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    static interact(astro1, astro2) {   
        var dx = astro2.x - astro1.x;
        var dy = astro2.y - astro1.y;
        var dist = Math.sqrt((dx * dx) + (dy * dy));
        var force = grav * ((astro1.mass * astro2.mass) / (dist * dist));
        
        var acc = (force / astro1.mass);
        var dist_rel = dist / acc;
        var gx = dx / dist_rel;
        var gy = dy / dist_rel;
        astro1.acelerate(gx, gy);
        
        acc = (force / astro2.mass);
        dist_rel = dist / acc;
        gx = dx / dist_rel;
        gy = dy / dist_rel;
        astro2.acelerate(-gx, -gy);
    }
}

function interact() {
    for (var i=0; i<astros.length-1; i++) {
        for (var j=i+1; j<astros.length; j++) {
            Astro.interact(astros[i], astros[j]);
        }
    }    
    for (var i=0; i<astros.length; i++) {
        astros[i].move();
    }
} 

function draw() {				
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var r = [10, 5, 5, 5, 5];
    var i1 = document.getElementById("i1");
    var i2 = document.getElementById("i2");
    var img = [i1, i2, i2, i2, i2];
    for (var i=0; i<astros.length; i++) {
        ctx.drawImage(img[i], astros[i].x/ppp, astros[i].y/ppp, r[i], r[i]);
    }
}

function step() {
    for (var z=0; z<100000; z++) {
        interact();
    }
    draw();
}

const canvas = document.getElementById("canvas");
const grav = 6.67428e-11;
const au = 1.495978707e11;
var centerX = au*5;
var centerY = au*5;
var ppp = 2.0e9;
const sun = new Astro("Sun", 1.9891e30, 6.96e8, centerX, centerY, 0, 0);
const mercury = new Astro("Mercury", 3.302e23, 2.4397e6, centerX, centerY+au*0.4679210985588, 39000, 4500);
const venus = new Astro("Venus", 4.869e24, 6.0518e6, centerX-au*0.72333199, centerY, 0, 35021.4);
const earth = new Astro("Earth", 5.9736e24, 6.371e6, centerX, centerY-au, -29780, 0);
const mars = new Astro("Mars", 6.4185e23, 3.3972e6, centerX+au*1.66579911087, centerY, -700, -22000);
/* const tesla = new Astro("Tesla", 1235, 1.5);
const astros = [sun, mercury, venus, earth, mars, tesla]; */
const astros = [sun, mercury, venus, earth, mars];

//setInterval(step, 1);