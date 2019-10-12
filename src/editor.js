//require ./enums.js
//require ./utils.js
//require ./textureLoader.js

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

var getData = function () {
    var lvl = "";

    for (var x = 0; x < xsize; x++) {
        for (var y = 0; y < ysize; y++) {
            if (world[x * xsize + y] != undefined)
                lvl += "" + world[x * xsize + y];
        }
        lvl += "X";

    }

    lvl = lvl.substring(0, lvl.length - 1);
    return lvl;
}

var main = function () {



    // Change block
    tex.load("../img/", function(){});
    $('img').click(function (e) {

        if (e.target.id == "10x10") {
            loadEditor("1111111111X1255555551X1555545551X1555555551X1555555551X1555555551X1555555551X1555555551X1555555561X1111111111");
        } else if (e.target.id == "20x20") {
            loadEditor("11111111111111111111X12555555555455555561X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X15555555555555555551X11111111111111111111");
        } else if (e.target.id == "test") {

            window.location.href = "../?data=" + getData();
        } else if (e.target.id == "export") {

            alert(location.protocol + '//' + location.host + location.pathname+ "../?data=" + getData());
        } else {
            paintID = e.target.id;
            $('img').css('border', 'none');
            e.target.style.border = "3px solid rgb(248, 132, 0)";
        }

    });


    canvas = document.getElementById("screen");
    canvas.width = scale * ysize;
    canvas.height = scale * xsize;

    context = canvas.getContext("2d");

    // Load form file into world matrix
    if (levelString != "")
        loadEditor(levelString);
		else
			// Load 10x10
		            loadEditor("1111111111X1255555551X1555545551X1555555551X1555555551X1555555551X1555555551X1555555551X1555555561X1111111111");


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
                context.drawImage(tex.dumpster.images[0], x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.DIRT) {
                context.drawImage(tex.dirt, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.PLAYER) {
                context.drawImage(tex.fessie_neutral, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.TRASH) {
                context.drawImage(tex.trash.images[6], x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.TOXIC_TRASH) {
                context.drawImage(tex.toxic_trash.images[3], x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.EXIT) {
                context.drawImage(tex.exit_open, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * ysize + y] == Block.SILVER_MONSTER) {
                context.drawImage(tex.silver_monster_anim.getImage(), x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.BLUE_WALL) {
                context.drawImage(tex.blue_wall, x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.SEWER) {
                context.drawImage(tex.sewer, x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.BOMB) {
                context.drawImage(tex.bomb, x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.WALL_ORGANIC) {
                context.drawImage(tex.wall_organic, x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.TRASH_MONSTER) {
                context.drawImage(tex.trash_monster_center.getImage(), x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.SLIME_MONSTER) {
                context.drawImage(tex.slime_monster_center.getImage(), x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.FORCE_FIELD) {
                context.drawImage(tex.force_field.getImage(), x * scale, y * scale, scale, scale);
                context.stroke();

            }else if (world[x * ysize + y] == Block.FIRE_ORB) {
                context.drawImage(tex.fire_orb.getImage(), x * scale, y * scale, scale, scale);
                context.stroke();

            }

        }
    }
}