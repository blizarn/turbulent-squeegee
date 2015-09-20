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
            if (x - speed> 0) {
                x -= speed;
            } else x = 0;
            if (y + speed < boundaryY) {
                y += speed;
            } else y = boundaryY;
        }
    
        if (Game.controls.right === true) {
            if (x + speed < boundaryX) {
                x += speed;
            } else x = boundaryX;
            if (y - speed > 0) {
                y -= speed;
            } else y = 0;
        }
    
        //Vertical
        if (Game.controls.up === true) {
            if (y - speed > 0) {
                y -= speed;
            } else y = 0;
            if (x - speed > 0) {
                x -= speed;
            } else x = 0;
        }
    
        if (Game.controls.down === true) {
            if (y + speed < boundaryY) {
                y += speed;
            } else y = boundaryY;
            if (x + speed < boundaryX) {
                x += speed;
            } else x = boundaryX;
        }
        
        //Mouse events
        if (Game.controls.Mouse.leftbutton === true && Game.tools.Road.getActive() === false) {
            Game.tools.Road.begin();
        } else if (Game.controls.Mouse.leftbutton === true && Game.tools.Road.getActive() === true) Game.tools.Road.end();
        
    };
    
    this.draw = function draw() {
        Game.Map.draw();
    };
}