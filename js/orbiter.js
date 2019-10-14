const AU = 1.495978707e11;

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
    accelerate(gx, gy) {
        this.vx += gx;
        this.vy += gy;
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
    static interact(astro1, astro2, gravity) {   
        var dx = astro2.x - astro1.x;
        var dy = astro2.y - astro1.y;
        var dist = Math.sqrt((dx * dx) + (dy * dy));
        var force = gravity * ((astro1.mass * astro2.mass) / (dist * dist));
        
        var acc = (force / astro1.mass);
        var dist_rel = dist / acc;
        var gx = dx / dist_rel;
        var gy = dy / dist_rel;
        astro1.accelerate(gx, gy);
        
        acc = (force / astro2.mass);
        dist_rel = dist / acc;
        gx = dx / dist_rel;
        gy = dy / dist_rel;
        astro2.accelerate(-gx, -gy);
    }
}
class Universe {
    constructor(gravity, size, speed) {
        this.gravity = gravity;
        this.size = AU*size;
        this.speed = speed;
        var cx = this.size/2;
        var cy = this.size/2;
        this.astros = [
            new Astro("Sun", 1.9891e30, 6.96e8, cx, cy, 0, 0),
            new Astro("Mercury", 3.302e23, 2.4397e6, cx, cy+AU*0.4679210985588, 39000, 4500),
            new Astro("Venus", 4.869e24, 6.0518e6, cx-AU*0.72333199, cy, 0, 35021.4),
            new Astro("Earth", 5.9736e24, 6.371e6, cx, cy-AU, -29780, 0),
            new Astro("Mars", 6.4185e23, 3.3972e6, cx+AU*1.66579911087, cy, -700, -22000)];

        //var tesla = new Astro("Tesla", 1235, 1.5);
    }
    interact() {
        for (var i=0; i<this.astros.length-1; i++) {
            for (var j=i+1; j<this.astros.length; j++) {
                Astro.interact(this.astros[i], this.astros[j], this.gravity);
            }
        }    
        for (var i=0; i<this.astros.length; i++) {
            this.astros[i].move();
        }
    } 
}

function calcPPP() {
    return 2.0e9;
}

function draw(canvas, images, universe) {				
    var ctxt = canvas.getContext('2d');
    ctxt.clearRect(0, 0, canvas.width, canvas.height);
    //console.log(canvas.width);
    //console.log(canvas.height);
    var r = [10, 5, 5, 5, 5];                       // Esto sobra, hay que calcula el radio segun el tamaño real excepto para el sol
    var ppp = calcPPP();                            // Hay que hacer la funcion calcPPP en funcion del tamaño del canvas
    for (var i=0; i<universe.astros.length; i++) {
        ctxt.drawImage(images[i],
            universe.astros[i].x/ppp, 
            universe.astros[i].y/ppp, 
            r[i], r[i]);
    }
}

function step(canvas, images, universe) {
    for (var z=0; z<universe.speed; z++) {
        universe.interact();
    }
    draw(canvas, images, universe);
}

function loadImages(imageIDs) {
    var imgs = [];
    for (var i=0; i<imageIDs.length; i++) {
        imgs[i] = document.getElementById(imageIDs[i]);
    }
    return imgs;
}

function execOrbiter() {
    const canvas = document.getElementById("orbiter-canvas");
    var images = loadImages(["i1", "i2", "i2", "i2", "i2"]);
    var universe = new Universe(6.67428e-11, 6, 100000);
    setInterval(step, 1, canvas, images, universe);
}

