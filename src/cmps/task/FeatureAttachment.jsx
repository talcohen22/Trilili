import React, { useState } from 'react';

export function FeatureAttachment() {

    async function onSaveFile(event) {
        const file = event.target.files[0];
        console.log(file);


        if (file) {
            console.log(file);
            try {
                const formData = new FormData();
                formData.append('file', file);

                // Send the file data to the server using an API request (e.g., Axios)
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.status === 200) {
                    // File successfully uploaded
                    console.log('File uploaded successfully');
                } else {
                    // Handle errors here
                    console.error('Error uploading file');
                }
            } catch (error) {
                console.error('Error uploading file', error);
            }
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