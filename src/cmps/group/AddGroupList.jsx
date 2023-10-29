import { useState, useEffect, useRef } from "react";
import { ExitBtnSvg } from "../svg/ImgSvg";
import { utilService } from "../../services/util.service";

export function AddGroupList({ onAddTitle, onCancel }) {

    const [title, setTitle] = useState('')
    const inputRef = useRef(null)


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])


    function handleTitleChange(ev) {
        setTitle(ev.target.value)
    }

    function handleAddClick() {
        if (title.trim() !== '') {
            onAddTitle(title)
            setTitle('')
            utilService.handleTextInputFocus(inputRef)
        }
    }

    return (
        <div className={`add-group-list group-card`}>

            <input
                type="text"
                placeholder="Add list title..."
                value={title}
                onChange={handleTitleChange}
                ref={inputRef}
                autoFocus/>

            <div className="button-container">

                <button
                    className='btn-action modal-btn'
                    onClick={handleAddClick}>
                    Add list
                </button>

                <button onClick={onCancel}>
                    <div className="center-svg">
                        <ExitBtnSvg />
                    </div>
                </button>
                
            </div>

        </div >
    )
}
