import React from 'react';
import './index.css';
import { shuffle } from '../../utils/ShuffleBoard'
import { calcNeighbourCount } from '../../utils/NeighbourCount'
import { floodfill } from '../../utils/FloodFill'

type Props = {
    height: number,
    width: number,
    mines: number
}


const ShowMines = (height: number, width: number, minesCount: number) => {

    const [markStatus, setMarkStatus] = React.useState<Array<number>>([])
    const [openStatus, setOpenStatus] = React.useState<Array<number>>([])
    const [neighbourMineCount, setNeighbourMineCount] = React.useState<Array<number>>([])
    const [mines, setMines] = React.useState<Array<number>>([])


    const handleClickLeft = (x: number, y: number): void => {

        const index = x * width + y;
        if (openStatus[index] === 1 || markStatus[index] === 1) {
            return;
        }
        if (mines[index]) {
            const newOpenStatus = openStatus.slice(0);
            newOpenStatus[index] = 1;
            setOpenStatus(newOpenStatus)

            return;
        }

        if (neighbourMineCount[index] > 0) {
            const newOpenStatus = openStatus.slice(0);
            newOpenStatus[index] = 1;
            setOpenStatus(newOpenStatus)
            return;
        }

        const newOpenStatus = openStatus.slice(0);
        floodfill(x, y, openStatus, width, height, neighbourMineCount);
        setOpenStatus(newOpenStatus)
    }

    React.useEffect(() => {
        const total = width * height;
        const mines = new Array(total).fill(0);
        for (let i = 0; i < minesCount; i++) {
            mines[i] = 1;
        }
        shuffle<number>(mines, minesCount);
        const neighbourMineCount = calcNeighbourCount(width, height, mines);
        setOpenStatus(new Array(total).fill(0))
        setMarkStatus(new Array(total).fill(0))
        setNeighbourMineCount(neighbourMineCount)
        setMines(mines)
    }, [height, width, minesCount])

    const minesArray = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const index = i * width + j;
            let icon = null;
            if (markStatus[index] === 1) {
                console.log("1")
                icon = (
                    <span className="iconfont">{index}</span>
                );
            } else if (markStatus[index] === 2) {
                console.log("2")
                icon = (
                    <span className="iconfont">{index}</span>
                );
            } else if (openStatus[index] === 1) {
                console.log("3")
                if (mines[index]) {
                    icon = (
                        <span className="iconfont">&#xe63a;</span>
                    );
                } else if (neighbourMineCount[index] > 0) {
                    console.log("4")
                    icon = (
                        <span>
                            {neighbourMineCount[index]}
                        </span>
                    );
                }
            }
            console.log(icon)
            row.push(
                <div
                    className={`mine-sweeper-item ${openStatus[index] ? 'is-open' : ''}`}
                    key={j}
                    onClick={() => handleClickLeft(i, j)}
                // onContextMenu={(e)=>this.handleClickRight(i,j)}
                >
                    {icon}
                </div>
            );
        }
        minesArray.push(
            <div className="mine-sweeper-row" key={i}>
                {row}
            </div>
        );
    }


    return (
        <div
            className="mine-sweeper-container"
            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        >
            {minesArray.map((e) => { return e })}
        </div>
    );
}

const Board = (props: Props) => {
    return (
        <div className="board-container">
            {ShowMines(props.height, props.width, props.mines)}
        </div>
    )
}

export default Board;