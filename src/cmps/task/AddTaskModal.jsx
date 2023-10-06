import { useState, useRef, useEffect } from 'react'
import { boardService } from '../../services/board.service.local'
import { ExitBtnSvg } from '../svg/ImgSvg'

export function AddTaskModal({ group, onAddTask, onCloseAddTaskModal }) {
    const [newTaskText, setNewTaskText] = useState('')
    const [textScrollHeight, setTextScrollHeight] = useState('70px')

    const textareaRef = useRef(null)

    useEffect(() => {
        adjustTextareaRows()
    }, [newTaskText])

    function handleChange({ target }) {
        const title = target.value
        setNewTaskText(title)
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
            textarea.style.height = textScrollHeight
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
