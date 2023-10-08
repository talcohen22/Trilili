import React, { useState } from 'react';

export function FeatureAttachment() {

    const [selectedFile, setSelectedFile] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    async function handleUpload() {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);

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
            <input type="file" onChange={handleFileChange} style={{ visibility: 'hidden' }}/>
            <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
            <hr />
        </section>
    )
}