var main = function () {

    addEvents();
    initCanvas();
    loop();
};

var loop = function(){
    update();
    redraw();
    requestAnimationFrame(loop);
}

var addEvents = function () {
    window.addEventListener("resize", function (e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

var update = function () {

   
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