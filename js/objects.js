const Block = {
    AIR: 0,
    WALL: 1,
    PLAYER: 2,
    DUMPSTER: 3,
    TRASH: 4,
};

const Direc = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    NONE: 4
};

var Vec = function (x, y) {
    this.x = x;
    this.y = y;
};

var GameObject = function (position, type) {
    this.blockPos = position;
    this.type = type;
    this.moving = false;
    this.pos = new Vec(position.x, position.y);
    this.updateAnimaiton = function () {
        // Basic animaiton
        if (this.pos.x < this.blockPos.x) {
            this.moving = true;
            this.pos.x += gravity;
            this.pos.x = Math.round(this.pos.x * 100) / 100
            return;
        } else if (this.pos.x > this.blockPos.x) {
            this.moving = true;
            this.pos.x -= gravity;
            this.pos.x = Math.round(this.pos.x * 100) / 100
            return;
        } else if (this.pos.y < this.blockPos.y) {
            this.moving = true;
            this.pos.y += gravity;
            this.pos.y = Math.round(this.pos.y * 100) / 100
            return;
        } else if (this.pos.y > this.blockPos.y) {
            this.moving = true;
            this.pos.y -= gravity;
            this.pos.y = Math.round(this.pos.y * 100) / 100
            return;
        } else {
            this.moving = false;
        }
    };
};

inherits(Player, GameObject);

function Player(pos) {
    Player.super_.call(this, pos, Block.PLAYER);
    this.looking = Direc.NONE;
    this.move = function (dx, dy) {

        if (this.moving)
            return;

        var success = true;

        // When requested position is wall return
        if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.WALL)
            return;
        else {
            // Check if requested position is Fallable
            var playerblockpos = this.blockPos;
            fallables.forEach(function (f) {
                if (Fallable.falling) {
                    if (playerblockpos.x + dx == f.blockPos.x && playerblockpos.y + dy == f.blockPos.y ||
                        playerblockpos.x + dx == f.blockPos.x && playerblockpos.y + dy == f.blockPos.y - 1) {
                        success = false;
                        // Death when moving up an falling obj
                        if (dy == -1)
                            reloadLevel();
                    }
                } else
                if (playerblockpos.x + dx == f.blockPos.x && playerblockpos.y + dy == f.blockPos.y) {
                    if (dy == -1 || !f.move(dx, dy))
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
        this.updateAnimaiton();
    }

    this.draw = function(context){
    switch (this.looking) {
        case Direc.UP:
            context.drawImage(tex.player_up, this.pos.x * scale, this.pos.y * scale, scale, scale);
            break;
        case Direc.DOWN:
            context.drawImage(tex.player_down, this.pos.x * scale, this.pos.y * scale, scale, scale);
            break;
        case Direc.LEFT:
            context.drawImage(tex.player_left, this.pos.x * scale, this.pos.y * scale, scale, scale);
            break;
        case Direc.RIGHT:
            context.drawImage(tex.player_right, this.pos.x * scale, this.pos.y * scale, scale, scale);
            break;
        default:
            context.drawImage(tex.player_neutral, this.pos.x * scale, this.pos.y * scale, scale, scale);
            break;
    }
    context.stroke();
    }

}

inherits(Fallable, GameObject);

function Fallable(pos, type) {
    Fallable.super_.call(this, pos, type);

    this.move = function (dx, dy) {

        // Can't move when it's already moving
        if (this.moving)
            return;

        var succ = true;

        // When requested position is wall return
        if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.WALL)
            return false;
        // Check if requested position is Fallable
        var myBlockPos = this.blockPos;
        fallables.forEach(function (r) {
            if (myBlockPos.x + dx == r.blockPos.x && myBlockPos.y + dy == r.blockPos.y) {
                succ = false;
            }
        });

        if (!succ)
            return false;

        this.blockPos.x += dx;
        this.blockPos.y += dy;

        return true;
    }

    this.update = function () {
        this.updateAnimaiton();

        if (isAir(this.blockPos.x, this.blockPos.y + 1)) {
            this.blockPos = new Vec(this.blockPos.x, this.blockPos.y + 1);
        }

        // If Fallable is on other Fallable -> slip to side if possible
        if (isFallable(this.blockPos.x, this.blockPos.y + 1)) {
            // If Right and below Is air
            if (isAir(this.blockPos.x + 1, this.blockPos.y) &&
                isAir(this.blockPos.x + 1, this.blockPos.y + 1)) {
                this.move(1, 0);

                // If Left and below Is air
            } else if (isAir(this.blockPos.x - 1, this.blockPos.y) &&
                isAir(this.blockPos.x - 1, this.blockPos.y + 1)) {
                this.move(-1, 0);
            }
        }
    }
}

inherits(Dumpster, Fallable);
function Dumpster(pos) {
    Dumpster.super_.call(this, pos, Block.DUMPSTER);
    this.draw = function(context){
        context.drawImage(tex.dumpster, this.pos.x * scale, this.pos.y * scale, scale, scale);
        context.stroke();
    }
}