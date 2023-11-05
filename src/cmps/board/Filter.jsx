import { useEffect, useRef } from "react"
import { ExitBtnSvg } from "../svg/ImgSvg";
import { setFilterByAction, setFilterCmpIsOpen } from "../../store/board.actions";
import { MembersFilter } from "./MembersFilter";
import { LabelsFilter } from "./LabelsFilter";
import { useSelector } from "react-redux";
import { DateFilter } from "./DateFilter";

export function Filter({ board }) {

    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const modalRef = useRef(null)
    const screenWidth = window.innerWidth;

        useEffect(() => {
            
            function handleClickOutside(event) {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    setFilterCmpIsOpen(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside)

            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [])

    function onSetIsFilterCmpOpen(value) {
        setFilterCmpIsOpen(value)
    }

    function onSetFilterBy({ target }, field, value) {
        if (target.checked) filterBy[field].push(value)

        else filterBy[field] = filterBy[field].filter(obj => obj !== value)

        setFilterByAction(filterBy)
    }

    function onSetTxtFilterBy({ target }) {
        filterBy.keywords = target.value
        setFilterByAction(filterBy)
    }

    return (
        <section className="filter-cmp"
            ref={modalRef}
            style={{ left: screenWidth - 384 - 7 }}>
                
            <h1>Filter</h1>

            <div className="filter-content">

                <h2>Keywords</h2>
                <input value={filterBy.keywords} type="text" placeholder="Enter a Keyword..." onChange={onSetTxtFilterBy} />
                <p className="search-explain">Search cards, members, labels, and more.</p>

                <MembersFilter board={board} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

                <DateFilter board={board} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

                <LabelsFilter board={board} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            </div>

            <div className="exit-btn" onClick={() => onSetIsFilterCmpOpen(false)}><ExitBtnSvg /></div>
        </section>
    )
}