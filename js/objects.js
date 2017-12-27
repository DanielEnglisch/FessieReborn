inherits(Dumpster, Fallable);

function Dumpster(pos) {
    Dumpster.super_.call(this, pos, Block.DUMPSTER);
    this.image = tex.dumpster();
    this.draw = function (context) {
        context.drawImage(this.image, this.pos.x * scale, this.pos.y * scale, scale, scale);
        context.stroke();
    }
    this.fallEvent = function () {
        playAudio(audio.dump_land);
        if (isPlayer(this.blockPos.x, this.blockPos.y + 1)) {
            player.kill();
        }
    }
}



inherits(Trash, Collectable);

function Trash(pos) {
    Trash.super_.call(this, pos, Block.TRASH);
    this.image = tex.trash();
    this.draw = function (context) {
        context.drawImage(this.image, this.pos.x * scale, this.pos.y * scale, scale, scale);
        context.stroke();
    }

    this.collect = function () {
        score += 100;

        // Remove Item
        fallables.splice(fallables.indexOf(this), 1);
        if (items_left > 0)
            items_left--;

        // Check exit
        if (items_left == 0) {
            exit.open();
        }
        playAudio(audio.trash_collect);

    }
}

function Exit(pos) {
    this.open = function () {
        if (this.isOpen)
            return;
        playAudio(audio.exit_open);
        this.isOpen = true;
    }
    this.isOpen = false;
    this.pos = pos;
    this.draw = function (context) {
        if (this.isOpen)
            context.drawImage(tex.exit_open, this.pos.x * scale, this.pos.y * scale, scale, scale);
        else
            context.drawImage(tex.exit_closed, this.pos.x * scale, this.pos.y * scale, scale, scale);

        context.stroke();
    }
}

function ExplosionOverlay(pos, img, time) {
    this.duration = time;

    this.animation = Object.assign({}, img);
    this.timeUntil = Date.now() + time;
    this.blockPos = pos;
    this.update = function () {

        this.animation.update();

        if (Date.now() >= this.timeUntil) {
            explosion_overlays.splice(explosion_overlays.indexOf(this), 1);
        }
    }
    this.draw = function (context) {
        context.drawImage(this.animation.getImage(), this.blockPos.x * scale, this.blockPos.y * scale, scale, scale);
        context.stroke();
    }
}



inherits(Bomb, Collectable);

function Bomb(pos) {
    Bomb.super_.call(this, pos, Block.BOMB);
    this.image = tex.bomb;
    this.draw = function (context) {
        context.drawImage(this.image, this.pos.x * scale, this.pos.y * scale, scale, scale);
        context.stroke();
    }



    this.collect = function () {
        console.log("Collected bomb!");
        num_bombs++;
        fallables.splice(fallables.indexOf(this), 1);
        playAudio(audio.trash_collect);

    }
}