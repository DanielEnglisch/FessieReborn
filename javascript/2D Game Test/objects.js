var Vec = function (x, y) {
    this.x = x;
    this.y = y;
};

function Player(pos) {
    this.pos = pos;
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

        // If rock is on other rock -> slip to side if possible
        if (!this.falling && isRock(this.blockPos.x, this.blockPos.y + 1)) {
            // If Right and below Is air
            if (isAir(this.blockPos.x + 1, this.blockPos.y) &&
                isAir(this.blockPos.x + 1, this.blockPos.y + 1)) {
                this.moveRock(1,0);

            // If Left and below Is air
            } else if (isAir(this.blockPos.x - 1, this.blockPos.y) &&
                       isAir(this.blockPos.x - 1, this.blockPos.y + 1)) {
                this.moveRock(-1,0);
            }
        }

        // If falling and not at end position
        if (this.falling && this.pos.y < this.blockPos.y) {
            this.pos.y += 0.1;
            this.pos.y = Math.round(this.pos.y * 100) / 100
        } else if (this.pos.y == this.blockPos.y) {
            this.falling = false;
            if(isPlayer(this.blockPos.x, this.blockPos.y+1)){
                //Death
                reloadLevel();
            }
        }

        if (!this.falling && isAir(this.blockPos.x, this.blockPos.y + 1)) {
            console.log("Falling");
            this.falling = true;
            this.blockPos = new Vec(this.blockPos.x, this.blockPos.y + 1);
        }
    }
}