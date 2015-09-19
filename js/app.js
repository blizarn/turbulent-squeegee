/*
 * Please see the included LICENSE.md file for license terms and conditions.
 */
/* jshint browser:true */
var Game = {};
var canvas = document.getElementById('gameScene');
var context = canvas.getContext('2d');
Game.spriteSheet = new Image();
Game.spriteSheet.src = "asset/tiles.png";

var GameLoop = function GameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    Game.Map.update();
    Game.Camera.update();
    Game.Camera.draw();
    window.requestAnimationFrame(GameLoop);
};

function CartToIso(x, y) {
    var x1 = (x - y);
    var y1 = (x+y)/2;
    return [(x1 + canvas.width/2), (y1 + canvas.height/2)];
}

function IsoToCart(x, y) {
    var x1 = (2*y + x)/2;
    var y1 = (2*y - x)/2;
    return [x1, y1];
}

function Map(x) {
    this.val = new Array(x);
    for (var i = 0; i < x; i++) {
        this.val[i] = new Array(x);
        for (var j = 0; j < x; j++) {
            this.val[i][j] = new window.Tile(i, j);
        }
    }


this.update = function update() {
    
};

this.draw = function draw(x, y, ctx) {
    for (var i=0; i < 128; i++) {
        for (var j=0; j < 128; j++) {
            this.val[i][j].draw();
        }
    }
};
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
        
Game.controls = {};
        
window.addEventListener("keydown", function(e){
    switch(e.keyCode)
    {
        case 37: // left arrow
            Game.controls.left = true;
            break;
        case 38: // up arrow
            Game.controls.up = true;
            break;
        case 39: // right arrow
            Game.controls.right = true;
            break;
        case 40: // down arrow
            Game.controls.down = true;
            break;
    }
}, false);
    
window.addEventListener("keyup", function(e){
    switch(e.keyCode)
    {
        case 37: // left arrow
            Game.controls.left = false;
            break;
        case 38: // up arrow
            Game.controls.up = false;
            break;
        case 39: // right arrow
            Game.controls.right = false;
            break;
        case 40: // down arrow
            Game.controls.down = false;
            break;
        case 80: // key P pauses the game
            //Game.togglePause();
            break;		
    }
}, false);
        
Game.Camera = new this.Camera(128*16, 128*16, 128*32, 128*32, Game);
Game.Map = new Map(128);
Game.spriteSheet.onload = function(){GameLoop();};
