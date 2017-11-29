var paintID = 0;
var scale = 64;
var size =10;

var world = [];
var context = null;
var canvas = null;



var tex = new TexturesBundle();


const Block = {
    AIR: 0,
    WALL: 1,
    PLAYER: 2,
    DUMPSTER: 3,
    TRASH: 4,
    DIRT: 5,
    EXIT: 6,
    STEEL_WALL: 7
};


var main = function () {

   


    // Load form file into world matrix
    var txt = levelString;
    
    var ind = 0;
    size = txt.split("X")[0].length;
    for(var i = 0; i < txt.length; i++){
        if(txt.charAt(i) != "X"){
            world[ind++] = txt.charAt(i);
        }
        console.log(txt.charAt(i));
        
    }
    //console.log(txt);

    tex.load("../img/");
    $('img').click(function (e) {
        paintID = e.target.id;
    });

    $('#gamelink').click(function (e) {
        var lvl = "";
        
                for (var x = 0; x < size; x++) {
                    for (var y = 0; y < size; y++) {
                        if(world[x * size + y] != undefined)
                            lvl += "" + world[x * size + y];
                    }
                    lvl += "X";
        
                }
        
                window.location.href = "../?lvl=" + lvl;
    });


    canvas = document.getElementById("screen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context = canvas.getContext("2d");

    canvas.addEventListener('mousedown', function (event) {
        world[
            Math.floor(event.offsetX / scale) * size +
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

    for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {

            if (world[x * size + y] == Block.AIR) {
                context.drawImage(tex.air, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * size + y] == Block.WALL) {
                context.drawImage(tex.wall, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * size + y] == Block.STEEL_WALL) {
                context.drawImage(tex.steel_wall, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * size + y] == Block.DUMPSTER) {
                context.drawImage(tex.dumpster1, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * size + y] == Block.DIRT) {
                context.drawImage(tex.dirt, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * size + y] == Block.PLAYER) {
                context.drawImage(tex.player_neutral, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * size + y] == Block.TRASH) {
                context.drawImage(tex.trash1, x * scale, y * scale, scale, scale);
                context.stroke();

            } else if (world[x * size + y] == Block.EXIT) {
                context.drawImage(tex.exit_open, x * scale, y * scale, scale, scale);
                context.stroke();

            }

        }
    }
}