
inherits(SilverMonster, Monster);
function SilverMonster(pos) {
    SilverMonster.super_.call(this, pos, Block.SILVER_MONSTER);
    this.dir = Direc.RIGHT;
    this.animation = tex.silver_monster_anim;
    this.movementSpeed = 0.015;
    this.update = function () {
        this.animation.update();
        if (!this.updateAnimaiton(this.movementSpeed, this.movementSpeed))
            return;

        var dx = 0, dy = 0;

        if (this.dir == Direc.RIGHT) {

            if (isAir(this.blockPos.x + 1, this.blockPos.y) || isPlayer(this.blockPos.x + 1, this.blockPos.y))
                dx++;
            else {
                if ((Math.floor(Math.random() * 2) + 1) == 1) {
                    this.dir = Direc.DOWN;
                } else
                    this.dir = Direc.LEFT;
            }

        } else if (this.dir == Direc.DOWN) {

            if (isAir(this.blockPos.x, this.blockPos.y + 1) || isPlayer(this.blockPos.x, this.blockPos.y + 1))
                dy++;
            else {
                if ((Math.floor(Math.random() * 2) + 1) == 1) {
                    this.dir = Direc.RIGHT;
                } else
                    this.dir = Direc.UP;
            }

        } else if (this.dir == Direc.LEFT) {

            if (isAir(this.blockPos.x - 1, this.blockPos.y) || isPlayer(this.blockPos.x - 1, this.blockPos.y))
                dx--;
            else {
                if ((Math.floor(Math.random() * 2) + 1) == 1) {
                    this.dir = Direc.UP;
                } else
                    this.dir = Direc.RIGHT;
            }

        } else if (this.dir == Direc.UP) {

            if (isAir(this.blockPos.x, this.blockPos.y - 1) || isPlayer(this.blockPos.x, this.blockPos.y - 1))
                dy--;
            else {
                if ((Math.floor(Math.random() * 2) + 1) == 1) {
                    this.dir = Direc.LEFT;
                } else
                    this.dir = Direc.DOWN;
            }

        }

        // Check if dumpster is not in the way (pos)
        var bp = this.blockPos;
        var coll = false;
        fallables.forEach(function(dumpster){
            if(Math.abs(bp.x + dx - dumpster.pos.x) < 1 && Math.abs(bp.y + dy - dumpster.pos.y) < 1){
                coll=true;
            }
        });

        // If nothing in the way move
        if(!coll){
            this.blockPos.x += dx;
            this.blockPos.y += dy;
        }
            

      

    }


    this.draw = function (context) {
        context.drawImage(tex.silver_monster_anim.getImage(), this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
        context.stroke();
    }

}
