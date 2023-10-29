import { LabelsSvg } from "../svg/ImgSvg";

export function BoardMenu({ board, onOpenMenuCmp }) {

    return (
        <section className="board-menu" >

            <div className="change-background option flex align-center"
                onClick={() => onOpenMenuCmp('Change background')}>
                <div style={{ backgroundImage: `url(${board.style.backgroundImage})` }}></div>
                <p>Change background</p>
            </div>

            <div className="option flex align-center">
                <LabelsSvg />
                <p>Labels</p>
            </div>

        </section>
    )
}