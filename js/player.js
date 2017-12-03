inherits(Player, GameObject);
function Player(pos) {
    Player.super_.call(this, pos, Block.PLAYER);
    this.looking = Direc.NONE;
    this.isDead = false;
    this.grab = function (dx, dy) {

        if (this.moving)
            return;
        if (isTrash(this.blockPos.x + dx, this.blockPos.y + dy)) {
            fallables.splice(fallables.indexOf(getTrash(this.blockPos.x + dx, this.blockPos.y + dy)), 1);

            items_left--;
            playAudio(audio.trash_collect);

            if (items_left == 0) {
                exit.open();
            }
        }

        else if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.DIRT) {
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
        if (isWall(this.blockPos.x + dx, this.blockPos.y + dy))
            return;
        // Walk on dirt
        else if (world[this.blockPos.x + dx][this.blockPos.y + dy] == Block.DIRT) {
            world[this.blockPos.x + dx][this.blockPos.y + dy] = 0;
            playDirt();
            // If is monster
        } else if (isExit(this.blockPos.x + dx, this.blockPos.y + dy)) {
            // TODO: Exit logic
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
                        if (f.type == Block.TRASH) {

                            // If trash is moving and you are runnin
                            if(dy == -1 && f.moving){
                                player.kill();
                            }

                            obj.splice(index, 1);
                            items_left--;
                            playAudio(audio.trash_collect);

                            if (items_left == 0) {
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
        if(STOP)
            return;
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
        if (STOP)
            return;
        playAudio(audio.die);
        STOP = true;
        this.isDead = true;
        setTimeout(function(){
            reloadLevel();

        }, 2000);
    }

}