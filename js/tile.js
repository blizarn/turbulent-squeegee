/*jshint esnext: true*/
/* jshint -W117 */
function Tile() {
    
    var a = Math.round(Math.random());
    
    if (a === 1) {
        return 0;
    } else if (a === 0) return 1;
    
}
roadType = {FOURWAY: 2, THREENORTH: 3, THREESOUTH: 4,
            THREEEAST: 5, THREEWEST: 6, VERTICAL: 7, 
            HORIZONTAL: 8, SW: 9, SE: 10, NW: 11, NE: 12};