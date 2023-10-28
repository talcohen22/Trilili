import { useState } from 'react'
import { saveDescription } from '../../../store/board.actions'

export function DescriptionData({ board, group, task }) {

    const [description, setDescription] = useState(task.description)
    const [isEditMode, setIsEditMode] = useState(false)

    function onSetDescription({ target }) {
        setDescription(target.value)
    }

    function onSetIsEditMode(value) {
        setIsEditMode(value)
    }

    async function onSaveDescription() {
        try {
            await saveDescription(board, group, task, description)
            onSetIsEditMode(false)
        } catch (err) {
            console.log('Cannot save description', err)
        }
    }

    return (
        <section className="description-container">

            <h2>Description</h2>
            
            <textarea
                value={description}
                placeholder="Add more details description..."
                onClick={() => onSetIsEditMode(true)}
                onChange={onSetDescription}>
            </textarea>

            {isEditMode &&
                <div className="btns flex">
                    <button className="save-btn" onClick={onSaveDescription}>Save</button>
                    <button className="cancel-btn" onClick={() => onSetIsEditMode(false)}>Cancel</button>
                </div>}

        </section>
    )
} 