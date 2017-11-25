var currentLevel = null;

var reloadLevel = function () {
    loadLevel(currentLevel);
}

var loadLevel = function (file) {
    // Reset everything:
    currentLevel = file;
    world = [];
    player = null;
    fallables = [];
    keys = [];
    // Load form file into world matrix
    var txt = readTextFile(file);
    var rows = txt.split('\n');
    var numcol = 0;
    for (var x = 0; x < rows.length - 1; x++) {
        var lineArr = [];
        for (var y = 0; y < rows[x].length - 1; y++) {
            lineArr[y] = rows[x].charAt(y);
            numcol = rows[x].length;
        }
        world[x] = lineArr;
        numcol++;
    }
    console.log("Loaded level with size " + numcol + "x" + rows.length);

    world = transpose(world);

    // Exctracting Game Objects from matrix
    for (var x = 0; x < world.length; x++) {
        for (var y = 0; y < world[0].length; y++) {
            
            if (world[x][y] == Block.PLAYER) {
                console.log("added player!");                
                player = new Player(new Vec(x, y), Direc.NONE);
                world[x][y] = 0;
            } else if (world[x][y] == Block.DUMPSTER) {
                console.log("added dumoster!");                
                fallables.push(new Dumpster(new Vec(x, y)));
                world[x][y] = 0;
            } else if (world[x][y] == Block.TRASH) {
                console.log("added trash!");
                fallables.push(new Trash(new Vec(x, y)));
                world[x][y] = 0;
            }else{
                console.log("No GameObj: " + world[x][y]);
            }
        }
    }

}