
export function BoardPreview({ board }) {
    console.log(board);
    return (
        <section className="board-preview">
            <h1>{board.title}</h1>
        </section>
    )
}