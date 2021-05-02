import './index.css';
import ShowMines from './showMines'

type Props = {
    height: number,
    width: number,
    minesCount: number
}

const Board = (props: Props) => {
    return (
        <div className="board-container">
            <ShowMines data={props} />
        </div>
    )
}

export default Board;