inherits(Player, GameObject);

function Player(pos) {
    Player.super_.call(this, pos, Block.PLAYER);
    this.looking = Direc.NONE;
    this.isDead = false;
    this.grab = function (dx, dy) {

        if (this.moving)
            return;
        if (isCollectable(this.blockPos.x + dx, this.blockPos.y + dy)) {
            var item = getFallable(this.blockPos.x + dx, this.blockPos.y + dy);
            item.collect();
        } else if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.DIRT) {
            world[this.blockPos.x + dx][this.blockPos.y + dy] = 0;
            playDirt();
        }


    }
    this.move = function (dx, dy) {

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
                    else
                        window.location.href = "?lvl=" + nextLevel;
                }, true);
                audio.finish.play();
                STOP = true;
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

    }

    this.update = function () {

        this.updateAnimaiton(movementSpeed);
        refreshOffset();
    }

    this.draw = function (context) {
        if (STOP)
            return;
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

    this.kill = function () {
        if (STOP)
            return;
        playAudio(audio.die);
        STOP = true;
        this.isDead = true;
        setTimeout(function () {
            reloadLevel();

        }, 2000);
    }

}