const Block = {
    AIR: 0,
    WALL: 1,
    PLAYER: 2,
    ROCK: 3
};

const Direc = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    NONE: 4
};

var updateAnimaiton = function (movable) {
    // Basic animaiton
    if (movable.pos.x < movable.blockPos.x) {
        movable.moving = true;
        movable.pos.x += gravity;
        movable.pos.x = Math.round(movable.pos.x * 100) / 100
        return;
    } else if (movable.pos.x > movable.blockPos.x) {
        movable.moving = true;
        movable.pos.x -= gravity;
        movable.pos.x = Math.round(movable.pos.x * 100) / 100
        return;
    } else if (movable.pos.y < movable.blockPos.y) {
        movable.moving = true;
        movable.pos.y += gravity;
        movable.pos.y = Math.round(movable.pos.y * 100) / 100
        return;
    } else if (movable.pos.y > movable.blockPos.y) {
        movable.moving = true;
        movable.pos.y -= gravity;
        movable.pos.y = Math.round(movable.pos.y * 100) / 100
        return;
    } else {
        movable.moving = false;
    }
}

var Vec = function (x, y) {
    this.x = x;
    this.y = y;
};

function Player(pos, look) {
    this.blockPos = pos;
    this.pos = new Vec(this.blockPos.x, this.blockPos.y);
    this.looking = look;
    this.moving = false;
    this.move = function (dx, dy) {

        if (this.moving)
            return;

        var success = true;

        // When requested position is wall return
        if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.WALL)
            return;
        else {
            // Check if requested position is rock
            var playerblockpos = this.blockPos;
            rocks.forEach(function (rock) {
                if (rock.falling) {
                    if (playerblockpos.x + dx == rock.blockPos.x && playerblockpos.y + dy == rock.blockPos.y ||
                        playerblockpos.x + dx == rock.blockPos.x && playerblockpos.y + dy == rock.blockPos.y - 1) {
                        success = false;
                        // Death when moving up an falling obj
                        if (dy == -1)
                            reloadLevel();
                    }
                } else
                if (playerblockpos.x + dx == rock.blockPos.x && playerblockpos.y + dy == rock.blockPos.y) {
                    if (dy == -1 || !rock.moveRock(dx, dy))
                        success = false;
                }
            });

        }
        if (!success)
            return;

        this.blockPos.x += dx;
        this.blockPos.y += dy;

        if (dx == 1 && dy == 0)
            player.looking = Direc.RIGHT;
        else if (dx == -1 && dy == 0)
            player.looking = Direc.LEFT;

        else if (dx == 0 && dy == 1)
            player.looking = Direc.DOWN;
        else if (dx == 0 && dy == -1)
            player.looking = Direc.UP;

    }

    this.update = function () {

        updateAnimaiton(this);
    }

}

function Rock(pos) {
    this.blockPos = pos;
    this.pos = new Vec(pos.x, pos.y);
    this.moving = false;
    this.moveRock = function (dx, dy) {

        if (this.moving)
            return;

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
        //this.pos = this.blockPos;
        return true;
    }

    this.update = function () {

        if (isAir(this.blockPos.x, this.blockPos.y + 1)) {
            this.blockPos = new Vec(this.blockPos.x, this.blockPos.y + 1);
        }

        updateAnimaiton(this);

        // If rock is on other rock -> slip to side if possible
        if (isRock(this.blockPos.x, this.blockPos.y + 1)) {
            // If Right and below Is air
            if (isAir(this.blockPos.x + 1, this.blockPos.y) &&
                isAir(this.blockPos.x + 1, this.blockPos.y + 1)) {
                this.moveRock(1, 0);

                // If Left and below Is air
            } else if (isAir(this.blockPos.x - 1, this.blockPos.y) &&
                isAir(this.blockPos.x - 1, this.blockPos.y + 1)) {
                this.moveRock(-1, 0);
            }
        }



    }
}