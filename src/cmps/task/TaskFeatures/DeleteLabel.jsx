import { useSelector } from "react-redux"
import { removeLabel, updateCmp } from "../../../store/board.actions"
import { BackBtnSvg } from "../../svg/ImgSvg"

export function DeleteLabel({ labelIdToEdit }) {

    const board = useSelector(storeState => storeState.boardModule.board)
    const group = useSelector(storeState => storeState.boardModule.group)
    const task = useSelector(storeState => storeState.boardModule.task)
    const storeCmp = useSelector(storeState => storeState.boardModule.cmp)

    async function onRemoveLabel() {
        try {
            await removeLabel(board, group, task, labelIdToEdit)
            getCmp('Labels')
        } catch (err) {
            console.log('cannot remove label, error: ', err);
        }
    }

    function getCmp(cmpType) {
        const cmp = { type: cmpType, location: storeCmp.location }
        updateCmp(cmp)
    }

    return (
        <section className="delete-label scroll">
            <p>This will remove this label from all cards. There is no undo.</p>
            <button className="delete-btn" onClick={onRemoveLabel}>Delete</button>
            <div className="back-btn" onClick={() => getCmp('Edit label')}>
                <BackBtnSvg />
            </div>
        </section>
    )
}