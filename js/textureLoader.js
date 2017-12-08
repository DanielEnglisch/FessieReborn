function TexturesBundle() {
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
  this.bluewall = new Image();
  this.sewer = new Image();
  this.silver_monster = new Image();

  this.slime_explosion = new Animation(1000);
  this.fire_explosion = new Animation(1000);
  this.silver_monster_anim = new Animation(1500);
  
  this.load = function (dir) {
    this.player_neutral.src = dir + "p.png";
    this.player_up.src = dir + "p_up.png";
    this.player_down.src = dir + "p_down.png";
    this.player_left.src = dir + "p_left.png";
    this.player_right.src = dir + "p_right.png";

    this.wall.src = dir + "wall.png";
    this.exit_closed.src = dir + "exit_closed.png";
    this.exit_open.src = dir + "exit_open.png";
    this.dumpster1.src = dir + "dumpster1.png";
    this.dumpster2.src = dir + "dumpster2.png";
    this.dumpster3.src = dir + "dumpster3.png";
    this.dumpster4.src = dir + "dumpster4.png";

    this.trash1.src = dir + "trash1.png";
    this.trash2.src = dir + "trash2.png";
    this.trash3.src = dir + "trash3.png";
    this.trash4.src = dir + "trash4.png";
    this.trash5.src = dir + "trash5.png";
    this.trash6.src = dir + "trash6.png";
    this.trash7.src = dir + "trash7.png";
    this.trash8.src = dir + "trash8.png";
    this.trash9.src = dir + "trash9.png";
    this.trash10.src = dir + "trash10.png";
    this.trash11.src = dir + "trash11.png";
    this.trash12.src = dir + "trash12.png";
    this.trash13.src = dir + "trash13.png";
    this.trash14.src = dir + "trash14.png";
    this.trash15.src = dir + "trash15.png";
    this.trash16.src = dir + "trash16.png";
    this.trash17.src = dir + "trash17.png";
    this.trash18.src = dir + "trash18.png";

    this.air.src = dir + "air.png";
    this.dirt.src = dir + "dirt.png";
    this.steel_wall.src = dir + "steel_wall.png";

    this.bomb.src = dir + "bomb.png";
    this.force_field.src = dir + "force_field.png";
    this.fire_ball.src = dir + "fire_ball.png";
    this.fire.src = dir + "fire.png";
    this.bluewall.src = dir + "bluewall.png";
    this.sewer.src = dir + "sewer.png";

    this.silver_monster.src = dir + "silver_monster.png";
    this.slime_explosion.load(dir + "slime_explosion/");
    this.fire_explosion.load(dir + "fire_explosion/");
    this.silver_monster_anim.load(dir + "silver_monster/");
    console.log("Loaded all textures!");
  }


}

function Animation(duration){

  this.imageId= 0;
  this.duration = duration;
  this.getImage = function(){
    return this.images[this.imageId];
  }
  this.images = [];
  this.cooldownUntil = Date.now() +  this.duration/this.images.length;
  this.load = function(dir){

    
    var obj= loadJSON(dir + "info.json")
      var num_images = obj.num_images;
      //Init
      for(var i = 0; i < num_images; i++){
        this.images[i] = new Image();
      }

      // Set SRC:
      for(var i = 0; i < num_images; i++){
        this.images[i].src = dir + "" + i +".png";
      }

      this.cooldownUntil = Date.now() +  this.duration/this.images.length;

      
  }

  this.update = function(){

    
    if (Date.now() >= this.cooldownUntil) {
      this.imageId = (this.imageId+1) % (this.images.length);    
      this.cooldownUntil = Date.now() + this.duration/this.images.length;
    }
  }



}