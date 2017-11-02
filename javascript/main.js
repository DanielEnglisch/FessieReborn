var context = null;
var planets = new Array();
var canvas = document.getElementById("screen");
var zoomFactor = 80;
var time  = 0;
var deltaT =1e-6;


function Planet(x, y, mass) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.mass = mass;

    this.getDeltaX = function(o){
        return o.x - this.x;
    };

    this.getDeltaY = function(o){
         return o.y - this.y;
    };

    this.getDistanceTo = function(o){
         return Math.sqrt(
             Math.pow(this.getDeltaX(o), 2)
             +
             Math.pow(this.getDeltaY(o), 2));
    };
};

var main = function () {

    addEvents();
    initCanvas();

    var p1 = new Planet(0, -20000, 3e24);    
    var p2 = new Planet(0, 20000, 3e24);    
    
    p1.vx = 20000;
    p2.vx = -20000;

    planets.push(p1);
    planets.push(p2);
    console.info(planets.length);
    // Main loop
    window.setInterval(function () {
        update();
        redraw();
    }, 10);

};

var addEvents = function () {
    window.addEventListener("click", function (e) {
        planets.push(new Planet((e.x-(window.innerWidth/2))*zoomFactor, (e.y-(window.innerHeight/2))*zoomFactor, 6*Math.pow(10,24)));
    });

    window.addEventListener("resize", function (e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

var update = function () {

    //console.info(planets.length);

    for (var i in planets) {
        var p = planets[i];
       

            var G = 6.67384e-11;
            var rExponent = 3;
    
            // #1:Beschleunigung-Schleife:
            for (var i in planets) {
                var o1 = planets[i];

                var ax = 0.0;
                var ay = 0.0;
    
                for (var j in planets) {
                    var o2 = planets[j];                    
                    if (o1 != o2) {
    
                        var deltaX = o1.getDeltaX(o2);
                        var deltaY = o1.getDeltaY(o2);
                        var r = o1.getDistanceTo(o2);
    
                        ax += (G * o2.mass * deltaX) / Math.pow(r, rExponent);
                        ay += (G * o2.mass * deltaY) / Math.pow(r, rExponent);
                    }
                }
                o1.ax = ax;
                o1.ay = ay;
            }
    
            for (var k in planets) {
                var o = planets[k];
                o.vx += deltaT * o.ax;
                o.vy += deltaT * o.ay;
            }
    
            for (var l in planets) {
                var o = planets[l];
                o.x += (deltaT * o.vx) + (0.5 * o.ax * Math.pow(deltaT, 2));
                o.y += (deltaT * o.vy) + (0.5 * o.ay * Math.pow(deltaT, 2));
            }
        }
    time+=deltaT;

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
        context.arc((p.x/zoomFactor)+(window.innerWidth/2), (p.y/zoomFactor)+(window.innerHeight/2), 10, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        context.stroke();
    }
    context.fillText("Time = " + time + "s" ,10,15); 
    context.fillText("DeltaT = " + deltaT + "s" ,10,15+15); 
    
};

