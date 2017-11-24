const Block = {
    AIR: 0,
    WALL: 1,
    PLAYER: 2,
    ROCK: 3
};

const Direc = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2,
    UP: 3,
    NONE: 4
};

var canvas = document.getElementById("screen");
var context = null;
const scale = 32;

var rocks = new Array();
var player = null;
var moveDir = Direc.NONE;
var world = [];

var toBlockPos = function (pos) {
    return new Vec(Math.ceil(pos.x), Math.ceil(pos.y));
}

var isPlayer = function (x, y) {
    return x == player.pos.x && y == player.pos.y;
}



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
    return player.pos.x == x && player.pos.y == y;
}

var isWall = function (x, y) {
    return world[x][y] == Block.WALL;
}

var isAir = function (x, y) {
    return world[x][y] == Block.AIR && !isPlayer(x, y) && !isRock(x, y);
}

var initWorld = function () {
    loadLevel('00.lvl');
}

var main = function () {
    addEvents();
    initCanvas();
    initWorld();
    loop();
};

var loop = function () {
    update();
    redraw();
    requestAnimationFrame(loop);
}
var movePlayer = function (dx, dy) {
    var success = true;

    // When requested position is wall return
    if (world[player.pos.x + dx][player.pos.y + dy] == Block.WALL)
        return;
    else {
        // Check if requested position is rock
        rocks.forEach(function (rock) {
            if (rock.falling) {
                if (player.pos.x + dx == rock.blockPos.x && player.pos.y + dy == rock.blockPos.y ||
                    player.pos.x + dx == rock.blockPos.x && player.pos.y + dy == rock.blockPos.y - 1) {
                    success = false;
                }
            } else
            if (player.pos.x + dx == rock.blockPos.x && player.pos.y + dy == rock.blockPos.y) {
                if (dy == -1 || !rock.moveRock(dx, dy))
                    success = false;
            }
        });

    }
    if (!success)
        return;

    player.pos.x += dx;
    player.pos.y += dy;
}
var keys = 0;

var addEvents = function () {
    window.addEventListener("resize", function (e) {
        console.log("RESIZE");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    window.onkeydown = function (e) {

        if (e.repeat)
            return;

        if (e.keyCode == 38) {
            movePlayer(0, -1);

        } else if (e.keyCode == 40) {
            movePlayer(0, +1);

        } else if ((e.keyCode == 37)) {
            movePlayer(-1, 0);

        } else if (e.keyCode == 39) {
            movePlayer(1, 0);

        } else if (e.keyCode == 82) {
            reloadLevel();
        }


    };

}


var update = function () {

    rocks.forEach(function (rock) {
        rock.update();
    });
};
var img = new Image();
var sandImg = new Image();
var playerImg = new Image();

var initCanvas = function () {
    var canvas = document.getElementById("screen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    context.font = "15px Arial";

    img.src = "wall.jpg";
    sandImg.src = "sand.png";
    playerImg.src = "head.png";
};


var redraw = function () {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var x = 0; x < world.length; x++) {
        for (var y = 0; y < world[0].length; y++) {

            // Walls
            if (world[x][y] == Block.WALL) {
                context.drawImage(img, x * scale, y * scale, scale, scale);
            } else {
                context.fillStyle = "#75aaff";
                context.fillRect(x * scale, y * scale, scale, scale);

                context.stroke();
            }



        }
    }

    // Draw Player
    context.fillStyle = "#0000FF";
    context.drawImage(playerImg, player.pos.x * scale, player.pos.y * scale, scale, scale);
    context.stroke();

    // Draw Rocks
    context.fillStyle = "#FFFF00";
    rocks.forEach(function (rock) {
        context.drawImage(sandImg, rock.pos.x * scale, rock.pos.y * scale, scale, scale);
        context.stroke();
    });

};