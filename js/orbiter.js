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
class Orbiter {
    constructor(universe, canvas, dpatts, ratios, speed) {
        this.universe = universe;
        this.canvas = canvas;
        this.ctxt = this.canvas.getContext('2d');
        this.dpatts = dpatts;
        this.ratios = ratios;
        this.speed = speed;
        this.running = false;
        this.resize();
    }
    draw() {	
        this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i=0; i<this.universe.astros.length; i++) {
            var rad = this.sizes[i+1];
            var diam = Math.round(rad * 2);
            this.ctxt.drawImage(this.images[i],
                Math.round(this.universe.astros[i].x / this.sizes[0] - rad), 
                Math.round(this.universe.astros[i].y / this.sizes[0] - rad), 
                diam, diam);
        }	
    }
    step() {
        for (var z=0; z<this.speed; z++) {
            this.universe.interact();
        }
        this.draw();
    }
    resize() {
        var smaller = this.canvas.parentElement.clientWidth;
        if (smaller > this.canvas.parentElement.clientHeight)
            smaller = this.canvas.parentElement.clientHeight;
        this.canvas.width = smaller;
        this.canvas.height = smaller;
        this.canvas.style.width = smaller + "px";
        this.canvas.style.height = smaller + "px";          
        this.sizes = [this.universe.size / smaller];
        this.images = [];
        for (var i=0; i<this.universe.astros.length; i++) {
            var zoom = this.ratios[this.dpatts[i+1][0]];
            this.sizes[i+1] = this.universe.astros[i].radius * zoom / this.sizes[0];
            this.images[i] = new Image();
            var size = Math.round(this.sizes[i+1] * 2);
            var done = false;
            while (!done) {
                var path = this.dpatts[i+1][1].replace(this.dpatts[0], size);
                if (urlExists(path)) {
                    this.images[i].src = path;
                    done = true;
                }
                size++;
            }
        }
    }
    start() {
        this.interval = setInterval(() => orbiter.step(), 1);
        this.running = true;
    }
    stop() {
        clearInterval(this.interval);
        this.running = false;
    }
}

function addOrbiterInfo(astros, ratios, dpatts) {
    var info = document.getElementById("orbiter-info");
    var last = document.getElementById("credits-link");
    for (var i=0; i<astros.length; i++) {
        var pname = document.createElement("p");
        pname.setAttribute("id", astros[i].name);
        pname.innerHTML = astros[i].name;
        var pzoom = document.createElement("p");
        pzoom.setAttribute("id", astros[i].name + "-zoom");
        pzoom.innerHTML = ratios[dpatts[i+1][0]];    
        var px = document.createElement("p");
        px.innerHTML = "&nbsp;x";
        info.insertBefore(pname, last);
        info.insertBefore(px, last);
        info.insertBefore(pzoom, last);
        if (i < astros.length-1) {
            var psep = document.createElement("p");
            psep.innerHTML = ((i<astros.length-1)? "&nbsp;|&nbsp;":"");
            info.insertBefore(psep, last);
        }
    }
}

function toggleOrbiterCredits() {
    var credits = document.getElementById("orbiter-credits-container");
    var orbiter = document.getElementById("orbiter-container");
    if (credits.style.display == "none") {
        credits.style.display = "block";
        orbiter.style.display = "none";
    }
    else {
        credits.style.display = "none";
        orbiter.style.display = "block";
    }
}

function initSolarSystem() {
    var size = 3.5 * AU;
    var cx = size/2;
    var cy = size/2;
    var astros = [
        new Astro("sun", 1.9891e30, 6.96e8, cx, cy, 0, 0),
        new Astro("mercury", 3.302e23, 2.4397e6, cx, cy+AU*0.4679210985588, 39000, 4500),
        new Astro("venus", 4.869e24, 6.0518e6, cx-AU*0.72333199, cy, 0, 35021.4),
        new Astro("earth", 5.9736e24, 6.371e6, cx, cy-AU, -29780, 0),
        new Astro("mars", 6.4185e23, 3.3972e6, cx+AU*1.66579911087, cy, -700, -22000)];
    //new Astro("s-Tesla", 1235, 1.5)
    var universe = new Universe(6.67428e-11, size, astros);

    var canvas = document.getElementById("orbiter-canvas");
    var dpatts = ["[s]",
        [0, "img/orbiter/sun/sun1_[s].png"],
        [1, "img/orbiter/mercury/mercury_[s].png"],
        [1, "img/orbiter/venus/venus_[s].png"], 
        [1, "img/orbiter/earth/earth_[s].png"], 
        [1, "img/orbiter/mars/mars_[s].png"],
        [2, "img/orbiter/starman/starman_[s].png"]];
    var ratios = [30, 1500, 1000000];
    var speed = 10000;
    
    addOrbiterInfo(astros, ratios, dpatts);
    document.getElementById("orbiter-credits-container").style.display = "none";

    var orbiter = new Orbiter(universe, canvas, dpatts, ratios, speed);
    return orbiter;
}
 
const AU = 1.495978707e11;