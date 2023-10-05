
import { useState, useRef } from 'react'
import { boardService } from '../../services/board.service.local'
import { ExitBtnSvg } from '../svg/ImgSvg'

export function AddTaskModal({ group, onAddTask, onCloseAddTaskModal }) {
    const [newTaskText, setNewTaskText] = useState('')

    const textareaRef = useRef(null)

    function handleChange({ target }) {
        const title = target.value
        setNewTaskText(title)
        adjustTextareaRows()
    }

    function handleCloseModal() {
        onCloseAddTaskModal()
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (newTaskText.trim().length > 0) {
            const groupId = group.id
            const taskToAdd = { ...boardService.getEmptyTask() }
            taskToAdd.title = newTaskText
            onAddTask(taskToAdd, groupId)
            setNewTaskText('')
        }
    }

    function adjustTextareaRows() {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = '70px'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }

    return (
        <div>
            <form className='form-add-new-task'>
                <textarea
                    className='custom-textarea'
                    placeholder="Enter a title for this card…"
                    name="text"
                    value={newTaskText}
                    onChange={handleChange}
                    ref={textareaRef}
                />
                <div className="button-container">
                    <button onClick={onSubmit} className='btn-action modal-btn'>
                        Add
                    </button>

                    <button onClick={handleCloseModal}>
                        <div className="center-svg">
                            <ExitBtnSvg />
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
}