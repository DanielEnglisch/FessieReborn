var reloadLevel = function () {
    loadLevel();
}

var loadLevel = function () {
    // Reset everything:

    timeOuts.forEach(function(t){
        clearTimeout(t);
    });

    world = [];
    player = null;
    fallables = [];
    keys = [];
    items_left = 0;
    score = 0;
    exit = null;
    monsters = [];
    num_bombs = 0;
    explosion_overlays = [];
    

    // Load form file into world matrix
    var txt = levelString;
    var rows = txt.split('X');
    var numcol = 0;
    for (var x = 0; x < rows.length; x++) {
        var lineArr = [];
        for (var y = 0; y < rows[x].length; y++) {
            lineArr[y] = rows[x].charAt(y);
            numcol = rows[x].length;
        }
        world[x] = lineArr;
        numcol++;
    }
    console.log("Loaded level with size " + (numcol - 1) + "x" + rows.length);

    // Exctracting Game Objects from matrix
    for (var x = 0; x < world.length; x++) {
        for (var y = 0; y < world[0].length; y++) {

            if (world[x][y] == Block.PLAYER) {

                player = new Player(new Vec(x, y), Direc.NONE);
                refreshOffset();

                world[x][y] = 0;
            } else if (world[x][y] == Block.DUMPSTER) {

                fallables.push(new Dumpster(new Vec(x, y)));
                world[x][y] = 0;
            } else if (world[x][y] == Block.TRASH) {
                fallables.push(new Trash(new Vec(x, y)));
                world[x][y] = 0;
                items_left++;
            } else if (world[x][y] == Block.EXIT) {
                exit = new Exit(new Vec(x, y));
            } else if (world[x][y] == Block.SILVER_MONSTER) {
                monsters.push(new SilverMonster(new Vec(x, y)));
                world[x][y] = 0;
            } else if (world[x][y] == Block.SLIME_MONSTER) {
                monsters.push(new SlimeMonster(new Vec(x, y)));
                world[x][y] = 0;
            } else if (world[x][y] == Block.TRASH_MONSTER) {
                monsters.push(new TrashMonster(new Vec(x, y)));
                world[x][y] = 0;
            } else if (world[x][y] == Block.BOMB) {

                fallables.push(new Bomb(new Vec(x, y)));
                world[x][y] = 0;
            }
        }
    }

    // Check if exit and play was set
    if (!player || !exit) {
        alert("World is missing an exit or a player!");
        throw new Error("World is missing an exit or a player!");
    }

    // Check if there is 0 trash
    if (items_left == 0)
        exit.open();


}