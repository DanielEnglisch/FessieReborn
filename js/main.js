var canvas = document.getElementById("screen");
var context = null;
const scale = 64;
const gravity = 0.05;
const movementSpeed = 0.075;
var score = 0;


var xOffset = 0;
var yOffset = 0;

var fallables = new Array();
var player = null;
var world = [];
var exit = null;

var initWorld = function () {
    loadLevel('level/00.lvl');
}

var tex = new TexturesBundle();
var audio = new AudioBundle();

var main = function () {
    addEvents();
    initCanvas();
    initWorld();
    tex.load();
    startBackgroundMusic();
    loop();
};

var time = Date.now();
var thresh = 1000/120;

var loop = function () {

    if (Date.now() -  time >= thresh) {
        update();
       time = Date.now();
    }

    redraw();
    requestAnimationFrame(loop);
}

var keys = [];

var refreshOffset = function(){
    xOffset = 0;
    yOffset = 0;
    xOffset -= player.pos.x * scale - canvas.width / 2 +1 *scale;
    yOffset -= player.pos.y * scale - canvas.height / 2 +0*scale;
    xOffset = Math.round(xOffset);
    yOffset = Math.round(yOffset);
}

var addEvents = function () {
    window.addEventListener("resize", function (e) {
        console.log("RESIZE");
        canvas.width = window.innerWidth;
        canvas.height= window.innerHeight-40;
        refreshOffset();
    });

    
    
    window.onkeydown = function (e) {

        if (e.repeat)
            return;

        keys[e.keyCode] = true;


    };
    window.onkeyup = function (e) {

        if (e.repeat)
            return;

        keys[e.keyCode] = false;


    };

}

var update = function () {

    if (keys[38]) {
        player.move(0, -1);
    } else if (keys[40]) {
        player.move(0, +1);
    } else if (keys[37]) {
        player.move(-1, 0);
    } else if (keys[39]) {
        player.move(1, 0);
    } else if (keys[82]) {
        reloadLevel();
        keys[82] = false;
    }


    player.update();
    fallables.forEach(function (f) {
        f.update();
    });
};

var initCanvas = function () {
    var canvas = document.getElementById("screen");
    canvas.width = window.innerWidth;
    canvas.height= window.innerHeight-40;
    context = canvas.getContext("2d");
};


var redraw = function () {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.imageSmoothingEnabled = false;
    for (var x = 0; x < world.length; x++) {
        for (var y = 0; y < world[0].length; y++) {

            // Walls
            if (world[x][y] == Block.WALL) {
                context.drawImage(tex.wall, x * scale + xOffset, y * scale + yOffset, scale, scale);
            } else if (world[x][y] == Block.DIRT) {
                context.drawImage(tex.dirt, x * scale + xOffset, y * scale + yOffset, scale, scale);
            } else {
                // Everthing else
                context.drawImage(tex.air, x * scale + xOffset, y * scale + yOffset, scale, scale);
                
            }
            context.stroke();
            
        }
    }

    player.draw(context);
    exit.draw(context);

    // Draw fallables
    fallables.forEach(function (f) {
        f.draw(context);
    });

    // Score Test
    context.fillStyle = "black";    
    context.fillRect(0, canvas.height-50, canvas.width, 50);
    context.stroke();
    context.font = "24px Arial";    
    context.textAlign="center";
    context.textBaseline = "middle";
    context.fillStyle = "rgb(248, 132, 0)";
    context.fillText("Score: " + score,canvas.width/2,canvas.height-25); 
    

};