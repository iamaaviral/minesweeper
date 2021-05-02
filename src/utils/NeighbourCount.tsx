export function calcNeighbourCount(width:number,height:number,mines:Array<number>):Array<number>{
    const result = new Array(mines.length).fill(0);
    for (let i = 0; i < result.length; i++) {
        if (!mines[i]) {
            continue;
        }
        const y = i % width;
        const x = (i - y) / width;
        for (let j = -1; j < 2; j++) {
            const newX = x + j;
            if (newX < 0 || newX === height) {
                continue;
            }
            for (let k = -1; k < 2; k++) {
                const newY = y + k;
                if (newY < 0 || newY ===width) {
                    continue;
                }
                result[newX * width + newY]++;
            }
        }
    }
    return result;
}
