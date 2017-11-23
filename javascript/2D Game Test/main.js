var canvas = document.getElementById("screen");
var context = null;


var Vec = function(x, y) {
    this.x = x;
    this.y = y;
};

function Player (pos) {
    this.pos = pos;
}

var toBlockPos = function(pos){
    return new Vec(pos.x | 0, pos.y | 0);
}

function round(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function Rock (pos) {
    this.blockPos = pos;
    this.pos = new Vec(pos.x,pos.y);
    this.update = function(){
        if(world[this.blockPos.x][this.blockPos.y +1 ] == 0){
            this.pos.y+=0.1;
            this.pos.y =  round(this.pos.y);
        }
        this.blockPos = toBlockPos(this.pos);    
    }
}

var player = new Player(new Vec(1,1));
var rock = new Rock(new Vec(3,3));

var world = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var main = function () {
    addEvents();
    initCanvas();
    loop();
};

var loop = function () {
    update();
    redraw();
    requestAnimationFrame(loop);
}

var moveRock = function(dx,dy){
    if(world[rock.pos.x + dx][rock.pos.y +dy] == 1)
        return false;
    rock.pos.x+=dx;
    rock.pos.y+=dy;
    return true;
}


var movePlayer = function(dx,dy){

    if(world[player.pos.x + dx][player.pos.y +dy] == 1)
        return;
    else if(player.pos.x +dx == rock.pos.x && player.pos.y + dy == rock.pos.y){
        if(!moveRock(dx,dy))
            return;
    }
    
    player.pos.x+=dx;
    player.pos.y+=dy;
    
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
            movePlayer(0,-1);
        } else if (e.keyCode == '40') {
            console.log("DOWN ARROW");
            movePlayer(0,+1);
        } else if (e.keyCode == '37') {
            console.log("LEFT ARROW");
            movePlayer(-1,0);
        } else if (e.keyCode == '39') {
            console.log("RIGHT ARROW");
            movePlayer(1,0);
            
        }
    };
};

var update = function () {
    rock.update();
};

var initCanvas = function () {
    var canvas = document.getElementById("screen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    context.font = "15px Arial";
};

const scale = 75;

var redraw = function () {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var y = 0; y < world.length; y++) {
        for (var x = 0; x < world.length; x++) {

            if (world[x][y] == 1) {
                context.fillStyle = "#FF0000";
            } else if (world[x][y] == 0) {
                context.fillStyle = "#00FFFF";
            } else
                context.fillStyle = "#FF00FF";

            context.fillRect(x * scale, y * scale, scale, scale);
            context.stroke();
        }
    }

    // Draw Player
    context.fillStyle = "#0000FF";
    context.fillRect(player.pos.x * scale, player.pos.y* scale, scale, scale);
    context.stroke();

    // Draw Rocks
    context.fillStyle = "#FFFF00";
    context.fillRect(rock.pos.x * scale, rock.pos.y* scale, scale, scale);
    context.stroke();
};