
function AudioBundle() {
    this.dump_land = new Audio('audio/dumpster_land.wav');
    this.dump_move = new Audio('audio/dumpster_move.wav');
    this.trash_land = new Audio('audio/trash_land.wav');
    this.trash_collect = new Audio('audio/trash_collect.wav');

    this.dirt1 = new Audio('audio/dirt1.wav');
    this.dirt2 = new Audio('audio/dirt2.wav');
    this.dirt3 = new Audio('audio/dirt3.wav');
    this.dirt4 = new Audio('audio/dirt4.wav');
    
    
    this.music1 = new Audio('audio/music1.wav');
    this.music2 = new Audio('audio/music2.wav');
    this.music3 = new Audio('audio/music3.wav');
 
    this.walk = new Audio('audio/walk.wav');
    
    this.die = new Audio('audio/die.wav');
    
}

var startBackgroundMusic = function(){
    var num = Math.floor(Math.random() * 3) + 1;
    var newMusic = null;
    switch(num){
        case 1: newMusic = audio.music1.cloneNode();
         break;
         case 2: newMusic = audio.music2.cloneNode();
         break;
         case 3: newMusic = audio.music3.cloneNode();
         break;
    }

    newMusic.addEventListener('ended', function() {
        startBackgroundMusic();
    }, false);

    newMusic.play();
    
}

var playDirt = function(){
    var num = Math.floor(Math.random() * 4) + 1;
    var newMusic = null;
    switch(num){
        case 1: newMusic = audio.dirt1.cloneNode();
         break;
         case 2: newMusic = audio.dirt2.cloneNode();
         break;
         case 3: newMusic = audio.dirt3.cloneNode();
         break;
         case 4: newMusic = audio.dirt4.cloneNode();
         break;
    }
    newMusic.play();

}

var playAudio = function(audio){
    var sound = audio.cloneNode();
    sound.play();
}