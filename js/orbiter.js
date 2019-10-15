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
    constructor(gravity, size, astros) {
        this.gravity = gravity;
        this.size = size;
        this.astros = astros;
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
class ExecParams {
    constructor(canvas, images, ratios, speed) {
        this.canvas = canvas;
        this.images = images;
        this.ratios = ratios;
        this.speed = speed;
    }
}

function draw(universe, params) {				
    var ctxt = params.canvas.getContext('2d');
    ctxt.clearRect(0, 0, params.canvas.width, params.canvas.height);
    var smaller = params.canvas.parentElement.clientWidth;
    if (smaller > params.canvas.parentElement.clientHeight)
        smaller = params.canvas.parentElement.clientHeight;
    params.canvas.width = smaller;
    params.canvas.height = smaller;
    params.canvas.style.width = smaller + "px";
    params.canvas.style.height = smaller + "px";                    
    var unippp = universe.size / smaller;   
    var lppp = unippp / params.ratios[0];
    var mppp = unippp / params.ratios[1];
    var sppp = unippp / params.ratios[2];
    for (var i=0; i<universe.astros.length; i++) {
        if (universe.astros[i].name.startsWith("l")) 
            var rad = universe.astros[i].radius / lppp;
        else if (universe.astros[i].name.startsWith("m"))
            var rad = universe.astros[i].radius / mppp;
        else 
            var rad = universe.astros[i].radius / sppp;
        var diam = rad * 2;
        ctxt.drawImage(params.images[i],
            universe.astros[i].x / unippp - rad, 
            universe.astros[i].y / unippp - rad, 
            diam, diam);
    }
}

function step(universe, params) {
    for (var z=0; z<params.speed; z++) {
        universe.interact();
    }
    draw(universe, params);
}

function execOrbiter() {
    var canvas = document.getElementById("orbiter-canvas");
    var imgids = ["i1", "i2", "i2", "i2", "i2"];
    var imgs = [];
    for (var i=0; i<imgids.length; i++) 
        imgs[i] = document.getElementById(imgids[i]);
    var params = new ExecParams(canvas, imgs, [30, 1500, 1000000], 10000);

    var size = 4 * AU;
    var cx = size/2;
    var cy = size/2;
    var universe = new Universe(6.67428e-11, size, [
        new Astro("l-Sun", 1.9891e30, 6.96e8, cx, cy, 0, 0),
        new Astro("m-Mercury", 3.302e23, 2.4397e6, cx, cy+AU*0.4679210985588, 39000, 4500),
        new Astro("m-Venus", 4.869e24, 6.0518e6, cx-AU*0.72333199, cy, 0, 35021.4),
        new Astro("m-Earth", 5.9736e24, 6.371e6, cx, cy-AU, -29780, 0),
        new Astro("m-Mars", 6.4185e23, 3.3972e6, cx+AU*1.66579911087, cy, -700, -22000)]);

    //new Astro("s-Tesla", 1235, 1.5)
    //new Astro("m-Moon")

    setInterval(step, 1, universe, params);
}

