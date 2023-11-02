import { useSelector } from "react-redux"
import { addActivity, removeChecklist, updateBoardGroupTaskType } from "../../../store/board.actions"
import { boardService } from "../../../services/board.service.local"

export function DeleteChecklist({ checklistIdToEdit }) {

    const board = useSelector(storeState => storeState.boardModule.board)
    const group = useSelector(storeState => storeState.boardModule.group)
    const task = useSelector(storeState => storeState.boardModule.task)

    async function onRemoveChecklist() {
        try {
            const checklist = boardService.getChecklistById(board, group, task, checklistIdToEdit)

            const savedBoard = await removeChecklist(board, group, task, checklistIdToEdit)
            updateBoardGroupTaskType(null, null, null, '', null)

            const strHtml = `removed ${checklist.title} from <span className="task-title">${task.title}</span>`
            await addActivity(savedBoard, group, task, strHtml)

        } catch (err) {
            console.log('cannot remove checklist, error: ', err);
            throw err
        }
    }

    return (
        <section className="delete-checklist scroll">
            <p>Deleting a checklist is permanent and there is no way to get it back.</p>
            <button className="delete-btn" onClick={onRemoveChecklist}>Delete checklist</button>
        </section>
    )
}