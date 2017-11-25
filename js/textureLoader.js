function TexturesBundle() {
  this.player_neutral = new Image();
  this.player_up = new Image();
  this.player_down = new Image();
  this.player_left = new Image();
  this.player_right = new Image();

  this.dumpster = new Image();
  this.wall = new Image();
  this.trash = new Image();
  
  this.load = function() {
    this.player_neutral.src = "img/p.png";
    this.player_up.src = "img/p_up.png";
    this.player_down.src = "img/p_down.png";
    this.player_left.src = "img/p_left.png";
    this.player_right.src = "img/p_right.png";

    this.wall.src = "img/wall.png";
    this.dumpster.src = "img/dumpster.png";
    this.trash.src = "img/trash.png";
    
  }


}