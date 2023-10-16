import React, { useState } from 'react';
// import { addTaskAttach } from '../../store/board.actions';

export function FeatureAttachment({board, group, task, setDynamicParams}) {

    async function onSaveFile(event) {
        const file = event.target.files[0];

        if (file) {
            // try {
            //     const formData = new FormData();
            //     formData.append('file', file);
            //     addTaskAttach(board, group, task, file)
            // } catch (error) {
            //     console.error('Error uploading file', error);
            // }
        }
    }

    return (
        <section className="feature-attachment">
            <p className="attach-file">Attach a file from your computer</p>
            <p className="choose-file">Choose a file</p>
            <label className='upload-btn' htmlFor="files">Upload</label>
            <input type="file" id="files" name="files" onChange={onSaveFile} />
            <hr />
        </section>
    )
}