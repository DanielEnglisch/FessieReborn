/**
 * Objects: Extended Objects (Dumpster, Trash, Bomb, ...)
 */

inherits(Dumpster, Fallable);
function Dumpster(pos) {
    Dumpster.super_.call(this, pos, Block.DUMPSTER);
    this.image = tex.dumpster.cloneImage();
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
    this.image = tex.trash.cloneImage();
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


inherits(ToxicTrash, Trash);
function ToxicTrash(pos) {
    ToxicTrash.super_.call(this, pos, Block.TOXIC_TRASH);
    this.image = tex.toxic_trash.cloneImage();
    this.fallEvent = function () {
        spawnExplosion(this.blockPos, Explosion.SLIME);
        fallables.splice(fallables.indexOf(this), 1);
    }

}

inherits(ForceField, Collectable);
function ForceField(pos) {
    ForceField.super_.call(this, pos, Block.FORCE_FIELD);

    this.draw = function (context) {
        context.drawImage(tex.force_field.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
        context.stroke();
    }

    this.collect = function () {
       
        playAudio(audio.force_field);
        player.forceField = true;
        timeOuts.push(setTimeout(function () {
            player.forceField = false;
        }, 10000));
        fallables.splice(fallables.indexOf(this), 1);
        
    }
}

inherits(FireOrb, Collectable);
function FireOrb(pos) {
    FireOrb.super_.call(this, pos, Block.FIRE_ORB);

    this.draw = function (context) {
        context.drawImage(tex.fire_orb.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
        context.stroke();
    }

    this.collect = function () {
        num_fires++;
        playAudio(audio.trash_collect);
        fallables.splice(fallables.indexOf(this), 1);
        
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


        if(player.hasFinished){
            tex.fessie_exit.update();
            context.drawImage(tex.fessie_exit.getImage(), this.pos.x * scale, this.pos.y * scale, scale, scale);
        }

        context.stroke();
    }
}

function ExplosionOverlay(pos, img, time, type, deadly = true,callback = function(){}) {
    this.duration = time;
    this.type = type;
    this.isDeadly = deadly;
    this.callback = callback;
    this.animation = Object.assign({}, img);
    this.timeUntil = Date.now() + time;
    this.blockPos = pos;
    this.update = function () {

        this.animation.update();

        if (Date.now() >= this.timeUntil) {
            this.callback(this.blockPos.x, this.blockPos.y);
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

        num_bombs++;
        fallables.splice(fallables.indexOf(this), 1);
        playAudio(audio.trash_collect);

    }
}