var canvas = document.getElementById("screen");
var context = null;
const scale = 64;
const gravity = 0.1;

var fallables = new Array();
var player = null;
var world = [];

var isFallable = function (x, y) {
    var succ = false;
    fallables.forEach(function (f) {
        if (x == f.blockPos.x && y == f.blockPos.y) {
            succ = true;
        }
    });
    return succ;
}

var isPlayer = function (x, y) {
    return player.blockPos.x == x && player.blockPos.y == y;
}

var isWall = function (x, y) {
    return world[x][y] == Block.WALL;
}

var isAir = function (x, y) {
    return world[x][y] == Block.AIR && !isPlayer(x, y) && !isFallable(x, y);
}

var initWorld = function () {
    loadLevel('level/00.lvl');
}

var tex = new TexturesBundle();

var main = function () {
    addEvents();
    initCanvas();
    initWorld();
    tex.load();
    loop();
};




var loop = function () {
    update();
    redraw();
    requestAnimationFrame(loop);
}

var keys = [];

var addEvents = function () {
    window.addEventListener("resize", function (e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
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
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    context.font = "15px Arial";


};


var redraw = function () {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var x = 0; x < world.length; x++) {
        for (var y = 0; y < world[0].length; y++) {

            // Walls
            if (world[x][y] == Block.WALL) {
                context.drawImage(tex.wall, x * scale, y * scale, scale, scale);
            } else {
                // Everthing else
                context.fillStyle = "#12489e";
                context.fillRect(x * scale, y * scale, scale, scale);

                context.stroke();
            }
        }
    }

    player.draw(context);

    // Draw fallables
    fallables.forEach(function (f) {
        f.draw(context);
    });

};