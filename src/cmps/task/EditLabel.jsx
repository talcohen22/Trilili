import { boardService } from "../../services/board.service.local";
import { editLabel } from "../../store/board.actions"
import { BackBtnSvg, ExitBtnSvg } from "../svg/ImgSvg"
import { useEffect, useState } from 'react'


const colors = ['#baf3db', '#f8e6a0', '#ffe2bd', '#ffd2cc', '#dfd8fd', '#4bce97', '#e2b203', '#faa53d', '#f87462', '#9f8fef', '#1f845a', '#946f00', '#b65c02', '#ca3521', '#6e5dc6', '#cce0ff', '#c1f0f5', '#d3f1a7', '#fdd0ec', '#dcdfe4', '#579dff', '#60c6d2', '#94c748', '#e774bb', '#8590a2', '#0c66e4', '#1d7f8c', '#5b7f24', '#ae4787', '#626f86']

export function EditLabel({ board, group, task, setDynamicParams, labelIdToEdit }) {

    const [title, setTitle] = useState('')
    const [color, setColor] = useState('#ffd2cc')

    useEffect(() => {
        getTitle()

        async function getTitle() {
            if (labelIdToEdit) {
                const label = await boardService.getLabel(board._id, labelIdToEdit)
                setTitle(label.title)
                setColor(label.color)
            }
        }
    }, [])

    function handleChange({ target }) {
        setTitle(target.value)
    }

    function onSetColor(color) {
        setColor(color)
    }

    async function onSaveLabel() {
        try {
            await editLabel(board, group, task, labelIdToEdit, color, title)
            setDynamicParams({ type: 'Labels' })
        } catch (err) {
            console.log('Cannot add label', err)
        }
    }

    function onRemoveLabel() {
        setDynamicParams({ type: 'Delete Label' })
    }

    return (
        <section className="edit-label">
            <div className="display-chosen-label flex justify-center align-center">
                <div className="chosen-color"
                    style={{ backgroundColor: color }}></div>
            </div>
            <h3>Title</h3>
            <input className="add-lable" type="text" value={title} onChange={handleChange} />
            <h3>Select a color</h3>
            <ul className="colors-container flex ">
                {colors.map((color, idx) => (
                    <li className="color-container"
                        key={idx}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}>
                    </li>
                ))}
            </ul>
            <div className="remove-color-btn flex">
                <ExitBtnSvg />
                <p className="create-new-label">Remove color</p>
            </div>
            <hr />
            <div className="save-delete-btns flex justify-space-b">
                <button onClick={onSaveLabel}>Save</button>
                <button
                    style={{ display: labelIdToEdit ? 'inline' : 'none' }}
                    onClick={onRemoveLabel}
                >Delete</button>
            </div>
            <div className="back-btn" onClick={() => setDynamicParams({ type: 'Labels' })}>
                <BackBtnSvg />
            </div>

        </section>
    )
}