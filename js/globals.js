const vol_music = 0.2;
const vol_sound = 0.7;

const EXPLOSION_DELAY  = 250;

var canvas = document.getElementById("screen");
var context = null;
const scale = 64;
const gravity = 0.05;
const movementSpeed = 0.075;
var items_left = 0;
var num_bombs = 0;
var STOP = false;

var timeOuts = [];
var xOffset = 0;
var yOffset = 0;

var fallables = [];
var player = null;
var world = [];
var exit = null;
var monsters = [];
var keys = [];
var explosion_overlays = [];

var tex = new TexturesBundle();
var audio = new AudioBundle();

var time = Date.now();
var ups = 120;


