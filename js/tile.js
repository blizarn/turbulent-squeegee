/*jshint esnext: true*/
/* jshint -W117 */
function Tile() {
    
    /*this.x = sx;
    this.y = sy;
    this.spriteX = sx*2;
    this.spriteY = sy;
    var x, y;
    this.data = undefined;
    
    this.tiles = {GRASS: 1, STONE: 2, OCCUPIED: 3};*/
    
    var a = Math.round(Math.random());
    
    if (a === 1) {
        return 0;
    } else if (a === 0) return 1;
    
    /*this.update = function update() {
        x = this.x - (Game.Camera.getX()/32);
        y = this.y - (Game.Camera.getY()/32);
        if (this.data !== undefined) this.data.update();
    };
    
    this.draw = function draw() {
        var xd = (x)*32;
        var yd = (y)*32;
        var x1 = CartToIso(xd, yd);
        var border = 32;
        var screenCheck = CartToIso(xd+16, yd+16);
        if (screenCheck[0] > border && screenCheck[1] > border && screenCheck[0] < canvas.width-border && screenCheck[1] < canvas.height-border) {
            
            switch(this.type) {
                case this.tiles.GRASS:
                    return 0;
                    break;
                case this.tiles.STONE:
                    return 1;
                case this.tiles.OCCUPIED:
                    //window.console.log(this.data);
                    this.data.draw();
            }
        }
    };*/
}
roadType = {FOURWAY: 1, THREENORTH: 2, THREESOUTH: 3,
            THREEEAST: 4, THREEWEST: 5, VERTICAL: 6, 
            HORIZONTAL: 7, SW: 8, SE: 9, NW: 10, NE: 11};
/* function Road(tile, type) {
    
    var place = tile;
    var x, y;
    this.type = type;
    
    this.update = function update() {
        x = place.x - (Game.Camera.getX()/32);
        y = place.y - (Game.Camera.getY()/32);
    };
    
    this.draw = function draw() {
        var xd = (x)*32;
        var yd = (y)*32;
        var x1 = CartToIso(xd, yd);

        var screenCheck = CartToIso(xd+16, yd+16);
        if (screenCheck[0] >= 32 && screenCheck[1] >= 32 && screenCheck[0] <= canvas.width-32 && screenCheck[1] <= canvas.height-32) {
            
            switch(this.type) {
                case roadType.FOURWAY:
                    context.drawImage(Game.spriteSheet, 0, 32, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.THREENORTH:
                    context.drawImage(Game.spriteSheet, 63, 64, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.THREESOUTH:
                    context.drawImage(Game.spriteSheet, 126, 96, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.THREEEAST:
                    context.drawImage(Game.spriteSheet, 126, 64, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.THREEWEST:
                    context.drawImage(Game.spriteSheet, 63, 96, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.VERTICAL: 
                    context.drawImage(Game.spriteSheet, 126, 32, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.HORIZONTAL:
                    context.drawImage(Game.spriteSheet, 63, 32, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.SW:
                    context.drawImage(Game.spriteSheet, 0, 64, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.SE:
                    context.drawImage(Game.spriteSheet, 189, 64, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.NW:
                    context.drawImage(Game.spriteSheet, 189, 32, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
                case roadType.NE:
                    context.drawImage(Game.spriteSheet, 0, 96, 64, 32, Math.floor(x1[0]-32), x1[1], 64, 32);
                    break;
            }
        }
    };
    
} */