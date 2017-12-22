
var isFallable = function (x, y) {
    var succ = false;
    fallables.forEach(function (f) {
        if (x == f.blockPos.x && y == f.blockPos.y) {
            succ = true;
        }
    });
    return succ;
}


var isTrash = function (x, y) {
    var succ = false;
    fallables.forEach(function (f) {
        if (x == f.blockPos.x && y == f.blockPos.y && f.type == Block.TRASH) {
            succ = true;
        }
    });
    return succ;
}

var isMonster = function (x, y) {
    var succ = false;
    monsters.forEach(function (f) {
        if (x == f.blockPos.x && y == f.blockPos.y) {
            succ = true;
        }
    });
    return succ;
}

var isCollectable = function (x, y) {
   var fallable = getFallable(x,y);

    return fallable != null && (fallable.type == Block.TRASH || fallable.type == Block.BOMB);
}

var getFallable = function (x, y) {
    var result = null;
    fallables.forEach(function (f) {
        if (x == f.blockPos.x && y == f.blockPos.y) {
            result = f;
        }
    });
    return result;
}

var getTrash = function (x, y) {
    var result = null;
    fallables.forEach(function (f) {
        if (x == f.blockPos.x && y == f.blockPos.y && f.type == Block.TRASH) {
            result = f;
        }
    });
    return result;
}

var getMonster = function (x, y) {
    var result = null;
    monsters.forEach(function (f) {
        if (x == f.blockPos.x && y == f.blockPos.y) {
            result = f;
        }
    });
    return result;
}


var isPlayer = function (x, y) {
    return player.blockPos.x == x && player.blockPos.y == y;
}

var isWall = function (x, y) {
    return world[x][y] == Block.WALL || world[x][y] == Block.STEEL_WALL || isBreakable(x,y);
}

var isBreakable = function(x,y){
    return  world[x][y] == Block.SEWER || world[x][y] == Block.BLUE_WALL || world[x][y] == Block.WALL_ORGANIC;
}

var isExit = function (x, y) {
    return exit.pos.x == x && exit.pos.y == y;
}

var isAir = function (x, y) {
    return world[x][y] == Block.AIR && !isFallable(x, y)  && !isExit(x, y) && !isMonster(x, y) && !isPlayer(x, y) && world[x][y] != Block.BOMB;
}