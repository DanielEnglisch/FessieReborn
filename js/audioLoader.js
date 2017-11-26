
function AudioBundle() {
    this.dump_land = new Audio('audio/dumpster_land.wav');
    this.dump_move = new Audio('audio/dumpster_move.wav');
    this.trash_land = new Audio('audio/trash_land.wav');    
}

var playAudio = function(audio){
    var sound = audio.cloneNode();
    sound.play();
}