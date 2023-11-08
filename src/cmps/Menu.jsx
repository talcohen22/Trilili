import { HighlightSvg, LogoSvg, MultiMembersSvg, ViewsSvg } from "./svg/ImgSvg"

export function Menu() {

    return (
        <div className="menu-container">

            <div className="flex active">
                <LogoSvg />
                <p>Boards</p>
            </div>

            <div className=" flex">
                <HighlightSvg />
                <p>Highlight</p>
            </div>

            <div className="flex">
                <ViewsSvg />
                <p>Views</p>
            </div>

            <div className="flex">
                <MultiMembersSvg />
                <p>Members</p>
            </div>
            
        </div>
    )
}