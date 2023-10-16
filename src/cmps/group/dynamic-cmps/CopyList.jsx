import { boardService } from "../../services/board.service.local";
import { BackBtnSvg, ExitBtnSvg } from "../svg/ImgSvg"
import { useEffect, useState } from 'react'

export function CopyList({ board, group, setDynamicParams }) {

    const [title, setTitle] = useState('')

    useEffect(() => {
        getTitle()

        async function getTitle() {
            // if (titleToEdit) {
            //     const label = await boardService.getLabel(board._id, labelIdToEdit)
            //     setTitle(label.title)
            // }
        }
    }, [])

    function handleChange({ target }) {
        setTitle(target.value)
    }

    // async function onSaveLabel() {
    //     try {
    //         await editLabel(board, group, task, labelIdToEdit, color, title)
    //         setDynamicParams({ type: 'Labels' })
    //     } catch (err) {
    //         console.log('Cannot add label', err)
    //     }
    // }

    return (
        <section className="edit-label">
            <div className="display-chosen-label flex justify-center align-center">

                <h3>Name</h3>
                <input className="add-lable" type="text" value={title} onChange={handleChange} />

                <div className="save-delete-btns flex justify-space-b">
                    <button onClick={onSaveLabel}>Save</button>
                </div>
                <div className="back-btn" onClick={() => setDynamicParams({ type: 'Labels' })}>
                    <BackBtnSvg />
                </div>
            </div>
        </section>
    )
}