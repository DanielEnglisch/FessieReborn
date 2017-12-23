
inherits(TrashMonster, Monster);
function TrashMonster(pos) {
    SilverMonster.super_.call(this, pos, Block.TRASH_MONSTER);
    this.dir = Direc.RIGHT;
    this.looking = Direc.NONE;
    this.hitbox = 0.75;
    this.movementSpeed = 0.03;
    this.update = function () {

        if (!this.updateAnimaiton(this.movementSpeed, this.movementSpeed))
            return;

        var dx = 0, dy = 0;

        // If Player is in range follow else idle arround randomly
        if(Math.sqrt(Math.pow(this.blockPos.x - player.blockPos.x, 2) +Math.pow(this.blockPos.y - player.blockPos.y, 2) ) <= 6){
            // If player is in range
               if(this.blockPos.x - player.blockPos.x > 0 && !(!isAir(this.blockPos.x  -1, this.blockPos.y+dy) && !isPlayer(this.blockPos.x -1, this.blockPos.y+dy)))
                dx--;
               else if(this.blockPos.x - player.blockPos.x < 0 && !(!isAir(this.blockPos.x + 1, this.blockPos.y+dy) && !isPlayer(this.blockPos.x +1, this.blockPos.y+dy)))
               dx++;
              else {
                  if(this.blockPos.y - player.blockPos.y > 0 && !(!isAir(this.blockPos.x, this.blockPos.y-1) && !isPlayer(this.blockPos.x , this.blockPos.y-1)))
               dy--;
               else if(this.blockPos.y - player.blockPos.y < 0 && !(!isAir(this.blockPos.x , this.blockPos.y+1) && !isPlayer(this.blockPos.x , this.blockPos.y+1)))
               dy++;
              }
           
        }else{
            // Else silver bomb logic
            if (this.dir == Direc.RIGHT) {
                
                            if (isAir(this.blockPos.x + 1, this.blockPos.y) || (isPlayer(this.blockPos.x + 1, this.blockPos.y)&& !isMonster(this.blockPos.x + 1, this.blockPos.y)))
                                dx++;
                            else {
                                if ((Math.floor(Math.random() * 2) + 1) == 1) {
                                    this.dir = Direc.DOWN;
                                } else
                                    this.dir = Direc.LEFT;
                            }
                
                        } else if (this.dir == Direc.DOWN) {
                
                            if (isAir(this.blockPos.x, this.blockPos.y + 1) || (isPlayer(this.blockPos.x, this.blockPos.y + 1)&& !isMonster(this.blockPos.x, this.blockPos.y + 1)))
                                dy++;
                            else {
                                if ((Math.floor(Math.random() * 2) + 1) == 1) {
                                    this.dir = Direc.RIGHT;
                                } else
                                    this.dir = Direc.UP;
                            }
                
                        } else if (this.dir == Direc.LEFT) {
                
                            if (isAir(this.blockPos.x - 1, this.blockPos.y) ||( isPlayer(this.blockPos.x - 1, this.blockPos.y) && !isMonster(this.blockPos.x - 1, this.blockPos.y)))
                                dx--;
                            else {
                                if ((Math.floor(Math.random() * 2) + 1) == 1) {
                                    this.dir = Direc.UP;
                                } else
                                    this.dir = Direc.RIGHT;
                            }
                
                        } else if (this.dir == Direc.UP) {
                
                            if (isAir(this.blockPos.x, this.blockPos.y - 1) || (isPlayer(this.blockPos.x, this.blockPos.y - 1)&& !isMonster(this.blockPos.x, this.blockPos.y - 1)))
                                dy--;
                            else {
                                if ((Math.floor(Math.random() * 2) + 1) == 1) {
                                    this.dir = Direc.LEFT;
                                } else
                                    this.dir = Direc.DOWN;
                            }
                
                        }
        }


        var coll = false;
        

        if(!isAir(this.blockPos.x + dx, this.blockPos.y+dy) && !isPlayer(this.blockPos.x + dx, this.blockPos.y+dy))
            coll = true;



        // Check if dumpster is not in the way (pos)
        var bp = this.blockPos;
        fallables.forEach(function (dumpster) {
            if (Math.abs(bp.x + dx - dumpster.pos.x) < 1 && Math.abs(bp.y + dy - dumpster.pos.y) < 1) {
                coll = true;
            }
        });

        // Exit bug fix
        if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.EXIT) {
            coll = true;
            console.log("EXIT IN THE WAY");
        }

        // If nothing in the way move
        if (!coll) {
            this.blockPos.x += dx;
            this.blockPos.y += dy;



            // Adjust look direction
            if (dx == 1 && dy == 0)
                this.looking = Direc.RIGHT;
            else if (dx == -1 && dy == 0)
                this.looking = Direc.LEFT;
            else if (dx == 0 && dy == 1)
                this.looking = Direc.DOWN;
            else if (dx == 0 && dy == -1)
                this.looking = Direc.UP;
        }



    }


    this.draw = function (context) {

        switch (this.looking) {
            case Direc.LEFT:
                context.drawImage(tex.trash_monster_left.getImage(), this.pos.x * scale + 0, this.pos.y * scale + 0, scale, scale);
                break;
            case Direc.RIGHT:
                context.drawImage(tex.trash_monster_right.getImage(), this.pos.x * scale + 0, this.pos.y * scale + 0, scale, scale);
                break;
            default:
                context.drawImage(tex.trash_monster_center.getImage(), this.pos.x * scale + 0, this.pos.y * scale + 0, scale, scale);

        }
        context.stroke();
    }

}
