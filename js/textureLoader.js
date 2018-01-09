/**
 * TextureLoader: Provides and loads images / animations
 */

/* Contains all files */
function TexturesBundle() {
  this.loadingImages = 0;
  this.allTexturesLoading = false;

  this.fessie_neutral = new Image();
  this.fessie_dead = new Image();

  this.wall = new Image();
  this.air = new Image();
  this.dirt = new Image();
  this.exit_open = new Image();
  this.exit_closed = new Image();
  this.steel_wall = new Image();

  this.bomb = new Image();
  this.blue_wall = new Image();
  this.sewer = new Image();
  this.wall_organic = new Image();
  
  // Variants
  this.trash = new VariantTexture();
  this.toxic_trash = new VariantTexture();
  this.dumpster = new VariantTexture();


  this.slime_explosion = new Animation(500);
  this.fire_explosion = new Animation(1000);
  this.silver_monster_anim = new Animation(1500);


  // Fessie animation
  this.fessie_right = new Animation(500);
  this.fessie_left = new Animation(500);
  this.fessie_up = new Animation(500);
  this.fessie_down = new Animation(500);

  this.fessie_idle_left = new Animation(500);
  this.fessie_idle_right = new Animation(500);
  this.fessie_idle_center = new Animation(500);
  
  this.fessie_grab_down = new Animation(250);
  this.fessie_grab_left = new Animation(250);
  this.fessie_grab_right = new Animation(250);
  this.fessie_grab_up = new Animation(250);
  this.fessie_exit = new Animation(2500);

  // Trash Monster
  this.trash_monster_center = new Animation(250);
  this.trash_monster_left = new Animation(250);
  this.trash_monster_right = new Animation(250);
  
  // Slime Monster
  this.slime_monster_center = new Animation(500);
  this.slime_monster_left = new Animation(500);
  this.slime_monster_right = new Animation(500);
  this.slime_plop = new Animation(200);
  this.slime_plop_reverse = new Animation(200);

  this.force_field = new Animation(500);
  this.force_shield = new Animation(500);
  
  this.fire_orb = new Animation(500);
  this.fire_left = new Animation(500);
  this.fire_right = new Animation(500);
  
  this.callback = null;
  this.load = function (dir, callback) {
    this.callback = callback;
    
    this.fessie_neutral = this.blockloadImage(dir + "fessie_neutral.png");    
    this.fessie_dead = this.blockloadImage(dir + "fessie_dead.png");

    this.wall = this.blockloadImage(dir + "wall.png");
    this.exit_closed = this.blockloadImage(dir + "exit_closed.png");
    this.exit_open = this.blockloadImage(dir + "exit_open.png");

    // Variants
    this.trash.load(dir + "trash/");
    this.toxic_trash.load(dir + "toxic_trash/");
    this.dumpster.load(dir + "dumpster/");

    this.air = this.blockloadImage(dir + "air.png");
    this.dirt = this.blockloadImage(dir + "dirt.png");
    this.steel_wall = this.blockloadImage(dir + "steel_wall.png");

    this.bomb = this.blockloadImage(dir + "bomb.png");


    this.blue_wall = this.blockloadImage(dir + "bluewall.png");
    this.sewer = this.blockloadImage(dir + "sewer.png");
    this.wall_organic = this.blockloadImage(dir + "wall_organic.png");
    


    this.slime_explosion.load(dir + "slime_explosion/");
    this.fire_explosion.load(dir + "fire_explosion/");

    // Silver Monster
    this.silver_monster_anim.load(dir + "silver_monster/");

    // Fessie animation
    this.fessie_right.load(dir + "fessie_right/");
    this.fessie_left.load(dir + "fessie_left/");
    this.fessie_down.load(dir + "fessie_down/");
    this.fessie_up.load(dir + "fessie_up/");

    this.fessie_idle_center.load(dir + "fessie_idle_center/");
    this.fessie_idle_left.load(dir + "fessie_idle_left/");
    this.fessie_idle_right.load(dir + "fessie_idle_right/");
    
    this.fessie_grab_up.load(dir + "fessie_grab_up/");
    this.fessie_grab_down.load(dir + "fessie_grab_down/");
    this.fessie_grab_left.load(dir + "fessie_grab_left/");
    this.fessie_grab_right.load(dir + "fessie_grab_right/");
    this.fessie_exit.load(dir + "fessie_exit/");

    // Trash Monster
    this.trash_monster_center.load(dir + "trash_monster_center/");
    this.trash_monster_left.load(dir + "trash_monster_left/");
    this.trash_monster_right.load(dir + "trash_monster_right/");

    // Slime Monster
    this.slime_monster_center.load(dir + "slime_monster_center/");
    this.slime_monster_left.load(dir + "slime_monster_left/");
    this.slime_monster_right.load(dir + "slime_monster_right/");
    this.slime_plop.load(dir + "slime_plop/");
    this.slime_plop_reverse.load(dir + "slime_plop_reverse/");

    this.force_field.load(dir + "force_field/");
    this.force_shield.load(dir + "force_shield/");
    
    this.fire_left.load(dir + "fire_left/");
    this.fire_right.load(dir + "fire_right/");
    this.fire_orb.load(dir + "fire_orb/");

    this.allTexturesLoading = true;
 
  
}

/* Async load image */
this.blockloadImage = function (src) {
  var supa = this;
  var newImg = new Image();
  newImg.src = src;
  this.loadingImages++;

  newImg.addEventListener('error', function () {
    console.error("Error loading " + src);
    supa.loadingImages--;
    if (supa.loadingImages == 0) {
      if (supa.allTexturesLoading)
        supa.callback();
    }
  });

  newImg.onload = function () {
    supa.loadingImages--;
    //console.log("Loaded " + src + "(" + supa.loadingImages + " left)");
    if (supa.loadingImages == 0) {
      if (supa.allTexturesLoading)
        supa.callback();
    }
  }

  return newImg;
}
  
}


/* Animation object that handles timing of animations */
function Animation(duration) {

  this.imageId = 0;
  this.duration = duration;

  this.reset=function(){
    this.imageId = 0;
  }

  this.getImage = function () {
    return this.images[this.imageId];
  }
  this.images = [];
  this.cooldownUntil = Date.now() + this.duration / this.images.length;
  this.load = function (dir) {


    var obj = loadJSON(dir + "info.json")
    var num_images = obj.num_images;

    // Set SRC:
    for (var i = 0; i < num_images; i++) {
      this.images[i] = tex.blockloadImage(dir + "" + i + ".png");
    }

    this.cooldownUntil = Date.now() + this.duration / this.images.length;


  }

  this.update = function () {


    if (Date.now() >= this.cooldownUntil) {
      this.imageId = (this.imageId + 1) % (this.images.length);
      this.cooldownUntil = Date.now() + this.duration / this.images.length;
    }
  }

}

/* Privides random texture for variants like Dumpster and Trash */
function VariantTexture() {

  this.cloneImage = function () {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
  this.images = [];
  this.load = function (dir) {

    var obj = loadJSON(dir + "info.json")
    var num_images = obj.num_images;

    // Set SRC:
    for (var i = 0; i < num_images; i++) {
      this.images[i] = tex.blockloadImage(dir + "" + i + ".png");
    }

  }

}