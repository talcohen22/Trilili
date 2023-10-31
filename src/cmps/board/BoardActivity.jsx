import { BackBtnSvg } from "../svg/ImgSvg";

export function BoardActivity({onOpenMenuCmp}) {
    return (
        <section className="board-activity">


            <div className="back-btn flex align-center justify-center" onClick={(ev) => onOpenMenuCmp(ev, 'Menu')}>
                <BackBtnSvg />
            </div>
        </section>
    )
}