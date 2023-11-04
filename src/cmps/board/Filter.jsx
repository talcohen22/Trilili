import { useEffect, useRef } from "react"
import { ExitBtnSvg } from "../svg/ImgSvg";
import { setFilterByAction, setFilterCmpIsOpen } from "../../store/board.actions";
import { MembersFilter } from "./MembersFilter";
import { LabelsFilter } from "./LabelsFilter";
import { useSelector } from "react-redux";


export function Filter({ board }) {

    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    const modalRef = useRef(null)
    const screenWidth = window.innerWidth;

    // if (modalRef.current) console.log(modalRef.current.offsetWidth);
    useEffect(() => {

        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                // setFilterCmpIsOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    function onSetIsFilterCmpOpen(value) {
        setFilterCmpIsOpen(value)
    }

    // function onSetFilterBy(filterBy){
    //     setFilterByAction(filterBy)
    // }

    function onSetFilterBy({ target }, field, value) {
        if (target.checked) filterBy[field].push(value)

        else filterBy[field] = filterBy[field].filter(obj => obj !== value)

        setFilterByAction(filterBy)
    }

    return (
        <section className="filter-cmp"
            ref={modalRef}
            style={{ left: screenWidth - 384 }}>
            <h1>Filter</h1>

            <div className="filter-content">

                <MembersFilter board={board} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

                <LabelsFilter board={board} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            </div>

            <div className="exit-btn" onClick={() => onSetIsFilterCmpOpen(false)}><ExitBtnSvg /></div>
        </section>
    )
}