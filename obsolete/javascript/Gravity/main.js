var context = null;
var planets = new Array();
var canvas = document.getElementById("screen");
var zoomFactor = 80;
var time = 0.0;
const deltaT = 1e-3;
const G = 6.674e-11;
const rExponent = 3.00;

function Planet(x, y, mass,vx,vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ax = 0;
    this.ay = 0;
    this.mass = mass;

    this.getDeltaX = function (o) {
        return o.x - this.x;
    };

    this.getDeltaY = function (o) {
        return o.y - this.y;
    };

    this.getDistanceTo = function (o) {
        return Math.sqrt(
            Math.pow(this.getDeltaX(o), 2.0) +
            Math.pow(this.getDeltaY(o), 2.0)
        );
    };
};

var main = function () {

    addEvents();
    initCanvas();

    var p1 = new Planet(0.0, -20000.0, 3e24,20000.0,0.0);
    var p2 = new Planet(0.0, 20000.0, 3e24,-20000.0,0.0);

    planets.push(p1);
    planets.push(p2);

    loop();
};

var loop = function(){
    update();
    redraw();
    requestAnimationFrame(loop);
}

var addEvents = function () {
    window.addEventListener("click", function (e) {
        planets.push(new Planet(
            (e.x - (window.innerWidth / 2.0)) * zoomFactor,
            (e.y - (window.innerHeight / 2.0)) * zoomFactor,
            3e24,0.0,0.0
        ));
    });

    window.addEventListener("resize", function (e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

var update = function () {

    planets.forEach(function (p) {

        planets.forEach(function (o1) {

            var ax = 0.0;
            var ay = 0.0;

            planets.forEach(function (o2) {

                if (o1 !== o2) {

                    var deltaX = o1.getDeltaX(o2);
                    var deltaY = o1.getDeltaY(o2);
                    var r = o1.getDistanceTo(o2);                    

                    ax += (G * o2.mass * deltaX) / Math.pow(r, rExponent);
                    ay += (G * o2.mass * deltaY) / Math.pow(r, rExponent);
                }
            });
            o1.ax = ax;
            o1.ay = ay;
        });

        planets.forEach(function (o) {
            o.vx += deltaT * o.ax;
            o.vy += deltaT * o.ay;
        });

        planets.forEach(function (o) {
            o.x += (deltaT * o.vx) + (0.5 * o.ax * Math.pow(deltaT, 2.0));
            o.y += (deltaT * o.vy) + (0.5 * o.ay * Math.pow(deltaT, 2.0));
        });
    });

    time += deltaT;

};

var initCanvas = function () {
    var canvas = document.getElementById("screen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    context.font = "15px Arial";
};

var redraw = function () {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i in planets) {
        var p = planets[i];
        context.beginPath();
        context.arc((p.x / zoomFactor) + (window.innerWidth / 2), (p.y / zoomFactor) + (window.innerHeight / 2), 10, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        context.stroke();
    }
    context.fillText("Time = " + time + "s", 10, 15);
    context.fillText("DeltaT = " + deltaT + "s", 10, 15 + 15);

};