import './index.css';
import ShowMines from './showMInes'

type Props = {
    height: number,
    width: number,
    mines: number
}

const Board = (props: Props) => {
    return (
        <div className="board-container">
            {ShowMines(props.height, props.width, props.mines)}
        </div>
    )
}

export default Board;