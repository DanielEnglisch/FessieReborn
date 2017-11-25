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
            return false;
        } else if (this.pos.x > this.blockPos.x) {
            this.moving = true;
            this.pos.x -= gravity;
            this.pos.x = Math.round(this.pos.x * 100) / 100
            return false;
        } else if (this.pos.y < this.blockPos.y) {
            this.moving = true;
            this.pos.y += gravity;
            this.pos.y = Math.round(this.pos.y * 100) / 100
            return false;
        } else if (this.pos.y > this.blockPos.y) {
            this.moving = true;
            this.pos.y -= gravity;
            this.pos.y = Math.round(this.pos.y * 100) / 100
            return false;
        } else {
            this.moving = false;
            return true;
        }
    };
};

inherits(Player, GameObject);

function Player(pos) {
    Player.super_.call(this, pos, Block.PLAYER);
    this.looking = Direc.NONE;
    this.move = function (dx, dy) {

        // Can't move when already moving
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
                // When fallable is falling
                if (Fallable.falling) {
                    if (playerblockpos.x + dx == f.blockPos.x && playerblockpos.y + dy == f.blockPos.y ||
                        playerblockpos.x + dx == f.blockPos.x && playerblockpos.y + dy == f.blockPos.y - 1) {
                        success = false;
                    }
                } else
                    // Try to move fallable
                    if (playerblockpos.x + dx == f.blockPos.x && playerblockpos.y + dy == f.blockPos.y) {
                        if (f.type == Block.TRASH) {
                            // TODO: Collect
                            console.log("Collected resting trash");
                        } else
                            // Try to move fallable
                            if (dy == -1 || !f.move(dx, dy))
                                success = false;
                    }
            });

        }

        if (!success)
            return;

        // Move player
        this.blockPos.x += dx;
        this.blockPos.y += dy;

        // Adjust look direction
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

        if(player.pos.x * scale + xOffset > window.innerWidth/2 + 1*scale){
            xOffset -= gravity*scale;
            xOffset = Math.round(xOffset);        
        }  if(player.pos.x * scale + xOffset < window.innerWidth/2 - 1*scale){
            xOffset += gravity*scale;
            xOffset = Math.round(xOffset);        
        }  if(player.pos.y * scale + yOffset > window.innerHeight/2 + 1*scale){
            yOffset -= gravity*scale;
            yOffset = Math.round(yOffset);        
        } if(player.pos.y * scale + yOffset < window.innerHeight/2 - 1*scale){
            yOffset += gravity*scale;
            yOffset = Math.round(yOffset);        
        }

        this.updateAnimaiton();
       
        
    }

    this.draw = function (context) {
        switch (this.looking) {
            case Direc.UP:
                context.drawImage(tex.player_up, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
            case Direc.DOWN:
                context.drawImage(tex.player_down, this.pos.x * scale+ xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
            case Direc.LEFT:
                context.drawImage(tex.player_left, this.pos.x * scale+ xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
            case Direc.RIGHT:
                context.drawImage(tex.player_right, this.pos.x * scale+ xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
            default:
                context.drawImage(tex.player_neutral, this.pos.x * scale+ xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
        }
        context.stroke();
    }

    this.kill = function () {
        alert("You died!");
        reloadLevel();
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
    
    this.isFalling = false;
    this.wasFalling = false;

    this.update = function () {
        if (!this.updateAnimaiton()){
            return;
        }

        if(this.isFalling){
            this.isFalling = false;
            if (isPlayer(this.blockPos.x, this.blockPos.y + 1)) {
                player.kill();
            }
        }

        // If Fallable is on other Fallable -> slip to side if possible
        if (
            isFallable(this.blockPos.x, this.blockPos.y + 1)
        ) {
            // If Right and right below Is air
            if (
                isAir(this.blockPos.x + 1, this.blockPos.y) &&
                isAir(this.blockPos.x + 1, this.blockPos.y + 1)
                ) {
                if(!belowCanSlip(this))
                    this.move(+1, 0);
                
            // If Left and left  below Is air
            } else if (
                isAir(this.blockPos.x - 1, this.blockPos.y) &&
                isAir(this.blockPos.x - 1, this.blockPos.y + 1)
            ) {
            if(!belowCanSlip(this))                
                this.move(-1, 0);
            }
        } else if (isAir(this.blockPos.x, this.blockPos.y + 1)) {
            this.blockPos = new Vec(this.blockPos.x, this.blockPos.y + 1);
            this.isFalling = true;
        }
    }
}

var belowCanSlip = function(fallable){
    var below = getFallable(fallable.blockPos.x, fallable.blockPos.y +1);
    if (
        isAir(below.blockPos.x + 1, below.blockPos.y) &&
        isAir(below.blockPos.x + 1, below.blockPos.y + 1)
        ) {
return true;        
    // If Left and left  below Is air
    } else if (
        isAir(below.blockPos.x - 1, below.blockPos.y) &&
        isAir(below.blockPos.x - 1, below.blockPos.y + 1)
    ) {
return true;    }
}


inherits(Dumpster, Fallable);

function Dumpster(pos) {
    Dumpster.super_.call(this, pos, Block.DUMPSTER);
    this.draw = function (context) {
        context.drawImage(tex.dumpster, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
        context.stroke();
    }
}

inherits(Trash, Fallable);

function Trash(pos) {
    Trash.super_.call(this, pos, Block.TRASH);
    this.draw = function (context) {
        context.drawImage(tex.trash, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
        context.stroke();
    }
}