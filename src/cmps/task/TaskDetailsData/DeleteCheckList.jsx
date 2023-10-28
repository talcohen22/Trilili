import { useSelector } from "react-redux"
import { removeChecklist, updateBoardGroupTaskType } from "../../../store/board.actions"

export function DeleteChecklist({ checklistIdToEdit }) {

    const board = useSelector(storeState => storeState.boardModule.board)
    const group = useSelector(storeState => storeState.boardModule.group)
    const task = useSelector(storeState => storeState.boardModule.task)

    async function onRemoveChecklist() {
        try {
            await removeChecklist(board, group, task, checklistIdToEdit)
            updateBoardGroupTaskType(null, null, null, '', null)
        } catch (err) {
            console.log('cannot remove label, error: ', err);
        }
    }

    return (
        <section className="delete-checklist scroll">
            <p>Deleting a checklist is permanent and there is no way to get it back.</p>
            <button className="delete-btn" onClick={onRemoveChecklist}>Delete checklist</button>
        </section>
    )
}