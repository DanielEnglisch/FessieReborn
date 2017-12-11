var GameObject = function (position, type) {
    this.blockPos = position;
    this.sourceBlock = position;
    this.type = type;
    this.moving = false;
    this.pos = new Vec(position.x, position.y);
    this.updateAnimaiton = function (yspeed, xspeed = movementSpeed) {
        // Basic animaiton
        if (this.pos.x + xspeed < this.blockPos.x) {
            this.moving = true;
            this.pos.x += xspeed;
            this.pos.x = Math.round(this.pos.x * 100) / 100
            return false;
        } else if (this.pos.x - xspeed > this.blockPos.x) {
            this.moving = true;
            this.pos.x -= xspeed;
            this.pos.x = Math.round(this.pos.x * 100) / 100
            return false;
        } else if (this.pos.y + yspeed < this.blockPos.y) {
            this.moving = true;
            this.pos.y += yspeed;
            this.pos.y = Math.round(this.pos.y * 100) / 100
            return false;
        } else if (this.pos.y - yspeed > this.blockPos.y) {
            this.moving = true;
            this.pos.y -= yspeed;
            this.pos.y = Math.round(this.pos.y * 100) / 100
            return false;
        } else {
            this.sourceBlock = new Vec(this.blockPos.x, this.blockPos.y);
            this.pos.x = this.blockPos.x;
            this.pos.y = this.blockPos.y;
            this.moving = false;
            return true;
        }
    };
};

inherits(Fallable, GameObject);
function Fallable(pos, type) {
    Fallable.super_.call(this, pos, type);

    this.fallEvent = function () {


    }

    this.move = function (dx, dy, playerCause = false) {

        // Can't move when it's already moving and cant move vertically
        if (this.moving || dy != 0)
            return;

        var succ = true;
        
        // When requested position is wall return
        if (!isAir(this.blockPos.x + dx, this.blockPos.y + dy))
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
        } else if (isAir(this.blockPos.x, this.blockPos.y + 1) || isMonster(this.blockPos.x, this.blockPos.y + 1)) {
            this.blockPos = new Vec(this.blockPos.x, this.blockPos.y + 1);
            this.isFalling = true;
        }
    }
}

var belowCanSlip = function (fallable) {
    var below = getFallable(fallable.blockPos.x, fallable.blockPos.y + 1);
    var below_below = getFallable(fallable.blockPos.x, fallable.blockPos.y + 2);
    if (!below_below)
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

inherits(Monster, GameObject);
function Monster(pos) {
    Monster.super_.call(this, pos, -1);
    this.dir = Direc.RIGHT;
    this.hitbox = 1;
    this.movementSpeed = 0.015;
    this.kill = function () {
        monsters.splice(monsters.indexOf(this), 1);
        spawnExplosion(posToBlock(this.pos) , Explosion.FIRE);
        
    }
    this.update = function () {

    }

    this.draw = function (context) {

    }

}

inherits(Collectable, Fallable);
function Collectable(pos, type) {
    Collectable.super_.call(this, pos, type);
}