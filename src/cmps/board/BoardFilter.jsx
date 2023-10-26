import { useState } from "react";
import { DashboardSvg, DotsSvg, FilterSvg, FullStarSvg, PowerUpSvg, ShareSvg, StarSvg, WorkspaceSvg } from "../svg/ImgSvg"
import { boardService } from "../../services/board.service.local";

export function BoardFilter({ board, onSetBoard }) {
    const boardTitleLength = board.title.length
    const [inputWidth, SetInputWidth] = useState(boardTitleLength * 9.5)
    const [boardTitle, setBoardTitle] = useState(board.title)
    const [isStarred, setIsStarred] = useState(board.isStarred)
    function handleIputLength(event) {
        const value = event.target.value
        const updateBoard = board
        updateBoard.title = value
        onSetBoard(updateBoard)
        SetInputWidth(`${value.length * 10}px`)
        setBoardTitle(value)
    }
    function handleIsStarred() {
        const updatedBoard = board
        updatedBoard.isStarred = !isStarred
        onSetBoard(updatedBoard)
        setIsStarred(updatedBoard.isStarred)
    }

    return (
        <div className="header-color">
            <header className="board-filter">
                <section className="board-visibility">
                    <section className="header-title" style={{ width: inputWidth }} >
                        <input type="text" onChange={handleIputLength} value={boardTitle} style={{ width: inputWidth }} />
                    </section>
                    <section className=" board-filter">
                        <button onClick={handleIsStarred} className="board-filter-btn ">{isStarred ? <FullStarSvg /> : <StarSvg />}</button>
                        <button className="board-filter-btn dashboard-btn full-btn "><DashboardSvg /><span>Dashboard</span></button>
                    </section>
                </section>


                <section className="board-filter group-editing">
                    <button className="board-filter-btn"><PowerUpSvg /></button>
                    <button className="board-filter-btn filter"><FilterSvg /><span>Filter</span></button>
                    <section className="board-filter img">
                        <span className="seperator"></span>
                        <div>
                            <img className="member-img" src="https://source.unsplash.com/random/300×300" alt="" />
                            <img className="member-img" src="https://source.unsplash.com/random/350×350" alt="" />
                            <img className="member-img" src="https://source.unsplash.com/random/400×400" alt="" />
                        </div>
                        <button className="board-filter-btn share-btn full-btn"><ShareSvg /><span>Share</span></button>
                        <button className="board-filter-btn dots"><DotsSvg /></button>
                    </section>
                </section>
            </header>
        </div>
    )
}