import { useState } from "react";

export function AddGroupList({ onAddTitle, onCancel }) {
    const [title, setTitle] = useState('');

    function handleTitleChange(ev) {
        setTitle(ev.target.value)
    }

    function handleAddClick() {
        if (title.trim() !== '') {
            onAddTitle(title)
            setTitle('')
        }
    }

    return (
        <div className="add-group-list">
            <input
                type="text"
                placeholder="Add list title..."
                value={title}
                onChange={handleTitleChange}
            />
            <div className="button-container">
                <button onClick={handleAddClick}>Add list</button>
                <button onClick={onCancel}>X</button>
            </div>
        </div>
    );
}
