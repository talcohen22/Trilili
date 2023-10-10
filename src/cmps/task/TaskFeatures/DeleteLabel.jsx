import { removeLabel } from "../../../store/board.actions";
import { BackBtnSvg } from "../../svg/ImgSvg";

export function DeleteLabel({ board, group, task, setDynamicParams, labelIdToEdit }) {

    async function onRemoveLabel() {
        try {
            await removeLabel(board, group, task, labelIdToEdit)
            setDynamicParams({ type: 'Labels' })
        } catch (err) {
            console.log('cannot remove label, error: ', err);
        }
    }

    return (
        <section className="delete-label">
            <p>This will remove this label from all cards. There is no undo.</p>
            <button className="delete-btn" onClick={onRemoveLabel}>Delete</button>
            <div className="back-btn" onClick={() => setDynamicParams({ type: 'Edit label' })}>
                <BackBtnSvg />
            </div>
        </section>
    )
}