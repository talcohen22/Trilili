import { useEffect, useState, useRef } from 'react';

export function CopyList({ group, saveCopiedGroup,onHandleClose }) {
    useEffect(() => {
        if (inputRef.current) {
            // Focus the input element
            inputRef.current.focus();

            // Select the text in the input
            inputRef.current.select();
        }
    }, []);

    const inputRef = useRef(null);
    const copiedTitle = group.title
    const [title, setTitle] = useState(copiedTitle)

    function handleChange({ target }) {
        setTitle(target.value)
    }

    function onSaveCopiedGroup() {
        const copiedGroup = {...group}
        copiedGroup.title = title
        saveCopiedGroup(copiedGroup)
        onHandleClose()
    }

    return (
        <section className="copy-list">
            <h3>Name</h3>
            <textarea ref={inputRef} className="add-lable" type="text" value={title} onChange={handleChange} />
            <div className="save-delete-btns flex justify-space-b">
                <button onClick={onSaveCopiedGroup}>Create list</button>
            </div>
        </section>
    )
}