import { useState } from 'react'
import { addActivity, addChecklist, updateBoardGroupTaskType } from '../../store/board.actions'
import { useSelector } from 'react-redux'

export function FeatureChecklist() {

    const board = useSelector(storeState => storeState.boardModule.board)
    const group = useSelector(storeState => storeState.boardModule.group)
    const task = useSelector(storeState => storeState.boardModule.task)

    const [titleTxt, setTitleTxt] = useState('Checklist')

    function handleChange({ target }) {
        setTitleTxt(target.value)
    }

    async function onAddChecklist(ev) {
        ev.preventDefault()

        try {
            const savedBoard = await addChecklist(board, group, task, titleTxt)
            updateBoardGroupTaskType(null, null, null, '', null)

            const strHtml = `added ${titleTxt} to <span className="task-title">${task.title}</span>`
            await addActivity(savedBoard, group, task, strHtml)
        } catch (err) {
            console.log('Cannot add checklist', err)
            throw err
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