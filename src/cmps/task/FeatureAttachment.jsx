import React, { useState } from 'react';
// import { addTaskAttach } from '../../store/board.actions';

export function FeatureAttachment() {

    async function onSaveFile(event) {
        const file = event.target.files[0];
        console.log(file);

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
        <section className="feature-attachment scroll">
            <p className="attach-file">Attach a file from your computer</p>
            <label className='upload-btn' htmlFor="files">Choose a file</label>
            <input type="file" id="files" name="files" onChange={onSaveFile} />
            <hr />
        </section>
    )
}