export function floodfill(
    x:number,
    y:number,
    openStatus:Array<number>,
    width:number,
    height:number,
    neighbourMineCount:Array<number>
):void{
    if (x < 0 || y < 0 || x === height || y === width) {
        return;
    }
    const index = x * width + y;
    if (openStatus[index] === 1) {
        return;
    }
    openStatus[index] = 1;
    if (neighbourMineCount[index] > 0) {
        return;
    }
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            floodfill(x + i, y + j,openStatus,width,height,neighbourMineCount);
        }
    }
}