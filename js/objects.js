




inherits(Dumpster, Fallable);
function Dumpster(pos) {
    Dumpster.super_.call(this, pos, Block.DUMPSTER);
    this.image = tex.dumpster();
    this.draw = function (context) {
        context.drawImage(this.image, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
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
        context.drawImage(this.image, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
        context.stroke();
    }
    this.fallEvent = function () {
        playAudio(audio.trash_land);
        if (isPlayer(this.blockPos.x, this.blockPos.y + 1)) {
            player.kill();
        }
    }
}



function Exit(pos) {
    this.open = function () {
        playAudio(audio.exit_open);
        this.isOpen = true;
    }
    this.isOpen = false;
    this.pos = pos;
    this.draw = function (context) {
        if (this.isOpen)
            context.drawImage(tex.exit_open, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);
        else
            context.drawImage(tex.exit_closed, this.pos.x * scale + xOffset, this.pos.y * scale + yOffset, scale, scale);

        context.stroke();
    }
}

function ExplosionOverlay(pos, img, time) {
    this.image = img;
    this.timeUntil = time;
    this.imgId = 0;
    this.cooldownUntil = Date.now() + 1000/10;
    this.blockPos = pos;
    this.update = function () {

        if (Date.now() >= this.cooldownUntil) {
            this.imgId = this.imgId+1 % 9;
            this.image = tex.fire_explosion[this.imgId];
            this.cooldownUntil = Date.now() + 1000/10;
        }


        if (Date.now() >= this.timeUntil) {
            explosion_overlays.splice(explosion_overlays.indexOf(this), 1);
        }
    }
    this.draw = function (context) {
        context.drawImage(this.image, this.blockPos.x * scale + xOffset, this.blockPos.y * scale + yOffset, scale, scale);
        context.stroke();
    }
}