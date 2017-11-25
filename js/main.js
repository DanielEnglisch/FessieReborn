var canvas = document.getElementById("screen");
var context = null;
const scale = 64;
const gravity = 0.1;

var rocks = new Array();
var player = null;
var moveDir = Direc.NONE;
var world = [];

var isRock = function (x, y) {
    var succ = false;
    rocks.forEach(function (r) {
        if (x == r.blockPos.x && y == r.blockPos.y) {
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
    return world[x][y] == Block.AIR && !isPlayer(x, y) && !isRock(x, y);
}

var initWorld = function () {
    loadLevel('level/00.lvl');
}

var main = function () {
    addEvents();
    initCanvas();
    loadTextures();
    initWorld();
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
    rocks.forEach(function (rock) {
        rock.update();
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
                context.drawImage(img, x * scale, y * scale, scale, scale);
            } else {
                // Everthing else
                context.fillStyle = "#12489e";
                context.fillRect(x * scale, y * scale, scale, scale);

                context.stroke();
            }
        }
    }

    // Draw Player
    // Update direction image
    switch (player.looking) {
        case Direc.UP:
            context.drawImage(img_up, player.pos.x * scale, player.pos.y * scale, scale, scale);
            break;
        case Direc.DOWN:
            context.drawImage(img_down, player.pos.x * scale, player.pos.y * scale, scale, scale);
            break;
        case Direc.LEFT:
            context.drawImage(img_left, player.pos.x * scale, player.pos.y * scale, scale, scale);
            break;
        case Direc.RIGHT:
            context.drawImage(img_right, player.pos.x * scale, player.pos.y * scale, scale, scale);
            break;
        default:
            context.drawImage(img_p, player.pos.x * scale, player.pos.y * scale, scale, scale);
            break;
    }
    context.stroke();

    // Draw Rocks
    context.fillStyle = "#FFFF00";
    rocks.forEach(function (rock) {
        context.drawImage(rockImg, rock.pos.x * scale, rock.pos.y * scale, scale, scale);
        context.stroke();
    });

};