var context = null;
var planets = new Array();
var canvas = document.getElementById("screen");

function Planet(x, y, mass) {
    this.x = x;
    this.y = y;
    this.mass = mass;
};

var main = function () {

    addEvents();
    initCanvas();

    // Main loop
    window.setInterval(function () {
        update();
        redraw();
    }, 1000 / 60);


};

var addEvents = function () {
    window.addEventListener("click", function (e) {
        planets.push(new Planet(e.x, e.y, 10));
    });

    window.addEventListener("resize", function (e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

var update = function () {

    for (var i in planets) {
        var p = planets[i];
        if (p.x > window.innerWidth + p.mass || p.x < -p.mass || p.y > window.innerHeight+p.mass || p.y < -p.mass) {
            planets.splice(i, 1);
        } else {
            p.x++;
            p.y++;
        }

    }
};

var initCanvas = function () {
    var canvas = document.getElementById("screen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
};

var redraw = function () {
    console.info("redraw");
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i in planets) {
        var p = planets[i];
        context.beginPath();
        context.arc(p.x, p.y, p.mass, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        context.stroke();
    }
};

