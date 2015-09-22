/*
 * Please see the included LICENSE.md file for license terms and conditions.
 */
/* jshint browser:true */
/* jshint -W117 */
var Game = {};
var canvas = document.getElementById('gameScene');
var context = canvas.getContext('2d');
Game.spriteSheet = new Image();
Game.spriteSheet.src = "asset/tiles.png";

var MapSize = 128;

var GameLoop = function GameLoop() {
    Game.Camera.update();
    context.clearRect(0, 0, canvas.width, canvas.height);
    Game.Camera.draw();
    window.requestAnimationFrame(GameLoop);
};

function CartToIso(x, y) {
    var x1 = (x - y);
    var y1 = (x+y)/2;
    return [x1 + Math.floor(canvas.width/2), y1 + Math.floor(canvas.height/2)];
}

function IsoToCart(x, y) {
    var x1 = (2*y + x)/2;
    var y1 = (2*y - x)/2;
    return [x1, y1];
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
        
Game.controls = {};
Game.controls.Mouse = {};
canvas.addEventListener("click", function(e){ 
    var button = e.button;
    Game.controls.Mouse.Pos = IsoToCart(e.clientX - canvas.width/2, e.clientY - canvas.height/2);
    var mouse = Game.controls.Mouse.Pos;
    mouse[0] = Math.floor(mouse[0]/32 + Game.Camera.getX()/32);
    mouse[1] = Math.floor(mouse[1]/32 + Game.Camera.getY()/32);
    //mouse[0] += Math.floor(Game.Camera.getX()/32);
    //mouse[1] += Math.floor(Game.Camera.getY()/32);
    switch(button) {
        case 0:
            Game.controls.Mouse.leftbutton = true;
            break;
        case 1:
            Game.controls.Mouse.wheelbutton = true;
            break;
        case 2:
            Game.controls.Mouse.rightbutton = true;
            break;
    }
    
    window.requestAnimationFrame(function(){
        switch(button) {
            case 0:
                Game.controls.Mouse.leftbutton = false;
                break;
            case 1:
                Game.controls.Mouse.wheelbutton = false;
                break;
            case 2:
                Game.controls.Mouse.rightbutton = false;
                break;
        }
    });
    
}, false);


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

Game.tools = {};
Game.tools.Road = new RoadTool();
Game.Map = new Map(MapSize);
Game.Camera = new this.Camera(0, 0);
Game.spriteSheet.onload = function(){GameLoop();};
