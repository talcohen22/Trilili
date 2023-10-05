import { useState } from 'react'
import { boardService } from '../../services/board.service.local'
export function AddTaskModal({group,onAddTask,onCloseAddTaskModal}) {
    const [newTaskText, setNewTaskText] = useState('')

    function handleChange({ target }) {
        const title = target.value
        setNewTaskText(title )
    }
    function handleCloseModal(){
        onCloseAddTaskModal()
    }
    
  function onSubmit(e) {
        e.preventDefault()
        if (newTaskText.trim().length>0){ 
            const groupId=group.id
            const taskToAdd= {...boardService.getEmptyTask()}
            taskToAdd.title=newTaskText
            onAddTask(taskToAdd,groupId)
            setNewTaskText('')
        }
      }

   const {text}=newTaskText
    return (
        <div>
            <form>
            <input  type="text" placeholder="Enter a title for this card…" name="text" value={text} onChange={handleChange}
                        />
                <div>
                    <button onClick={onSubmit}className='btn-action modal-btn'>Add</button>
                    <button onClick={handleCloseModal}>X</button>
                </div>
            </form>
        </div>
    )
}