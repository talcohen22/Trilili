import { NoDatesSvg, OverdueSvg } from "../svg/ImgSvg";

export function DateFilter({ board, filterBy, onSetFilterBy }) {
    return (
        <section className="date-filter">

            <h2>Due date</h2>

            <div className="date flex align-center">
                <input className="date-checkbox"
                    type="checkbox"
                checked={filterBy.dueDate.includes('no dates')}
                onChange={(ev) => onSetFilterBy(ev, 'dueDate', 'no dates')}
                />
                <div className="date-img gray flex justify-center align-center"><NoDatesSvg/></div>
                <p className="txt">No Dates</p>

            </div>

            <div className="date flex align-center">
                <input className="date-checkbox"
                    type="checkbox"
                    checked={filterBy.dueDate.includes('overdue')}
                onChange={(ev) => onSetFilterBy(ev, 'dueDate', 'overdue')}
                />
                <div className="date-img red  flex justify-center align-center"><OverdueSvg/></div>
                <p className="txt">Overdue</p>

            </div>

        </section>
    )
}