import { ExitBtnSvg } from "../svg/ImgSvg"
import { BoardMenu } from "./BoardMenu"
import { useSelector } from 'react-redux'
import { ChangeBackground } from "./ChangeBackground"
import { ChangeColorBackground } from "./ChangeColorBackground"
import { ChangePhotoBackground } from "./ChangePhotoBackground"
import { BoardActivity } from "./BoardActivity"

export function BoardMenuDynamic({ board, onOpenMenuCmp, onCloseMenuCmp }) {

    const boardMenu = useSelector(storeState => storeState.boardModule.boardMenu);

    return (
        <section className={`board-menu-dynamic ${boardMenu.isOpen ? 'is-open' : ''}`}>

            <div>
                {boardMenu.cmpType === 'Photos by Unsplash' ?
                    <h1>Photos by
                        <a target="_blank" href="https://unsplash.com/?utm_source=trello&utm_medium=referral&utm_campaign=api-credit">Unsplash</a>
                    </h1> :
                    <h1>{boardMenu.cmpType}</h1>}

                <hr />
            </div>

            {boardMenu.cmpType === 'Menu' && <BoardMenu board={board} onOpenMenuCmp={onOpenMenuCmp} />}

            {boardMenu.cmpType === 'Change background' && <ChangeBackground onOpenMenuCmp={onOpenMenuCmp} />}

            {boardMenu.cmpType === 'Photos by Unsplash' && <ChangePhotoBackground board={board} onOpenMenuCmp={onOpenMenuCmp} />}

            {boardMenu.cmpType === 'Colors' && <ChangeColorBackground board={board} onOpenMenuCmp={onOpenMenuCmp} />}

            {boardMenu.cmpType === 'Activity' && <BoardActivity board={board} onOpenMenuCmp={onOpenMenuCmp} />}

            {/* {boardMenu.cmpType === 'Labels' && <BoardLabels board={board} onOpenMenuCmp={onOpenMenuCmp} />} */}

            <div className="exit-btn flex justify-center align-center" onClick={onCloseMenuCmp}><ExitBtnSvg /></div>

        </section>
    )
}