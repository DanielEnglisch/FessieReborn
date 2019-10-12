/**
 * Player object class
 */

inherits(Player, GameObject);
function Player(pos) {
    Player.super_.call(this, pos, Block.PLAYER);
    this.looking = Direc.NONE;
    this.isDead = false;
    this.isGrabbing = false;
    this.forceField = false;
    this.grabTimeout = null;

    this.grab = function (dx, dy) {

        if (this.isGrabbing || this.moving)
            return;

        this.isGrabbing = true;


        if (isCollectable(this.blockPos.x + dx, this.blockPos.y + dy)) {
            var item = getFallable(this.blockPos.x + dx, this.blockPos.y + dy);
            item.collect();
        } else if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.DIRT) {
            world[this.blockPos.x + dx][this.blockPos.y + dy] = 0;
            playDirt();
        }

        // Adjust look direction
        if (dx == 1 && dy == 0)
            player.looking = Direc.RIGHT;
        else if (dx == -1 && dy == 0)
            player.looking = Direc.LEFT;

        else if (dx == 0 && dy == 1)
            player.looking = Direc.DOWN;
        else if (dx == 0 && dy == -1)
            player.looking = Direc.UP;



        // Reset animation after grabbing
        var self = this;
        timeOuts.push(self.grabTimeout = setTimeout(function () {

            self.isGrabbing = false;
            self.looking = Direc.NONE;

        }, 250));


    }
    this.move = function (dx, dy) {

        // Cancel Grabbing
        this.isGrabbing = false;
        if (this.grabTimeout != null)
            clearTimeout(this.grabTimeout);

        // Can't move when already moving
        if (this.moving)
            return;

        var success = true;

        // When requested position is wall return
        if (isWall(this.blockPos.x + dx, this.blockPos.y + dy) || world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.BOMB)
            return;
        // Walk on dirt
        else if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.DIRT) {
            world[this.blockPos.x + dx][this.blockPos.y + dy] = Block.AIR;
            playDirt();
            // If is monster
        } else if (isExit(this.blockPos.x + dx, this.blockPos.y + dy)) {

            if (exit.isOpen == false)
                return;
            else {
                audio.finish.addEventListener('ended', function () {

                    if (levelTesting)
                        window.location.href = "./editor/?data=" + levelString;
                    else{
                        /* Save score */
                        setScore(nextLevel-1, score);
                        window.location.href = "?lvl=" + nextLevel;

                    }
                }, true);
                audio.finish.play();
                this.isDead = true;
                this.hasFinished = true;
            }
        } else {
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
                        if (isCollectable(f.blockPos.x, f.blockPos.y)) {
                            f.collect();


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

        // Adjust look direction
        if (dx == 1 && dy == 0)
            player.looking = Direc.RIGHT;
        else if (dx == -1 && dy == 0)
            player.looking = Direc.LEFT;

        else if (dx == 0 && dy == 1)
            player.looking = Direc.DOWN;
        else if (dx == 0 && dy == -1)
            player.looking = Direc.UP;

        // Normal walk sound
        playAudio(audio.walk);

        this.moving = true;

    }
    this.hasFinished = false;
    this.update = function () {

        // Death Animation
        if (this.isDead && !this.hasFinished) {
            this.pos.y += 0.1;
            this.blockPos.y+=1;
            return;
        }

        this.updateAnimaiton(movementSpeed);


        tex.fessie_left.update();
        tex.fessie_right.update();
        tex.fessie_up.update();
        tex.fessie_down.update();
        tex.fessie_idle_left.update();
        tex.fessie_idle_right.update();
        tex.fessie_idle_center.update();


        // Update grabbing animations
        if (this.isGrabbing) {
            tex.fessie_grab_down.update();
            tex.fessie_grab_left.update();
            tex.fessie_grab_right.update();
            tex.fessie_grab_up.update();
        } else {
            tex.fessie_grab_down.reset();
            tex.fessie_grab_left.reset();
            tex.fessie_grab_right.reset();
            tex.fessie_grab_up.reset();
        }



        refreshOffset();
    }

    this.draw = function (context) {

        // Death animation
        if (this.isDead && !this.hasFinished) {
            context.drawImage(tex.fessie_dead, this.pos.x * scale, this.pos.y * scale, scale, scale);
            context.stroke();
            return;
        }else if(this.hasFinished){

            return;
        }

        switch (this.looking) {
            case Direc.UP:
                if (this.moving)
                    context.drawImage(tex.fessie_up.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                else if (this.isGrabbing)
                    context.drawImage(tex.fessie_grab_up.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                else
                    context.drawImage(tex.fessie_idle_center.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);

                break;
            case Direc.DOWN:
                if (this.moving)
                    context.drawImage(tex.fessie_down.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                else if (this.isGrabbing)
                    context.drawImage(tex.fessie_grab_down.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                else
                    context.drawImage(tex.fessie_idle_center.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);

                break;
            case Direc.LEFT:
                if (this.moving)
                    context.drawImage(tex.fessie_left.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                else if (this.isGrabbing)
                    context.drawImage(tex.fessie_grab_left.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                else
                    context.drawImage(tex.fessie_idle_left.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);

                break;
            case Direc.RIGHT:
                if (this.moving)
                    context.drawImage(tex.fessie_right.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                else if (this.isGrabbing)
                    context.drawImage(tex.fessie_grab_right.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                else
                    context.drawImage(tex.fessie_idle_right.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                break;
            default:
                context.drawImage(tex.fessie_idle_center.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
                break;
        }
        if (this.forceField) {
            context.drawImage(tex.force_shield.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
        }
        context.stroke();


    }
    this.fireBlocks = 0;
    this.fire = function (dx) {

        if(this.fireBlocks != 0 || num_fires <= 0)
            return;

        var offset = dx;
        while (world[this.blockPos.x + offset][this.blockPos.y] == Block.AIR || world[this.blockPos.x + offset][this.blockPos.y] == Block.DIRT) {

            world[this.blockPos.x + offset][this.blockPos.y] = Block.AIR;
            this.fireBlocks++;
            if (dx > 0)
                explosion_overlays.push(new ExplosionOverlay(new Vec(this.blockPos.x + offset, this.blockPos.y), tex.fire_right, 400, Explosion.BREATH, true,decrFireBlocks));
            else
                explosion_overlays.push(new ExplosionOverlay(new Vec(this.blockPos.x + offset, this.blockPos.y), tex.fire_left, 400, Explosion.BREATH, true, decrFireBlocks));

            offset += dx;
        }

        // Direction
        if(dx > 0)
            this.looking = Direc.RIGHT;
        else
            this.looking = Direc.LEFT;

        num_fires--;        
        playAudio(audio.fire);


    }

    

    this.kill = function () {

        if (this.forceField || this.isDead)
            return;
        playAudio(audio.die);
        this.isDead = true;
        setTimeout(function () {
            reloadLevel();

        }, 2000);
    }

}

// Fire delay
var decrFireBlocks = function(x,y){
    player.fireBlocks--;
}