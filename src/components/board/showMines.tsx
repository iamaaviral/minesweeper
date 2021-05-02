import React from 'react'
import { shuffle } from '../../utils/ShuffleBoard'
import { calcNeighbourCount } from '../../utils/NeighbourCount'
import { floodfill } from '../../utils/FloodFill'
import bomb from '../../assets/bomb.svg'
import red_flag from '../../assets/red-flag.svg'

type Props = {
    data: {
        height: number,
        width: number,
        minesCount: number
    }
}

const ShowMines = (prop: Props) => {
    const { height, width, minesCount } = prop.data;

    const [markStatus, setMarkStatus] = React.useState<Array<number>>([])
    const [openStatus, setOpenStatus] = React.useState<Array<number>>([])
    const [neighbourMineCount, setNeighbourMineCount] = React.useState<Array<number>>([])
    const [mines, setMines] = React.useState<Array<number>>([])
    const [gameOver, setGameOver] = React.useState<boolean>(false)
    const [selectedMineCount, setselectedMineCount] = React.useState<number>(0)


    const handleClickLeft = (x: number, y: number): void => {
        if (gameOver) {
            return;
        }
        const index = x * width + y;
        if (openStatus[index] === 1 || markStatus[index] === 1) {
            return;
        }
        if (mines[index]) {
            const newOpenStatus = openStatus.slice(0);
            newOpenStatus[index] = 1;
            setOpenStatus(newOpenStatus)
            setGameOver(true)
            return;
        }

        if (neighbourMineCount[index] > 0) {
            const newOpenStatus = openStatus.slice(0);
            newOpenStatus[index] = 1;
            setOpenStatus(newOpenStatus)
            return;
        }

        const newOpenStatus = openStatus.slice(0);
        floodfill(x, y, newOpenStatus, width, height, neighbourMineCount);
        setOpenStatus(newOpenStatus)
    }

    const handleClickRight = (x: number, y: number) => {
        if (gameOver) {
            return;
        }
        const index = x * width + y;
        if (openStatus[index] === 1) {
            return;
        }
        const newmarkStatus = markStatus.slice(0);
        newmarkStatus[index] = (newmarkStatus[index] + 1) % 2;
        let newselectedMineCount = selectedMineCount;
        if (newmarkStatus[index]) {
            newselectedMineCount++;
        } else {
            newselectedMineCount--;
        }
        setMarkStatus(newmarkStatus);
        setselectedMineCount(newselectedMineCount)
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
        setGameOver(false)
        setselectedMineCount(0)
    }, [height, width, minesCount])

    React.useEffect(() => {
        if (selectedMineCount === minesCount) {
            const match = mines.every((isMine, index) => {
                if ((isMine && markStatus[index] === 1) || (!isMine && markStatus[index] !== 1)) {
                    return true;
                }
                return false;
            });
            if (match) {
                setGameOver(true)
            }
        }
    }, [selectedMineCount])

    const minesArray = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const index = i * width + j;
            let icon = null;
            if (markStatus[index] === 1) {

                icon = (
                    <span className="each-cell" id="mark-1" style={{ color: 'red' }}><img src={red_flag} /></span>
                );
            }
            else if (openStatus[index] === 1) {

                if (mines[index]) {
                    icon = (
                        <span className="each-cell" id="mine-1"><img src={bomb} /></span>
                    );
                } else if (neighbourMineCount[index] > 0) {
                    icon = (
                        <span id="no-mine-1">
                            {neighbourMineCount[index]}
                        </span>
                    );
                }
            }
            row.push(
                <div
                    className={`mine-sweeper-item ${openStatus[index] ? 'is-open' : ''}`}
                    key={j}
                    onClick={() => handleClickLeft(i, j)}
                    onContextMenu={(e) => handleClickRight(i, j)}
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
            <div className="panel-container">
                <div className="panel-data-container">
                    <div>
                        selected: {selectedMineCount}
                    </div>
                    <div>
                        Total mines: {minesCount}
                    </div>
                </div>
                <div className="result-container">
                    {gameOver ? <div>Game over</div> : <div>Game in progress</div>}
                    {gameOver ? markStatus.length === mines.length && markStatus.every((value, index) => value === mines[index]) ? <div>You won</div> : <div>You lost</div> : null}
                </div>
            </div>
        </div>
    );
}

export default ShowMines