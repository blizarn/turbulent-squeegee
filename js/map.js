/* jshint -W117 */
function Map(x) {
    this.val = new Array(x);
    
    noise.seed(Math.random());
    
    for (var i = 0; i < x; i++) {
        this.val[i] = new Array(x);
        for (var j = 0; j < x; j++) {
            var id = (noise.simplex2(i, j));
            if (id < -0.45) {
                this.val[i][j] = 1;
            } else {
                this.val[i][j] = 0;
            }
        }
    }
}

Map.prototype.update = function update() {
    for (var i=0; i < this.val.length; i++) {
        for (var j=0; j < this.val.length; j++) {
            //this.val[i][j].update();
        }
    }
};

Map.prototype.render = function render(x, y, tile) {
    
    var xd = (x - Game.Camera.getX()/32) * 32;
    var yd = (y - Game.Camera.getY()/32) * 32;
    var x1 = CartToIso(xd, yd);
    x1[0] = Math.floor(x1[0] - 32);
    var screenCheck = CartToIso(xd+16, yd+16);
    if (screenCheck[0] >= 32 && screenCheck[1] >= 32 && screenCheck[0] <= canvas.width-32 && screenCheck[1] <= canvas.height-32) {
    
    switch(tile) {  
        case 0:
            context.drawImage(Game.spriteSheet, 63, 0, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 1:
            context.drawImage(Game.spriteSheet, 0, 0, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 2:
            //Fourway
            context.drawImage(Game.spriteSheet, 0, 32, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 3:
            //Threeway North
            context.drawImage(Game.spriteSheet, 63, 64, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 4:
            //Threeway South
            context.drawImage(Game.spriteSheet, 126, 96, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 5:
            //Threeway East
            context.drawImage(Game.spriteSheet, 126, 64, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 6:
            //Threeway West
            context.drawImage(Game.spriteSheet, 63, 96, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 7:
            //Vertical
            context.drawImage(Game.spriteSheet, 126, 32, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 8:
            //Horizontal
            context.drawImage(Game.spriteSheet, 63, 32, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 9:
            //South-West
            context.drawImage(Game.spriteSheet, 0, 64, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 10:
            //South-East
            context.drawImage(Game.spriteSheet, 189, 64, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 11:
            //North-West
            context.drawImage(Game.spriteSheet, 189, 32, 64, 32, x1[0], x1[1], 64, 32);
            break;
        case 12:
            //North-East
            context.drawImage(Game.spriteSheet, 0, 96, 64, 32, x1[0], x1[1], 64, 32);
            break;
        }
        
    }
};

Map.prototype.draw = function draw() {
    for (var i=Math.floor(Math.max(0, (Game.Camera.getX()-canvas.width)/32)); i < Math.min(Game.Map.val.length, (Game.Camera.getX()+canvas.width)/32); i++) {
        for (var j=Math.floor(Math.max(0, (Game.Camera.getY()-canvas.height*1.5)/32)); j < Math.min(Game.Map.val.length, (Game.Camera.getY()+canvas.height*1.5)/32); j++) {
            this.render(i, j, Game.Map.val[i][j]);
        }
    }
};
