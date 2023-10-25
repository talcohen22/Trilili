import { useState, useRef, useEffect } from 'react'
import { boardService } from '../../services/board.service.local'
import { ExitBtnSvg } from '../svg/ImgSvg'

export function AddTaskModal({ group, onAddTask, onCloseAddTaskModal,isOnAddTask }) {
    const [newTaskText, setNewTaskText] = useState('')
    const [textScrollHeight, setTextScrollHeight] = useState('70px')
    const direction= isOnAddTask
    const textareaRef = useRef(null)
    const isComponentMounted = useRef(false)
   
    useEffect(() => {
        adjustTextareaRows()

        const handleClickOutside = (event) => {
            if (textareaRef.current && !textareaRef.current.contains(event.target)) {
                if (isComponentMounted.current) {
                    onCloseAddTaskModal();
                }
            }
            isComponentMounted.current = true
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, [newTaskText,onCloseAddTaskModal])

    function handleChange({ target }) {
        setNewTaskText(target.value)
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
            if(direction)onAddTask(taskToAdd, groupId,'END')
            else if(!direction) onAddTask(taskToAdd, groupId,'START')
            // onAddTask(taskToAdd, groupId)
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
                        Add card
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
