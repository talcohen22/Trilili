import { BoardPreview } from "./BoardPreview";

export function BoardList({ boards }) {
    return (
            <section className="board-list-container">
                <h3>Your boards</h3>
                <ul className="board-list">
                    {boards.map(board =>
                    <li className="board-item" key={board._id}>
                        <BoardPreview board={board} />
                    </li>
                )}
                </ul>
            </section >
    )
}