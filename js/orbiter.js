class Astro {
    constructor(mass, radius, x, y, vx, vy) {
        this.mass = mass;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    acelerate(vx, vy) {
        this.vx += vx;
        this.vy += vy;
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    static interact(astro1, astro2) {   
        var dx = astro2.x - astro1.x;
        var dy = astro2.y - astro1.y;
        var distance = Math.sqrt((dx * dx) + (dy * dy));
        var force = grav * ((astro1.mass * astro2.mass) / (distance * distance));
        
        var aceleration = (force / astro1.mass);
        var dist_rel = distance / aceleration;
        var grav_vx = dx / dist_rel;
        var grav_vy = dy / dist_rel;
        astro1.acelerate(grav_vx, grav_vy);
        
        aceleration = (force / astro2.mass);
        dist_rel = distance / aceleration;
        grav_vx = dx / dist_rel;
        grav_vy = dy / dist_rel;
        astro2.acelerate(grav_vx, grav_vy);
    }
}

function interact() {
    for (var i=0; i<astros.length-1; i++) {
        for (var j=i+1; j<astros.length; j++) {
            Astro.interact(astros[i], astros[j], grav);
        }
    }    
    for (var astro in astros) {
        astro.move();
    }
    document.writeln(astros[0].x);
} 

const grav = 6.67428e-11;
const sun = new Astro(1.9891e30, 6.96e8, 10, 10, 1, 1);
const mercury = new Astro(3.302e23, 2.4397e6, 10, 10, 1, 1);
const venus = new Astro(4.869e24, 6.0518e6);
const earth = new Astro(5.9736e24, 6.371e6);
const mars = new Astro(6.4185e23, 3.3972e6);
//const astros = [sun, mercury, venus, earth, mars];
const astros = [sun, mercury];

//setInterval(interact, 500)
