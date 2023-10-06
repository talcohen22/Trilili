import { useState } from "react";
import { DashboardSvg, DotsSvg, FilterSvg, PowerUpSvg, ShareSvg, StarSvg, WorkspaceSvg } from "../svg/ImgSvg"


export function BoardFilter() {
    const [inputWidth, SetInputWidth] = useState('110px')

    function handleIputLength(event) {
        let value = event.target.value
        console.log(value);
        SetInputWidth(`${value.length * 10}px`)
    }

    return (
        <div className="header-color">
        <header className="board-filter">
            <section className="board-visibility">
                <section className="header-title">
                    <input type="text" onChange={handleIputLength} value='Board Title' style={{ width: inputWidth }} />
                </section>
                <section className=" board-filter">
                    <button className="board-filter-btn "><StarSvg/></button>
                    <button className="board-filter-btn dashboard-btn "><DashboardSvg/><span>Dashboard</span></button>
                </section>
            </section>


            <section className="board-filter group-editing">
                <button className="board-filter-btn"><PowerUpSvg/></button>
                <button className="board-filter-btn filter"><FilterSvg/><span>Filter</span></button> 
                <section className="board-filter img">
                    <span className="seperator"></span><img className="member-img" src="https://source.unsplash.com/random/300×300" alt="" />
                    <img className="member-img" src="https://source.unsplash.com/random/350×350" alt="" />
                    <img className="member-img" src="https://source.unsplash.com/random/400×400" alt="" />
                    <button className="board-filter-btn full-btn"><ShareSvg/><span>Share</span></button>
                    <button className="board-filter-btn dots"><DotsSvg/></button>
                </section>
            </section>
        </header>
        </div>
    )
}