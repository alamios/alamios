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
    constructor(name, gravity, size, astros) {
        this.name = name;
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
                var path = this.dpatts[i+1][1].replace(this.dpatts[0][0], size);
                if (urlExists(path)) {
                    this.images[i].src = path;
                    done = true;
                }
                else if (size > this.dpatts[0][1]) {
                    this.images[i].src = this.dpatts[i+1][1].replace(this.dpatts[0][0], 0);
                    done = true;
                }
                size++;
            }
        }
    }
    start() {
        this.interval = setInterval(() => this.step(), 1);
        this.running = true;
    }
    stop() {
        clearInterval(this.interval);
        this.running = false;
    }
}

class OrbiterInterface {
    constructor(universe, dpatts, ratios, speed) {
        var infocont = document.createElement("div");
        infocont.setAttribute("id", universe.name + "-info");
        var p = document.createElement("p");
        p.setAttribute("id", universe.name);
        p.innerHTML = universe.name.replace("-", " ");
        infocont.append(p);
        var psep1 = document.createElement("p");
        psep1.innerHTML = " [ ";
        infocont.append(psep1);
        for (var i=0; i<universe.astros.length; i++) {
            var pname = document.createElement("p");
            pname.setAttribute("class", universe.astros[i].name);
            pname.innerHTML = universe.astros[i].name.replace("-", " ");
            infocont.append(pname);
            var px = document.createElement("p");
            px.innerHTML = "&nbsp;x";
            infocont.append(px);
            var pzoom = document.createElement("p");
            pzoom.setAttribute("class", universe.astros[i].name + "-zoom");
            pzoom.innerHTML = ratios[dpatts[i+1][0]];    
            infocont.append(pzoom);
            if (i < universe.astros.length-1) {
                var psep = document.createElement("p");
                psep.innerHTML = "&nbsp;|&nbsp;";
                infocont.append(psep);
            }
        }
        var psep2 = document.createElement("p");
        psep2.innerHTML = " ]";
        infocont.append(psep2);
        var info = document.querySelectorAll("#orbiter .system")[0];
        info.append(infocont);
        this.container = document.getElementById("orbiter");
        this.display = document.querySelectorAll("#orbiter .display")[0];
        this.credits = document.querySelectorAll("#orbiter .credits")[0];
        var canvas = document.querySelectorAll("#orbiter .canvas")[0];
        this.info = infocont;
        this.container.style.display = "none";
        this.info.style.display = "none";
        this.credits.style.display = "none";
        this.orbiter = new Orbiter(universe, canvas, dpatts, ratios, speed);
    }
    show() {
        this.container.style.display = "block";
        this.info.style.display = "block";
        this.orbiter.resize();
        this.orbiter.start();
    }
    hide() {
        this.orbiter.stop();
        this.container.style.display = "none";
        this.info.style.display = "none";
    }
    resize() {
        this.orbiter.resize();
    }
    toggleCredits() {
        if (this.credits.style.display != "none") {
            this.credits.style.display = "none";
            this.display.style.display = "block";
            this.orbiter.resize();
            this.orbiter.start();
        }
        else {
            this.orbiter.stop();
            this.display.style.display = "none";
            this.credits.style.display = "block";
        }
    }
}

function initSolarSystem() {
    var size = 3.5 * AU;
    var cx = size/2;
    var cy = size/2;
    var astros = [
        new Astro("Sun", 1.9891e30, 6.96e8, cx, cy, 0, 0),
        new Astro("Mercury", 3.302e23, 2.4397e6, cx, cy+AU*0.4679210985588, 39000, 4500),
        new Astro("Venus", 4.869e24, 6.0518e6, cx-AU*0.72333199, cy, 0, 35021.4),
        new Astro("Earth", 5.9736e24, 6.371e6, cx, cy-AU, -29780, 0),
        new Astro("Mars", 6.4185e23, 3.3972e6, cx+AU*1.66579911087, cy, -700, -22000)];
    //new Astro("s-Tesla", 1235, 1.5)
    var universe = new Universe("Solar-System", 6.67428e-11, size, astros);

    var dpatts = [["[s]", 500],
        [0, "img/orbiter/sun/sun1_[s].png"],
        [1, "img/orbiter/mercury/mercury_[s].png"],
        [1, "img/orbiter/venus/venus_[s].png"], 
        [1, "img/orbiter/earth/earth_[s].png"], 
        [1, "img/orbiter/mars/mars_[s].png"],
        [2, "img/orbiter/starman/starman_[s].png"]];
    var ratios = [30, 1500, 1000000];
    var speed = 10000;

    return new OrbiterInterface(universe, dpatts, ratios, speed);
}

function initSystem() {
    var size = 3.5 * AU;
    var cx = size/2;
    var cy = size/2;
    var astros = [
        new Astro("Sun", 1.9891e30, 6.96e8, cx, cy, 0, 0),
        new Astro("Mercury", 3.302e23, 2.4397e6, cx, cy+AU*0.4679210985588, 39000, 4500),
        new Astro("Venus", 4.869e24, 6.0518e6, cx-AU*0.72333199, cy, 0, 35021.4),
        new Astro("Earth", 5.9736e24, 6.371e6, cx, cy-AU, -29780, 0),
        new Astro("Mars", 6.4185e23, 3.3972e6, cx+AU*1.66579911087, cy, -700, -22000)];
    //new Astro("s-Tesla", 1235, 1.5)
    var universe = new Universe("Sys", 6.67428e-11, size, astros);

    var dpatts = [["[s]", 500],
        [0, "img/orbiter/sun/sun1_[s].png"],
        [1, "img/orbiter/mercury/mercury_[s].png"],
        [1, "img/orbiter/venus/venus_[s].png"], 
        [1, "img/orbiter/earth/earth_[s].png"], 
        [1, "img/orbiter/mars/mars_[s].png"],
        [2, "img/orbiter/starman/starman_[s].png"]];
    var ratios = [30, 1500, 1000000];
    var speed = 10000;

    return new OrbiterInterface(universe, dpatts, ratios, speed);
}
 
const AU = 1.495978707e11;