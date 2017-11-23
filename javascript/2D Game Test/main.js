var canvas = document.getElementById("screen");
var context = null;
const scale = 75;

var rocks = new Array();

var player = null;

// 1 = Solid blocks
// 2 = Player
// 3 = Crates
// 4 = Exit
var world = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 3, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 3, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 4, 1],
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
    return new Vec(pos.x | 0, pos.y | 0);
}

function round(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

var isPlayer = function (x, y) {
    return x == player.pos.x && y == player.pos.y;
}

function transpose(a) {
    
      // Calculate the width and height of the Array
      var w = a.length || 0;
      var h = a[0] instanceof Array ? a[0].length : 0;
    
      // In case it is a zero matrix, no transpose routine needed.
      if(h === 0 || w === 0) { return []; }
    
      /**
       * @var {Number} i Counter
       * @var {Number} j Counter
       * @var {Array} t Transposed data is stored in this array.
       */
      var i, j, t = [];
    
      // Loop through every item in the outer array (height)
      for(i=0; i<h; i++) {
    
        // Insert a new row (array)
        t[i] = [];
    
        // Loop through every item per item in outer array (width)
        for(j=0; j<w; j++) {
    
          // Save transposed data.
          t[i][j] = a[j][i];
        }
      }
    
      return t;
    }
    

function Rock(pos) {
    this.blockPos = pos;
    this.pos = new Vec(pos.x, pos.y);
    this.update = function () {
        var succ = true;
        if (world[this.blockPos.x][this.blockPos.y + 1] == 0 && !isPlayer(this.blockPos.x, this.blockPos.y + 1)) {
            var tmp_pos = this.pos;
            rocks.forEach(function (r) {
                if (tmp_pos.x == r.pos.x && tmp_pos.y + 1 == r.pos.y) {
                    succ = false;
                }
            });
            if (succ) {
                this.pos.y += 0.1;
                this.pos.y = round(this.pos.y);
            }

        }
        this.blockPos = toBlockPos(this.pos);
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

var moveRock = function (rock, dx, dy) {
    var succ = true;
    if (world[rock.pos.x + dx][rock.pos.y + dy] == 1)
        return false;

    rocks.forEach(function (r) {
        if (rock.pos.x + dx == r.pos.x && rock.pos.y + dy == r.pos.y) {
            succ = false;
        }
    });

    if (!succ)
        return false;

    rock.pos.x += dx;
    rock.pos.y += dy;
    return true;
}

var movePlayer = function (dx, dy) {
    var success = true;
    if (world[player.pos.x + dx][player.pos.y + dy] == 1)
        return;
    else {
        rocks.forEach(function (rock) {
            if (player.pos.x + dx == rock.pos.x && player.pos.y + dy == rock.pos.y) {
                if (dy == -1 || !moveRock(rock, dx, dy))
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