/*jshint esnext: true*/
/* jshint -W117 */
function Tile(x, y) {
    
    this.x = x;
    this.y = y;
    this.spriteX = x*2;
    this.spriteY = y;
    
    var data = {};
    
    var tiles = {GRASS: 1, STONE: 2};
    
    var a = Math.round(Math.random());
    
    if (a === 1) {
        this.type = tiles.GRASS;
    } else if (a === 0) this.type = tiles.STONE;
    
    this.update = function update() {
        
    };
    
    this.draw = function draw() {
        var xd = (this.x-Game.Camera.getX()/32)*32;
        var yd = (this.y-Game.Camera.getY()/32)*32;
        var x1 = CartToIso(xd-16, yd-16);

        var screenCheck = CartToIso(xd, yd);
        if (screenCheck[0] > 32 && screenCheck[1] > 32 && screenCheck[0] < canvas.width-32 && screenCheck[1] < canvas.height-32) {
            
            switch(this.type) {
                case tiles.GRASS:
                    context.drawImage(Game.spriteSheet, 65, 0, 64, 32, (x1[0] - 32), x1[1], 64, 32);
                    break;
                case tiles.STONE:
                    context.drawImage(Game.spriteSheet, 0, 0, 64, 32, (x1[0] - 32), x1[1], 64, 32);
                    break;
            }
        }
    };
}