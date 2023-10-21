import { useState } from 'react'
import { addChecklist, updateBoardGroupTaskType } from '../../store/board.actions'
import { useSelector } from 'react-redux'

export function FeatureChecklist() {

    const board = useSelector(storeState => storeState.boardModule.board)
    const group = useSelector(storeState => storeState.boardModule.group)
    const task = useSelector(storeState => storeState.boardModule.task)

    const [titleTxt, setTitleTxt] = useState('Checklist')

    function handleChange({ target }) {
        setTitleTxt(target.value)
    }

    function onAddChecklist(ev) {
        ev.preventDefault()

        try {
            addChecklist(board, group, task, titleTxt)
            updateBoardGroupTaskType(null, null, null, '', null)
        } catch (err) {
            console.log('Cannot add checklist', err)
        }
    }

    return (
        <section className="feature-checklist scroll">
            <p className="checklist-title">Title</p>
            <form action="" onSubmit={onAddChecklist}>
                <input value={titleTxt} className="title-input" type="text" onChange={handleChange} />
                <button>Add</button>
            </form>
        </section>
    )
}