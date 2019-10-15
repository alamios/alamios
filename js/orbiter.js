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
    constructor(canvas, images, speed, planetRatio, sunRatio, carRatio) {
        this.canvas = canvas;
        this.images = images;
        this.speed = speed;
        this.planetRatio = planetRatio;
        this.sunRatio = sunRatio;
        this.carRatio = carRatio;
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
    var planetppp = unippp / params.planetRatio;
    var sunppp = unippp / params.sunRatio;
    var carppp = unippp / params.carRatio;
    for (var i=0; i<universe.astros.length; i++) {
        if (universe.astros[i].name == "Sun") 
            var diam = universe.astros[i].radius / sunppp;
        else if (universe.astros[i].name == "Tesla")
            var diam = universe.astros[i].radius / carppp;
        else 
            var diam = universe.astros[i].radius / planetppp;
        var rad = diam / 2;
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
    var params = new ExecParams(canvas, imgs, 10000, 2000, 50, 1);

    var size = 4 * AU;
    var cx = size/2;
    var cy = size/2;
    var universe = new Universe(6.67428e-11, size, [
        new Astro("Sun", 1.9891e30, 6.96e8, cx, cy, 0, 0),
        new Astro("Mercury", 3.302e23, 2.4397e6, cx, cy+AU*0.4679210985588, 39000, 4500),
        new Astro("Venus", 4.869e24, 6.0518e6, cx-AU*0.72333199, cy, 0, 35021.4),
        new Astro("Earth", 5.9736e24, 6.371e6, cx, cy-AU, -29780, 0),
        new Astro("Mars", 6.4185e23, 3.3972e6, cx+AU*1.66579911087, cy, -700, -22000)]);

    //new Astro("Tesla", 1235, 1.5)
    //new Astro("Luna")

    setInterval(step, 1, universe, params);
}

