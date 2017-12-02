var paintID = 0;
var scale = 64;
var xsize = 20;
var ysize = 20;

var world = [];
var context = null;
var canvas = null;

var Vec = function (x, y) {
    this.x = x;
    this.y = y;
};

var tex = new TexturesBundle();


const Block = {
    AIR: 0,
    WALL: 1,
    PLAYER: 2,
    DUMPSTER: 3,
    TRASH: 4,
    DIRT: 5,
    EXIT: 6,
    STEEL_WALL: 7,
    MONSTER: 8
};

var loadEditor = function (txt) {
    world = [];

    xsize = txt.split("X")[0].length;
    ysize = txt.split("X").length;

    var ind = 0;
    for (var i = 0; i < txt.length; i++) {
        if (txt.charAt(i) != "X") {
            world[ind++] = txt.charAt(i);
        }

    }
    canvas.width = scale * xsize;
    canvas.height = scale * ysize;
    console.log(xsize + " - " + ysize);
}


var main = function () {



    // Change block
    tex.load("../img/");
    $('img').click(function (e) {

        if (e.target.id == "10x10") {
            loadEditor("1111111111X1255555551X1555545551X1555555551X1555555551X1555555551X1555555551X1555555551X1555555561X1111111111");
        } else if (e.target.id == "20x20") {
            loadEditor("11111111111111111111X12555555555455555561X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X11111111111111111111");
        } else if (e.target.id == "save") {
            var lvl = "";

            for (var x = 0; x < xsize; x++) {
                for (var y = 0; y < ysize; y++) {
                    if (world[x * xsize + y] != undefined)
                        lvl += "" + world[x * xsize + y];
                }
                lvl += "X";

            }

            lvl = lvl.substring(0, lvl.length - 1);
            window.location.href = "../?data=" + lvl;
        } else
            paintID = e.target.id;
    });


    canvas = document.getElementById("screen");
    canvas.width = scale * ysize;
    canvas.height = scale * xsize;

    context = canvas.getContext("2d");

    // Load form file into world matrix
    if (levelString != "")
        loadEditor(levelString);

    canvas.addEventListener('mousedown', function (event) {

        if (paintID == Block.PLAYER) {
            for (var i = 0; i < world.length; i++) {
                if (world[i] == Block.PLAYER)
                    world[i] = Block.AIR;
            }
        } else if (paintID == Block.EXIT) {
            for (var i = 0; i < world.length; i++) {
                if (world[i] == Block.EXIT)
                    world[i] = Block.AIR;
            }
        }

        world[
            Math.floor(event.offsetX / scale) * ysize +
            Math.floor(event.offsetY / scale)] = paintID;



    }, false);

    loop();

};


var loop = function () {
    draw();
    requestAnimationFrame(loop);
}

var draw = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var x = 0; x < xsize; x++) {
        for (var y = 0; y < ysize; y++) {

            if (world[x * ysize + y] == Block.AIR) {
                context.drawImage(tex.air, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.WALL) {
                context.drawImage(tex.wall, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.STEEL_WALL) {
                context.drawImage(tex.steel_wall, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.DUMPSTER) {
                context.drawImage(tex.dumpster1, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.DIRT) {
                context.drawImage(tex.dirt, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.PLAYER) {
                context.drawImage(tex.player_neutral, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.TRASH) {
                context.drawImage(tex.trash13, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.EXIT) {
                context.drawImage(tex.exit_open, x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.MONSTER) {
                context.drawImage(tex.silver_monster, x * scale, y * scale, scale, scale);
                context.stroke();

            }

        }
    }
}