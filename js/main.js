var initWorld = function () {
    loadLevel();
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        main();
    }
};

var loadingtime = Date.now();
var main = function () {
    addEvents();
    initCanvas();
    tex.load("img/", function () {
        console.log("Loaded textures.");
        initWorld();
        startBackgroundMusic();
        console.log("Loading took: " + (Date.now() - loadingtime) / 1000 + "s");
        loop();
    });


};



var loop = function () {

    if (Date.now() - time >= 1000 / ups) {
        update();
        time = Date.now();

    }

    redraw();
    requestAnimationFrame(loop);

}


var refreshOffset = function () {
    xOffset = 0;
    yOffset = 0;
    xOffset -= player.pos.x * scale - canvas.width / 2 + 1 * scale;
    yOffset -= player.pos.y * scale - canvas.height / 2 + 0 * scale;
    xOffset = Math.round(xOffset);
    yOffset = Math.round(yOffset);
}

var addEvents = function () {
    window.addEventListener("resize", function (e) {
        console.log("RESIZE");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 40;
        refreshOffset();
    });


    window.onkeydown = function (e) {
        if (e.repeat)
            return;
        keys[e.keyCode] = true;
    };
    window.onkeyup = function (e) {
        if (e.repeat)
            return;
        keys[e.keyCode] = false;
    };

}


var update = function () {


    // Update synched animations Monsters
    tex.silver_monster_anim.update();
    tex.trash_monster_center.update();
    tex.trash_monster_left.update();
    tex.trash_monster_right.update();
    
    // New collision detection

    // Fallables -> Monsters
    fallables.forEach(function (f) {
        if (f.isFalling) {
            monsters.forEach(function (m) {
                if (Math.abs(f.pos.x - m.pos.x) < m.hitbox && Math.abs(f.pos.y - m.pos.y) < m.hitbox)
                    m.kill();
            });
        }
    });


    if (!player.isDead) {
        // Player -> Monsters
        monsters.forEach(function (f) {
            if (Math.abs(f.pos.x - player.pos.x) < f.hitbox && Math.abs(f.pos.y - player.pos.y) < f.hitbox) {
                f.kill();
                player.kill();
            }

        });
    }


    // Monster -> Explosion overlay
    explosion_overlays.forEach(function (f) {

        if (Math.abs(f.timeUntil - Date.now()) > f.duration - EXPLOSION_DELAY)
            return;


        // Player -> Explosion overlay
        if (!player.isDead && Math.abs(f.blockPos.x - player.pos.x) < 1 && Math.abs(f.blockPos.y - player.pos.y) < 1) {
            player.kill();
        }
        // Monster -> Explosion overlay
        monsters.forEach(function (m) {
            if (Math.abs(f.blockPos.x - m.pos.x) < 1 && Math.abs(f.blockPos.y - m.pos.y) < 1)
                m.kill();
        });
        // Collectables -> explosion overlay
        fallables.forEach(function (t) {
            if (isCollectable(f.blockPos.x, f.blockPos.y)) {
                if (Math.abs(f.blockPos.x - t.pos.x) < 1 && Math.abs(f.blockPos.y - t.pos.y) < 1)
                    fallables.splice(fallables.indexOf(t), 1);
            }
        });

    });

    player.update();

    fallables.forEach(function (f) {
        f.update();
    });

    monsters.forEach(function (m) {
        m.update();
    });

    explosion_overlays.forEach(function (m) {
        m.update();
    });

    if (player.isDead)
        return;

    // STRG Grabbing
    if (keys[17]) {

        if (keys[38] || keys[87]) {
            player.grab(0, -1);
        } else if (keys[40] || keys[83]) {
            player.grab(0, +1);
        } else if (keys[37] || keys[65]) {
            player.grab(-1, 0);
        } else if (keys[39] || keys[68]) {
            player.grab(1, 0);
        }
    } else {
        if (keys[38] || keys[87]) {
            player.move(0, -1);
        } else if (keys[40] || keys[83]) {
            player.move(0, +1);
        } else if (keys[37] || keys[65]) {
            player.move(-1, 0);
        } else if (keys[39] || keys[68]) {
            player.move(1, 0);
        }
    }

    // Space (Place bomb)
    if (keys[32]) {
        spawnBombOnPlayer();
        keys[32] = false;
    }

    // R
    if (keys[82]) {
        reloadLevel();
        keys[82] = false;
    }

    if (keys[27]) {
        // ESC
        if (levelTesting)
            window.location.href = "./editor/?data=" + levelString;

        keys[27] = false;
    }

};

