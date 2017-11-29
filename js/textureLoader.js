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
  this.dumpster = function(){
    var num = Math.floor(Math.random() * 4) + 1;
    switch(num){
      case 1: return this.dumpster1; break;
      case 2: return this.dumpster2; break;
      case 3: return this.dumpster3; break;
      case 4: return this.dumpster4; break;
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
  

   // Trash variation
   this.trash = function(){
    var num = Math.floor(Math.random() * 17) + 1;
    switch(num){
      case 1: return this.trash1; break;
      case 2: return this.trash2; break;
      case 3: return this.trash3; break;
      case 4: return this.trash4; break;
      case 5: return this.trash5; break;
      case 6: return this.trash6; break;
      case 7: return this.trash7; break;
      case 8: return this.trash8; break;
      case 9: return this.trash9; break;
      case 10: return this.trash10; break;
      case 11: return this.trash11; break;
      case 12: return this.trash12; break;
      case 13: return this.trash13; break;
      case 14: return this.trash14; break;
      case 15: return this.trash15; break;
      case 16: return this.trash16; break;
      case 17: return this.trash17; break;
    }
    
  };

  this.wall = new Image();
  this.air = new Image();
  this.dirt = new Image();
  this.exit_open = new Image();
  this.exit_closed = new Image();
  this.steel_wall = new Image();
  
  this.load = function() {
    this.player_neutral.src = "img/p.png";
    this.player_up.src = "img/p_up.png";
    this.player_down.src = "img/p_down.png";
    this.player_left.src = "img/p_left.png";
    this.player_right.src = "img/p_right.png";

    this.wall.src = "img/wall.png";
    this.exit_closed.src = "img/exit_closed.png";
    this.exit_open.src = "img/exit_open.png";
    this.dumpster1.src = "img/dumpster1.png";
    this.dumpster2.src = "img/dumpster2.png";
    this.dumpster3.src = "img/dumpster3.png";
    this.dumpster4.src = "img/dumpster4.png";

    this.trash1.src = "img/trash1.png";
    this.trash2.src = "img/trash2.png";
    this.trash3.src = "img/trash3.png";
    this.trash4.src = "img/trash4.png";
    this.trash5.src = "img/trash5.png";
    this.trash6.src = "img/trash6.png";
    this.trash7.src = "img/trash7.png";
    this.trash8.src = "img/trash8.png";
    this.trash9.src = "img/trash9.png";
    this.trash10.src = "img/trash10.png";
    this.trash11.src = "img/trash11.png";
    this.trash12.src = "img/trash12.png";
    this.trash13.src = "img/trash13.png";
    this.trash14.src = "img/trash14.png";
    this.trash15.src = "img/trash15.png";
    this.trash16.src = "img/trash16.png";
    this.trash17.src = "img/trash17.png";
    
    
    this.air.src = "img/air.png";    
    this.dirt.src = "img/dirt.png";    
    this.steel_wall.src = "img/steel_wall.png";    
    
  }


}