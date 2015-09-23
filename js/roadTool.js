/*global Game, roadType, build */
/*jslint plusplus: true */
function RoadTool() {
    'use strict';
    
    var origin, active = false, endPoint;
    
    this.begin = function begin() {
        var cursor = Game.controls.Mouse.Pos;
        origin = cursor;
        active = true;
        Game.Map.val[cursor[0]][cursor[1]] = roadType.FOURWAY;
    };
    
    this.getActive = function getActive() {return active; };
    
    this.end = function end() {
        
        endPoint = Game.controls.Mouse.Pos;
        
        if (endPoint[0] >= origin[0]) {
            if (endPoint[1] >= origin[1]) {
                build(origin, endPoint, origin);
            } else { build([origin[0], endPoint[1]], [endPoint[0], origin[1]], origin); }
        } else if (endPoint[1] >= origin[1]) {
            build([endPoint[0], origin[1]], [origin[0], endPoint[1]], origin);
        } else { build(endPoint, origin, origin); }
        
        origin = NaN;
        active = false;
    };
    
    this.drawPlacementLine = function drawPlacementLine() {
        
    };
    
    var checkTiles = function checkTiles(x, y, map, df, recur) {
        var config;
        var north = 1;
        var east = 2;
        var south = 4;
        var west = 8;
        //North
        if (y > 0) {
            if (map[x][y - 1] !== 0 && map[x][y - 1] !== 1) {
                config |= north;
            }
        }
        //East
        if (x < map.length - 1) {
            if (map[x + 1][y] !== 0 && map[x + 1][y] !== 1) {
                //East
                config |= east;
            }
        }
        //South
        if (y < map[0].length - 1) {
            if (map[x][y + 1] !== 0 && map[x][y + 1] !== 1) {
                config |= south;
            }
        }
        //West
        if (x > 0) {
            if (map[x - 1][y] !== 0 && map[x - 1][y] !== 1) {
                config |= west;
            }
        }
        
        if (config === 0) {
            map[x][y] = df;
        } else {
            switch (config) {
                case (north | south | east | west):
                    df = roadType.FOURWAY;
                    break;
                case (north | south | east):
                    df = roadType.THREEEAST;
                    break;
                case (north | south | west):
                    df = roadType.THREEWEST;
                    break;
                case (north | east | west):
                    df = roadType.THREENORTH;
                    break;
                case (north | south):
                    df = roadType.VERTICAL;
                    break;
                case (north | east):
                    df = roadType.NE;
                    break;
                case (north | west):
                    df = roadType.NW;
                    break;
                case (north):
                    df = roadType.VERTICAL;
                    break;
                case (south | east):
                    df = roadType.SE;
                    break;
                case (south | west):
                    df = roadType.SW;
                    break;
                case (south | east | west):
                    df = roadType.THREESOUTH;
                    break;
                case (south):
                    df = roadType.VERTICAL;
                    break;
                case (east | west):
                    df = roadType.HORIZONTAL;
                    break;
                case (east):
                    df = roadType.HORIZONTAL;
                    break;
                case (west):
                    df = roadType.HORIZONTAL;
                    break;
            }
            map[x][y] = df;
        }
        
        if (recur === false) {
            if (x < map.length - 1) subUpdate(x + 1, y, map);
            if (x > 0) subUpdate(x - 1, y, map);
            if (y < map.length - 1) subUpdate(x, y + 1, map);
            if (y > 0) subUpdate(x, y - 1, map);
        }
    };
    
    var subUpdate = function subUpdate(x, y, map) {
        for (var type in roadType) {
            if (map[x][y] === roadType[type]) {
                checkTiles(x, y, map, 0, true);
            }
        }
    };
    
    var build = function build(pointA, pointB, origin) {
            
            var map = Game.Map.val, tileCheck, i = 0, j = 0, h = 0, k = 0;
            
            if (pointB[0] - pointA[0] > pointB[1] - pointA[1]) {
                pointB[1] = origin[1];
                pointA[1] = origin[1];
            } else {
                pointB[0] = origin[0];
                pointA[0] = origin[0];
            }
            if (pointA[0] === pointB[0]) {
                for (i = pointA[0]; i <= pointB[0]; i++) {
                    for (j = pointA[1]; j <= pointB[1]; j++) {
                        checkTiles(i, j, map, roadType.VERTICAL, false);
                    }
                }
            } else {
                for (h = pointA[0]; h <= pointB[0]; h++) {
                    for (k = pointA[1]; k <= pointB[1]; k++) {
                        checkTiles(h, k, map, roadType.HORIZONTAL, false);
                    }
                }
            }
        };
}