var initCanvas = function () {
    var canvas = document.getElementById("screen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 40;
    context = canvas.getContext("2d");
};


var redraw = function () {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.save();
    context.translate(xOffset, yOffset);

    for (var x = 0; x < world.length; x++) {
        for (var y = 0; y < world[0].length; y++) {

            // Walls
            if (world[x][y] == Block.WALL) {
                context.drawImage(tex.wall, x * scale, y * scale, scale, scale);
            } else if (world[x][y] == Block.STEEL_WALL) {
                context.drawImage(tex.steel_wall, x * scale, y * scale, scale, scale);
            } else if (world[x][y] == Block.BOMB) {
                context.drawImage(tex.bomb, x * scale, y * scale, scale, scale);
            } else if (world[x][y] == Block.DIRT) {
                context.drawImage(tex.dirt, x * scale, y * scale, scale, scale);
            } else if (world[x][y] == Block.SEWER) {
                context.drawImage(tex.sewer, x * scale, y * scale, scale, scale);
            } else if (world[x][y] == Block.BLUE_WALL) {
                context.drawImage(tex.blue_wall, x * scale, y * scale, scale, scale);
            } else if (world[x][y] == Block.WALL_ORGANIC) {
                context.drawImage(tex.wall_organic, x * scale, y * scale, scale, scale);
            } else {
                // Everthing else
                context.drawImage(tex.air, x * scale, y * scale, scale, scale);

            }
            context.stroke();

        }
    }

    exit.draw(context);

    // Draw fallables
    fallables.forEach(function (f) {
        f.draw(context);
    });

    // Draw monsters
    monsters.forEach(function (m) {
        m.draw(context);
    });


    player.draw(context);
    

    // Draw explosionjs
    explosion_overlays.forEach(function (m) {
        m.draw(context);
    });


    context.restore();


    // Score Test
    context.fillStyle = "black";
    context.fillRect(0, canvas.height - 50, canvas.width, 50);
    context.stroke();
    context.font = "24px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "rgb(248, 132, 0)";
    context.fillText("Items left: " + items_left, canvas.width / 2, canvas.height - 25);
    context.fillText("Bombs: " + num_bombs, canvas.width / 3, canvas.height - 25);

    if (player.isDead && !player.hasFinished) {
        context.font = "72px Arial";
        context.fillStyle = "red";
        context.strokeStyle = "black";
        context.fillText("You died!", canvas.width / 2, canvas.height / 2);
        context.strokeText("You died!", canvas.width / 2, canvas.height / 2);

    }



};


var spawnExplosion = function (blockPos, type) {

    if (type == Explosion.SLIME)
        playAudio(audio.slime_explosion);
    else
        playAudio(audio.explosion);

    for (var x = blockPos.x - 1; x <= blockPos.x + 1; x++) {
        for (var y = blockPos.y - 1; y <= blockPos.y + 1; y++) {

            if (world[x][y] == Block.DIRT) {
                world[x][y] = Block.AIR;
            } else if (type == Explosion.FIRE && isBreakable(x,y)) {
                world[x][y] = Block.AIR;
            }

            switch (type) {
                case Explosion.FIRE:
                    explosion_overlays.push(new ExplosionOverlay(new Vec(x, y), tex.fire_explosion, 1000));
                    break;
                case Explosion.SLIME:
                    explosion_overlays.push(new ExplosionOverlay(new Vec(x, y), tex.slime_explosion, 10000));
                    break;
                case Explosion.TRASH:
                    if (isAir(x, y)) fallables.push(new Trash(new Vec(x, y)));
                    break;
            }

        }
    }

};

var spawnBombOnPlayer = function () {
    var pos = Object.assign({}, player.blockPos);

    if (num_bombs > 0 && world[pos.x][pos.y] != Block.BOMB) {


        // Check monster intersection
        var coll = false;
        monsters.forEach(function (m) {
            if (Math.abs(m.pos.x - pos.x) < 1 && Math.abs(m.pos.y - pos.y) < 1) {
                coll = true;
            }
        });
        if (coll)
            return;


        world[pos.x][pos.y] = Block.BOMB;

        playAudio(audio.fire);
        num_bombs--;

        timeOuts.push(setTimeout(function () {
            spawnExplosion(pos, Explosion.FIRE);
            world[pos.x][pos.y] = Block.AIR;

        }, 3000));

    }
}