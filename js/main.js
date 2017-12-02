var canvas = document.getElementById("screen");
var context = null;
const scale = 64;
const gravity = 0.05;
const movementSpeed = 0.075;
var items_left = 0;
var STOP = false;

var xOffset = 0;
var yOffset = 0;

var fallables = [];
var player = null;
var world = [];
var exit = null;
var monsters = [];

var initWorld = function () {
    loadLevel();
}

var tex = new TexturesBundle();
var audio = new AudioBundle();

var main = function () {
    addEvents();
    initCanvas();
    initWorld();
    tex.load("img/");
    startBackgroundMusic();
    loop();
};

var time = Date.now();
var thresh = 1000 / 120;

var loop = function () {

    if (Date.now() - time >= thresh) {
        update();
        time = Date.now();
    }

    redraw();
    requestAnimationFrame(loop);
}

var keys = [];

var refreshOffset = function () {
    xOffset = 0;
    yOffset = 0;
    xOffset -= player.pos.x * scale - canvas.width / 2 + 1 * scale;
    yOffset -= player.pos.y * scale - canvas.height / 2 + 0 * scale;
    xOffset = Math.round(xOffset);
    yOffset = Math.round(yOffset);
}

var addEvents = function () {
    window.addEventListener("resize", function (e) {
        console.log("RESIZE");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 40;
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

    // New collision detection

    // Fallables -> Monsters
    fallables.forEach(function (f) {
        if (f.isFalling) {
            monsters.forEach(function (m) {
                if (Math.abs(f.pos.x - m.pos.x) < 0.7 && Math.abs(f.pos.y - m.pos.y) < 0.7)
                    m.kill();
            });
        }
    });

   

    // Player -> Monsters
    monsters.forEach(function (f) {
        if (Math.abs(f.pos.x - player.pos.x) < 1 && Math.abs(f.pos.y - player.pos.y) < 1){
            f.kill();
            player.kill();
        }
           
    });


    player.update();

    fallables.forEach(function (f) {
        f.update();
    });

    monsters.forEach(function (m) {
        m.update();
    });

    if (STOP)
        return;

    if(keys[17]){
        console.log("GRABBING");
        if (keys[38]||keys[87]) {
            player.grab(0, -1);
        } else if (keys[40]||keys[83]) {
            player.grab(0, +1);
        } else if (keys[37]||keys[65]) {
            player.grab(-1, 0);
        } else if (keys[39]||keys[68]) {
            player.grab(1, 0);
        } 
    }else{
        if (keys[38]||keys[87]) {
            player.move(0, -1);
        } else if (keys[40]||keys[83]) {
            player.move(0, +1);
        } else if (keys[37]||keys[65]) {
            player.move(-1, 0);
        } else if (keys[39]||keys[68]) {
            player.move(1, 0);
        } 
    }
    
    if (keys[82]) {
        reloadLevel();
        keys[82] = false;
    } 
    
    if (keys[27]) {
        // ESC
        if (levelTesting)
            window.location.href = "./editor/?data=" + levelString;

        keys[27] = false;
    }

};

var initCanvas = function () {
    var canvas = document.getElementById("screen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 40;
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
            } else if (world[x][y] == Block.STEEL_WALL) {
                context.drawImage(tex.steel_wall, x * scale + xOffset, y * scale + yOffset, scale, scale);
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

    // Draw monsters
    monsters.forEach(function (m) {
        m.draw(context);
    });

    // Score Test
    context.fillStyle = "black";
    context.fillRect(0, canvas.height - 50, canvas.width, 50);
    context.stroke();
    context.font = "24px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "rgb(248, 132, 0)";
    context.fillText("Items left: " + items_left, canvas.width / 2, canvas.height - 25);


};