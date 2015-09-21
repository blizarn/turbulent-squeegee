/*jshint -W117*/
function RoadTool() {
    
    var origin;
    var active = false;
    var endPoint;
    this.begin = function begin() {
        var cursor = Game.controls.Mouse.Pos;
        origin = cursor;
        active = true;
        Game.Map.val[cursor[0]][cursor[1]] = roadType.FOURWAY;
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
    
    var checkTiles = function checkTiles(x, y, map, df, end) {
        var config;
        //East
        if (x < map.length-1) {
            if (map[x+1][y] === 0 || map[x+1][y] === 1) {
                //None
                config = 0;
            } else {
                //East
                config = 1;
            }
        }
        //South
        if (y < map[0].length-1) {
            if (map[x][y+1] === 0 || map[x][y+1] === 1) {
                
            } else {
                switch(config) {
                    case 0:
                        //South
                        config = 2;
                        break;
                    case 1:
                        //South-East
                        config = 5;
                        break;
                }
            }
        }
        //West
        if (x > 0) {
            if (map[x-1][y] === 0 || map[x-1][y] === 1) {
                
            } else {
                switch(config) {
                    case 0:
                        //West
                        config = 3;
                        break;
                    case 1:
                        //East-West
                        config = 14;
                        break;
                    case 2:
                        //South-West
                        config = 6;
                        break;
                    case 5:
                        //South-East-West
                        config = 9;
                        break;
                }
            }
        }
        //North
        if (y > 0) {
            if (map[x][y-1] === 0 || map[x][y-1] === 1) {
                
            } else {
                switch(config) {
                    case 0:
                        //North
                        config = 4;
                        break;
                    case 1:
                        //North-East
                        config = 7;
                        break;
                    case 2:
                        //North-South
                        config = 15;
                        break;
                    case 3:
                        //North-West
                        config = 8;
                        break;
                    case 5:
                        //North-South-East
                        config = 10;
                        break;
                    case 6:
                        //North-South-West
                        config = 12;
                        break;
                    case 9:
                        //All sides
                        config = 13;
                        break;
                    case 14:
                        //North-East-West
                        config = 11;
                        break;
                }
            }
        }
        window.console.log(end);
        if (config === 0) {
            map[x][y] = df;
        } else {
            
            switch(df) {
                case roadType.HORIZONTAL:
                    switch(config) {
                        case 2:
                            //South
                            df = roadType.THREESOUTH;
                            break;
                        case 4:
                            //North
                            df = roadType.THREENORTH;
                            break;
                        case 5:
                            //South-East
                            if (end === true) {
                                df = roadType.SE;
                            } else {
                                df = roadType.THREESOUTH;
                            }
                            break;
                        case 6:
                            //South-West
                            df = roadType.THREESOUTH;
                            break;
                        case 7:
                            //North-East
                            df = roadType.THREENORTH;
                            break;
                        case 8:
                            //North-West
                            df = roadType.THREENORTH;
                            break;
                        case 9:
                            //South-East-West
                            df = roadType.THREESOUTH;
                            break;
                        case 10:
                            //North-South-East
                            df = roadType.THREEEAST;
                            break;
                        case 11:
                            //North-East-West
                            df = roadType.THREENORTH;
                            break;
                        case 12:
                            //North-South-West
                            if (end === true) {
                                df = roadType.THREEWEST;
                            } else {
                                df = roadType.FOURWAY;
                            }
                            break;
                        case 13:
                            //All
                            df = roadType.FOURWAY;
                            break;
                        case 15:
                            df = roadType.THREEEAST;
                    }
                    break;
                case roadType.VERTICAL:
                    switch(config) {
                        case 1:
                            //East
                            if (end === true) {
                                df = roadType.SE;
                            } else {
                                df = roadType.THREEEAST;
                            }
                            break;
                        case 3:
                            //West
                            if (end === true) {
                                df = roadType.SW;
                            } else {
                                df = roadType.THREEWEST;
                            }
                            break;
                        case 5:
                            //South-East
                            if (end === true) {
                                df = roadType.SE;
                            } else {
                                df = roadType.THREEEAST;
                            }
                            break;
                        case 6:
                            //South-West
                            if (end === true) {
                                df = roadType.SW;
                            } else {
                                df = roadType.THREEWEST;
                            }
                            break;
                        case 7:
                            //North-East
                            if (end === true) {
                                df = roadType.NE;
                            } else {
                                df = roadType.THREEEAST;
                            }
                            break;
                        case 8:
                            //North-West
                            if (end === true) {
                                df = roadType.NW;
                            } else {
                                window.console.log(end);
                                df = roadType.THREEWEST;
                            }
                            break;
                        case 9:
                            //South-East-West
                            df = roadType.FOURWAY;
                            break;
                        case 10:
                            //North-South-East
                            df = roadType.THREEEAST;
                            break;
                        case 11:
                            //North-East-West
                            if (end === true) {
                                df = roadType.THREENORTH;
                            } else {
                                df = roadType.FOURWAY;
                            }
                            break;
                        case 12:
                            //North-South-West
                            df = roadType.THREEWEST;
                            break;
                        case 13:
                            //All
                            df = roadType.FOURWAY;
                            break;
                    }
                    break;
            }
            map[x][y] = df;
            window.console.log(config);
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
                    if (map[i][j] === 0 || map[i][j] === 1) {
                        map[i][j] = roadType.VERTICAL;
                    } else {
                        if ((i === pointB[0] && j === pointB[1]) || (i === pointA[0] && j === pointA[1])) {
                            checkTiles(i, j, map, roadType.VERTICAL, true);
                            window.console.log([pointB, [i, j]]);
                        } else {
                            checkTiles(i, j, map, roadType.VERTICAL, false);
                        }
                    }
                }
            }
        } else {
            for (var h = pointA[0]; h <= pointB[0]; h++) {
                for (var k = pointA[1]; k <= pointB[1]; k++) {
                    if (map[h][k] === 0 || map[h][k] === 1) {
                        map[h][k] = roadType.HORIZONTAL;
                    } else {
                       if (h === pointB[0] && k === pointB[1]) {
                           checkTiles(h, k, map, roadType.HORIZONTAL, true);
                       } else {
                           checkTiles(h, k, map, roadType.HORIZONTAL, false); 
                       }
                    }
                }
            }
        }
    };
}
