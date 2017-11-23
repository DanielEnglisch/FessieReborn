var canvas = document.getElementById("screen");
var context = null;
const scale = 75;

var rocks = new Array();

var player = null;

const Block = {
    AIR: 0,
    WALL: 1,
    PLAYER: 2,
    ROCK: 3
};

// 1 = Solid blocks
// 2 = Player
// 3 = Crates
// 4 = Exit
var world = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 3, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 3, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 0, 1],
    [1, 0, 2, 3, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 3, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var Vec = function (x, y) {
    this.x = x;
    this.y = y;
};

function Player(pos) {
    this.pos = pos;
}

var toBlockPos = function (pos) {
    return new Vec(Math.ceil(pos.x), Math.ceil(pos.y));
}

var isPlayer = function (x, y) {
    return x == player.pos.x && y == player.pos.y;
}

function transpose(a) {

    // Calculate the width and height of the Array
    var w = a.length || 0;
    var h = a[0] instanceof Array ? a[0].length : 0;

    // In case it is a zero matrix, no transpose routine needed.
    if (h === 0 || w === 0) {
        return [];
    }

    /**
     * @var {Number} i Counter
     * @var {Number} j Counter
     * @var {Array} t Transposed data is stored in this array.
     */
    var i, j, t = [];

    // Loop through every item in the outer array (height)
    for (i = 0; i < h; i++) {

        // Insert a new row (array)
        t[i] = [];

        // Loop through every item per item in outer array (width)
        for (j = 0; j < w; j++) {

            // Save transposed data.
            t[i][j] = a[j][i];
        }
    }

    return t;
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

function Rock(pos) {
    this.blockPos = pos;
    this.pos = new Vec(pos.x, pos.y);
    this.falling = false;
    this.moveRock = function (dx, dy) {

        var succ = true;

        // When requested position is wall return
        if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.WALL)
            return false;
        // Check if requested position is rock
        var myBlockPos = this.blockPos;
        rocks.forEach(function (r) {
            if (myBlockPos.x + dx == r.blockPos.x && myBlockPos.y + dy == r.blockPos.y) {
                succ = false;
            }
        });

        if (!succ)
            return false;

        this.blockPos.x += dx;
        this.blockPos.y += dy;
        this.pos = this.blockPos;
        return true;
    }

    this.update = function () {
        // If falling and not at end position
        if (this.falling && this.pos.y < this.blockPos.y) {
            this.pos.y += 0.1;
            this.pos.y = Math.round(this.pos.y * 100) / 100
        } else if (this.pos.y == this.blockPos.y) {
            this.falling = false;
        }

        if (!this.falling  && isAir(this.blockPos.x, this.blockPos.y + 1)) {
            console.log("Falling");
            this.falling = true;
            this.blockPos = new Vec(this.blockPos.x, this.blockPos.y + 1);
        }
    }
}

var initWorld = function () {

    world = transpose(world);

    for (var x = 0; x < world.length; x++) {
        for (var y = 0; y < world.length; y++) {

            if (world[x][y] == 2) {
                player = new Player(new Vec(x, y));
                world[x][y] = 0;
            } else if (world[x][y] == 3) {
                rocks.push(new Rock(new Vec(x, y)));
                world[x][y] = 0;
                
            }
        }
    }
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
            if(rock.falling){
                if (player.pos.x + dx == rock.blockPos.x && player.pos.y + dy == rock.blockPos.y ||
                    player.pos.x + dx == rock.blockPos.x && player.pos.y + dy == rock.blockPos.y-1) {
                        success = false;
                }
            }else
            if (player.pos.x + dx == rock.blockPos.x && player.pos.y + dy == rock.blockPos.y) {
                if (dy == -1 || !rock.moveRock(dx, dy))
                    success = false;
            }
        });

    }
    if (!success)
        return;
    console.log("Moving");
    player.pos.x += dx;
    player.pos.y += dy;
}

var addEvents = function () {
    window.addEventListener("resize", function (e) {
        console.log("RESIZE");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    document.onkeydown = function (e) {

        e = e || window.event;

        if (e.keyCode == '38') {
            console.log("UP ARROW");
            movePlayer(0, -1);
        } else if (e.keyCode == '40') {
            console.log("DOWN ARROW");
            movePlayer(0, +1);
        } else if (e.keyCode == '37') {
            console.log("LEFT ARROW");
            movePlayer(-1, 0);
        } else if (e.keyCode == '39') {
            console.log("RIGHT ARROW");
            movePlayer(1, 0);

        }
    };
};

var update = function () {

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
        for (var y = 0; y < world.length; y++) {

            // Walls
            if (world[x][y] == 1) {
                context.fillStyle = "#FF0000";
            } else {
                context.fillStyle = "#00FFFF";
            }

            context.fillRect(x * scale, y * scale, scale, scale);
            context.stroke();
        }
    }

    // Draw Player
    context.fillStyle = "#0000FF";
    context.fillRect(player.pos.x * scale, player.pos.y * scale, scale, scale);
    context.stroke();

    // Draw Rocks
    context.fillStyle = "#FFFF00";
    rocks.forEach(function (rock) {
        context.fillRect(rock.pos.x * scale, rock.pos.y * scale, scale, scale);
        context.stroke();
    });

};