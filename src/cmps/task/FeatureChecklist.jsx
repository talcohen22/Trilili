import { useState } from 'react'
import { addChecklist } from '../../store/board.actions'

export function FeatureChecklist({ board, group, task, onSetIsDynamicCmpOpen }) {

    const [titleTxt, setTitleTxt] = useState('Checklist')

    function handleChange({ target }) {
        setTitleTxt(target.value)
    }

    function onAddChecklist(ev) {
        ev.preventDefault()

        try {
            addChecklist(board, group, task, titleTxt)
            onSetIsDynamicCmpOpen(false)
        } catch (err) {
            console.log('Cannot add checklist', err)
        }
    }

    return (
        <section className="feature-checklist">
            <p className="checklist-title">Title</p>
            <form action="" onSubmit={onAddChecklist}>
                <input value={titleTxt} className="title-input" type="text" onChange={handleChange} />
                <button>Add</button>
            </form>
        </section>
    )
}