function Camera(xa, ya, xb, yb, Game) {
    var x = xa;
    var y = ya;
    var boundaryX = xb;
    var boundaryY = yb;
    var speed = 16;
    
    this.getY = function getY() {return y;};
    this.getX = function getX() {return x;};
    this.update = function update() {
        if (Game.controls.left === true) {
            if (x > 0) x -= speed;
            if (y < boundaryY) y += speed;
        }
    
        if (Game.controls.right === true) {
            if (x < boundaryX) x += speed;
            if (y > 0) y -= speed;
        }
    
        //Vertical
        if (Game.controls.up === true) {
            if (y > 0) y -= speed;
            if (x > 0) x -= speed;
        }
    
        if (Game.controls.down === true) {
            if (y < boundaryY) y += speed;
            if (x < boundaryX) x += speed;
        }
        
    };
    
    this.draw = function draw(ctx) {
        Game.Map.draw(x, y, ctx);
    };
}