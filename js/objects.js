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
    this.updateAnimaiton = function (speed) {
        // Basic animaiton
        if (this.pos.x + movementSpeed < this.blockPos.x) {
            this.moving = true;
            this.pos.x += movementSpeed;
            this.pos.x = Math.round(this.pos.x * 100) / 100
            return false;
        } else if (this.pos.x - movementSpeed > this.blockPos.x) {
            this.moving = true;
            this.pos.x -= movementSpeed;
            this.pos.x = Math.round(this.pos.x * 100) / 100
            return false;
        } else if (this.pos.y + speed < this.blockPos.y) {
            this.moving = true;
            this.pos.y += speed;
            this.pos.y = Math.round(this.pos.y * 100) / 100
            return false;
        } else if (this.pos.y - speed > this.blockPos.y) {
            this.moving = true;
            this.pos.y -= speed;
            this.pos.y = Math.round(this.pos.y * 100) / 100
            return false;
        } else {
            this.pos.x = this.blockPos.x;
            this.pos.y = this.blockPos.y;
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

        // Adjust look direction
        if (dx == 1 && dy == 0)
        player.looking = Direc.RIGHT;
    else if (dx == -1 && dy == 0)
        player.looking = Direc.LEFT;

    else if (dx == 0 && dy == 1)
        player.looking = Direc.DOWN;
    else if (dx == 0 && dy == -1)
        player.looking = Direc.UP;

        // Can't move when already moving
        if (this.moving)
            return;

        var success = true;

        // When requested position is wall return
        if (isWall(this.blockPos.x + dx,this.blockPos.y + dy))
            return;
        // Walk on dirt
        else if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.DIRT){
         world[this.blockPos.x + dx][this.blockPos.y + dy] = 0;
         playDirt();
        } else if (isExit(this.blockPos.x + dx,this.blockPos.y + dy)){
                // TODO: Exit logic
                if(exit.isOpen == false)
                    return;
                else{
                    playAudio(audio.finish);
                    reloadLevel();
                }
        }else {
            // Check if requested position is Fallable
            var playerblockpos = this.blockPos;
            fallables.forEach(function (f, index, obj) {
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
                            obj.splice(index, 1);

                            items_left--;
                            playAudio(audio.trash_collect);

                            if(items_left == 0)
                            {
                                exit.open();
                            }
                           

                        } else
                            // Try to move fallable
                            if (dy == -1 || !f.move(dx, dy, true))
                                success = false;
                    }
            });

        }

        if (!success)
            return;

        // Move player
        this.blockPos.x += dx;
        this.blockPos.y += dy;

        

        // Normal walk sound
        playAudio(audio.walk);

    }

    this.update = function () {

        refreshOffset();
        this.updateAnimaiton(movementSpeed);


    }

    this.draw = function (context) {

        switch (this.looking) {
            case Direc.UP:
                context.drawImage(tex.player_up, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
            case Direc.DOWN:
                context.drawImage(tex.player_down, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
            case Direc.LEFT:
                context.drawImage(tex.player_left, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
            case Direc.RIGHT:
                context.drawImage(tex.player_right, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
            default:
                context.drawImage(tex.player_neutral, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
                break;
        }
        context.stroke();
    }

    this.kill = function () {
        playAudio(audio.die);
        alert("You died!");
        reloadLevel();
    }

}



inherits(Fallable, GameObject);

function Fallable(pos, type) {
    Fallable.super_.call(this, pos, type);

    this.fallEvent = function(){
        
      
    }

    this.move = function (dx, dy, playerCause = false) {

        // Can't move when it's already moving and cant move vertically
        if (this.moving || dy != 0)
            return;

        var succ = true;

        // When requested position is wall return
        if (!isAir(this.blockPos.x + dx,this.blockPos.y + dy))
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

        if (playerCause) {
            playAudio(audio.dump_move);
        }

        return true;
    }

    this.isFalling = false;
    this.wasFalling = false;

    this.update = function () {
        if (!this.updateAnimaiton(gravity)) {
            return;
        }

        // Fallable land even
        if (this.isFalling && !isAir(this.blockPos.x, this.blockPos.y + 1)) {
            this.isFalling = false;

            this.fallEvent();

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
                if (!belowCanSlip(this))
                    this.move(+1, 0);

                // If Left and left  below Is air
            } else if (
                isAir(this.blockPos.x - 1, this.blockPos.y) &&
                isAir(this.blockPos.x - 1, this.blockPos.y + 1)
            ) {
                if (!belowCanSlip(this))
                    this.move(-1, 0);
            }
        } else if (isAir(this.blockPos.x, this.blockPos.y + 1)) {
            this.blockPos = new Vec(this.blockPos.x, this.blockPos.y + 1);
            this.isFalling = true;
        }
    }
}

var belowCanSlip = function (fallable) {
    var below = getFallable(fallable.blockPos.x, fallable.blockPos.y + 1);
    var below_below = getFallable(fallable.blockPos.x, fallable.blockPos.y + 2);
    if(!below_below)
        return false;
   
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
        return true;
    }
}


inherits(Dumpster, Fallable);

function Dumpster(pos) {
    Dumpster.super_.call(this, pos, Block.DUMPSTER);
    this.image = tex.dumpster();
    this.draw = function (context) {
        context.drawImage(this.image, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
        context.stroke();
    }
    this.fallEvent = function(){
        playAudio(audio.dump_land);
        
                if (isPlayer(this.blockPos.x, this.blockPos.y + 1)) {
                    player.kill();
                }
    }
}

inherits(Collectable, Fallable);
function Collectable(pos, type) {
    Collectable.super_.call(this, pos, type);
}

inherits(Trash, Collectable);
function Trash(pos) {
    Trash.super_.call(this, pos, Block.TRASH);
    this.image = tex.trash();    
    this.draw = function (context) {
        context.drawImage(this.image, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
        context.stroke();
    }
    this.fallEvent = function(){
        playAudio(audio.trash_land);
        if (isPlayer(this.blockPos.x, this.blockPos.y + 1)) {
            player.kill();
        }
    }
}



function Exit(pos){
    this.open = function(){
        playAudio(audio.exit_open);
        this.isOpen = true;
    }
    this.isOpen = false;
    this.pos = pos;
    this.draw = function(context){
        if(this.isOpen)
            context.drawImage(tex.exit_open, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
        else
            context.drawImage(tex.exit_closed, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
        
        context.stroke();
    }
}


// GETTERS:

var isFallable = function (x, y) {
    var succ = false;
    fallables.forEach(function (f) {
        if (x == f.blockPos.x && y == f.blockPos.y) {
            succ = true;
        }
    });
    return succ;
}

var getFallable = function(x,y){
    var result = null;
    fallables.forEach(function (f) {
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
    return world[x][y] == Block.WALL || world[x][y] == Block.STEEL_WALL;
}

var isExit = function(x,y){
    return exit.pos.x == x && exit.pos.y == y;
}

var isAir = function (x, y) {
    return world[x][y] == Block.AIR && !isPlayer(x, y) && !isFallable(x, y) && !isExit(x,y);
}