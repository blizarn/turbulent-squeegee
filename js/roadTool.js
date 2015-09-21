/*jshint -W117*/
function RoadTool() {
    
    var origin;
    var active = false;
    var endPoint;
    this.begin = function begin() {
        var cursor = Game.controls.Mouse.Pos;
        origin = cursor;
        active = true;
        window.console.log(cursor);
        var start = Game.Map.val[cursor[0]][cursor[1]];
    };
    
    this.getActive = function getActive() {return active;};
    
    this.end = function end() {
        
        endPoint = Game.controls.Mouse.Pos;
        
        if (endPoint[0] >= origin[0]) {
            if (endPoint[1] >= origin[1]) {
                build(origin, endPoint, origin);
            } else build([origin[0], endPoint[1]], [endPoint[0], origin[1]], origin);
        } else if (endPoint[1] >= origin[1]) {
            build([endPoint[0], origin[1]], [origin[0], endPoint[1]], origin);
        } else build(endPoint, origin, origin);
        
        origin = NaN;
        active = false;
    };
    
    this.drawPlacementLine = function drawPlacementLine() {
        
    };
    
    var checkTiles = function checkTiles(x, y, map) {
        var tileEast;
        if (x < map.length-1) {
            if (map[x+1][y].data !== undefined) tileEast = map[x+1][y].data.prototype;
        }
        var tileSouth;
        if (y < map[0].length-1) {
            if (map[x][y+1].data !== undefined) tileSouth = map[x][y+1].data.prototype;
        }
        var tileWest;
        if (x > 0) {
            if (map[x-1][y].data !== undefined) tileWest = map[x-1][y].data.prototype;
        }
        var tileNorth;
        if (y > 0) {
            if (map[x][y-1].data !== undefined) tileNorth = map[x][y-1].data.prototype;
        }
        var road = new Road().prototype;
        //All surrounding tiles are road
        if (tileEast === road && tileSouth === road && tileWest === road && tileNorth === road) {
            return 1;
        } else if (tileEast !== road) {
            //All but East is road
            return 2;
        } else if (tileWest !== road) {
            //All but West is road
            return 3;
        } else if (tileNorth !== road) {
            //All but North is road
            return 4;
        } else {
            return 5;
            //All but South is road
        }
        
        //North & South are road
        if (tileNorth === road && tileSouth === road) {
            return 6;
        }
        //East & West are road
        if (tileEast === road && tileWest === road) {
            return 7;
        }
        
        //Northeast
        if (tileNorth === road && tileEast === road) {
            return 8;
            //Southeast
        } else if (tileEast === road && tileSouth === road) {
            return 9;
            //Southwest
        } else if (tileSouth === road && tileWest === road) {
            return 10;
            //Northwest
        } else {
            return 11;
        }
        
        //North only
        if (tileNorth === road) {
            return 12;
            //East only
        } else if (tileEast === road) {
            return 13;
            //South only
        } else if (tileSouth === road) {
            return 14;
            //West only
        } else {
            return 15;
        }
    };
    
    var build = function build(pointA, pointB, origin) {
        var map = Game.Map.val;
        var tileCheck;
        if (pointB[0] - pointA[0] > pointB[1] - pointA[1]) {
            pointB[1] = origin[1];
            pointA[1] = origin[1];
        } else {
            pointB[0] = origin[0];
            pointA[0] = origin[0];
        }
        if (pointA[0] === pointB[0]) {
            for (var i = pointA[0]; i <= pointB[0]; i++) {
                for (var j = pointA[1]; j <= pointB[1]; j++) {
                    if (map[i][j] !== 0 || map[i][j] !== 1) {
                        map[i][j].type = map[i][j].tiles.OCCUPIED;
                        map[i][j].data = new Road(map[i][j], roadType.VERTICAL);
                    } else if (map[i][j].data.prototype === new Road().prototype) {
                        tileCheck = checkTiles(i, j, map);
                    }
                }
            }
        } else {
            for (var h = pointA[0]; h <= pointB[0]; h++) {
                for (var k = pointA[1]; k <= pointB[1]; k++) {
                    if (map[h][k].type !== map[h][k].tiles.OCCUPIED) {
                        map[h][k].type = map[h][k].tiles.OCCUPIED;
                        map[h][k].data = new Road(map[h][k], roadType.HORIZONTAL);
                    }
                }
            }
        }
    };
}