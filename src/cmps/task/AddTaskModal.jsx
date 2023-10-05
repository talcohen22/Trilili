import { useState } from 'react'
import { boardService } from '../../services/board.service.local'
export function AddTaskModal() {
    const [newTaskText, setNewTaskText] = useState({text:''})

    function handleChange({ target }) {
        const value = target.value
        const field = target.name
        setNewTaskText(prevTask => ({ ...prevTask, [field]: value }))
        console.log(newTaskText)
    }

    async function onAddTask(e) {
        e.preventDefault()
        if (newTaskText.trim().length > 0) {
          const task = boardService.createTask(newTaskText)
          try {
            await saveNewTask(board, group._id, task, activity)
            await addActivity(activity)
          } catch (err) {
            console.log('err', err)
          }
        }
        setIsAddingTask(true)
        setNewTaskText('')
      }
   const {text}=newTaskText
    return (
        <div>
            <form>
            <input  type="text" placeholder="Enter a title for this card…" name="text" value={text} onChange={handleChange}
                        />
                <div>
                    <button className='btn-action modal-btn'>Add</button>
                    <button onClick={onAddTask}>X</button>
                </div>
            </form>
        </div>
    )
}