function TexturesBundle() {
  this.loadingImages = 0;
  this.allTexturesLoading = false;

  this.player_neutral = new Image();
  this.player_up = new Image();
  this.player_down = new Image();
  this.player_left = new Image();
  this.player_right = new Image();

  this.dumpster1 = new Image();
  this.dumpster2 = new Image();
  this.dumpster3 = new Image();
  this.dumpster4 = new Image();

  // Dumpster variation
  this.dumpster = function () {
    var num = Math.floor(Math.random() * 4) + 1;
    switch (num) {
      case 1:
        return this.dumpster1;
        break;
      case 2:
        return this.dumpster2;
        break;
      case 3:
        return this.dumpster3;
        break;
      case 4:
        return this.dumpster4;
        break;
    }

  };

  this.trash1 = new Image();
  this.trash2 = new Image();
  this.trash3 = new Image();
  this.trash4 = new Image();
  this.trash5 = new Image();
  this.trash6 = new Image();
  this.trash7 = new Image();
  this.trash8 = new Image();
  this.trash9 = new Image();
  this.trash10 = new Image();
  this.trash11 = new Image();
  this.trash12 = new Image();
  this.trash13 = new Image();
  this.trash14 = new Image();
  this.trash15 = new Image();
  this.trash16 = new Image();
  this.trash17 = new Image();
  this.trash18 = new Image();


  // Trash variation
  this.trash = function () {
    var num = Math.floor(Math.random() * 18) + 1;
    switch (num) {
      case 1:
        return this.trash1;
        break;
      case 2:
        return this.trash2;
        break;
      case 3:
        return this.trash3;
        break;
      case 4:
        return this.trash4;
        break;
      case 5:
        return this.trash5;
        break;
      case 6:
        return this.trash6;
        break;
      case 7:
        return this.trash7;
        break;
      case 8:
        return this.trash8;
        break;
      case 9:
        return this.trash9;
        break;
      case 10:
        return this.trash10;
        break;
      case 11:
        return this.trash11;
        break;
      case 12:
        return this.trash12;
        break;
      case 13:
        return this.trash13;
        break;
      case 14:
        return this.trash14;
        break;
      case 15:
        return this.trash15;
        break;
      case 16:
        return this.trash16;
        break;
      case 17:
        return this.trash17;
        break;
      case 18:
        return this.trash18;
        break;
    }

  };

  this.wall = new Image();
  this.air = new Image();
  this.dirt = new Image();
  this.exit_open = new Image();
  this.exit_closed = new Image();
  this.steel_wall = new Image();

  this.fire = new Image();
  this.fire_ball = new Image();
  this.force_field = new Image();
  this.bomb = new Image();
  this.blue_wall = new Image();
  this.sewer = new Image();
  this.silver_monster = new Image();

  this.slime_explosion = new Animation(1000);
  this.fire_explosion = new Animation(1000);
  this.silver_monster_anim = new Animation(1500);
  this.callback = null;
  this.load = function (dir, callback) {
    this.callback = callback;
    this.player_neutral = this.blockloadImage(dir + "p.png");
    this.player_up = this.blockloadImage(dir + "p_up.png");
    this.player_down = this.blockloadImage(dir + "p_down.png");
    this.player_left = this.blockloadImage(dir + "p_left.png");
    this.player_right = this.blockloadImage(dir + "p_right.png");

    this.wall = this.blockloadImage(dir + "wall.png");
    this.exit_closed = this.blockloadImage(dir + "exit_closed.png");
    this.exit_open = this.blockloadImage(dir + "exit_open.png");
    this.dumpster1 = this.blockloadImage(dir + "dumpster1.png");
    this.dumpster2 = this.blockloadImage(dir + "dumpster2.png");
    this.dumpster3 = this.blockloadImage(dir + "dumpster3.png");
    this.dumpster4 = this.blockloadImage(dir + "dumpster4.png");

    this.trash1 = this.blockloadImage(dir + "trash1.png");
    this.trash2 = this.blockloadImage(dir + "trash2.png");
    this.trash3 = this.blockloadImage(dir + "trash3.png");
    this.trash4 = this.blockloadImage(dir + "trash4.png");
    this.trash5 = this.blockloadImage(dir + "trash5.png");
    this.trash6 = this.blockloadImage(dir + "trash6.png");
    this.trash7 = this.blockloadImage(dir + "trash7.png");
    this.trash8 = this.blockloadImage(dir + "trash8.png");
    this.trash9 = this.blockloadImage(dir + "trash9.png");
    this.trash10 = this.blockloadImage(dir + "trash10.png");
    this.trash11 = this.blockloadImage(dir + "trash11.png");
    this.trash12 = this.blockloadImage(dir + "trash12.png");
    this.trash13 = this.blockloadImage(dir + "trash13.png");
    this.trash14 = this.blockloadImage(dir + "trash14.png");
    this.trash15 = this.blockloadImage(dir + "trash15.png");
    this.trash16 = this.blockloadImage(dir + "trash16.png");
    this.trash17 = this.blockloadImage(dir + "trash17.png");
    this.trash18 = this.blockloadImage(dir + "trash18.png");

    this.air = this.blockloadImage(dir + "air.png");
    this.dirt = this.blockloadImage(dir + "dirt.png");
    this.steel_wall = this.blockloadImage(dir + "steel_wall.png");

    this.bomb = this.blockloadImage(dir + "bomb.png");
    this.force_field = this.blockloadImage(dir + "force_field.png");
    this.fire_ball = this.blockloadImage(dir + "fire_ball.png");
    this.fire = this.blockloadImage(dir + "fire.png");
    this.blue_wall = this.blockloadImage(dir + "bluewall.png");
    this.sewer = this.blockloadImage(dir + "sewer.png");
    this.silver_monster = this.blockloadImage(dir + "silver_monster.png");


    this.slime_explosion.load(dir + "slime_explosion/");
    this.fire_explosion.load(dir + "fire_explosion/");
    this.silver_monster_anim.load(dir + "silver_monster/");

    this.allTexturesLoading = true;
 
  
}

this.blockloadImage = function (src) {
  //console.log("Loading " + src);
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



function Animation(duration) {

  this.imageId = 0;
  this.duration = duration;
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