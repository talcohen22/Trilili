import { ExitBtnSvg } from "../svg/ImgSvg";
import { BoardMenu } from "./BoardMenu";
import { useSelector } from 'react-redux';
import { ChangeBackground } from "./ChangeBackground";
import { ChangeColorBackground } from "./ChangeColorBackground";
import { ChangePhotoBackground } from "./ChangePhotoBackground";

export function BoardMenuDynamic({ board, onOpenMenuCmp, onCloseMenuCmp }) {

    const boardMenu = useSelector(storeState => storeState.boardModule.boardMenu);

    return (
        <section className={`board-menu-dynamic ${boardMenu.isOpen ? 'is-open' : ''}`}>
            <h1>{boardMenu.cmpType}</h1>
            <hr />

            {boardMenu.cmpType === 'Menu' && <BoardMenu board={board} onOpenMenuCmp={onOpenMenuCmp} />}
            
            {boardMenu.cmpType === 'Change background' && <ChangeBackground onOpenMenuCmp={onOpenMenuCmp} />}
            
            {boardMenu.cmpType === 'Photos by Unsplash' && <ChangePhotoBackground onOpenMenuCmp={onOpenMenuCmp} />}
            
            {boardMenu.cmpType === 'Colors' && <ChangeColorBackground board={board} onOpenMenuCmp={onOpenMenuCmp} />}

            <div className="exit-btn flex justify-center align-center" onClick={onCloseMenuCmp}><ExitBtnSvg /></div>
        </section>
    )
}