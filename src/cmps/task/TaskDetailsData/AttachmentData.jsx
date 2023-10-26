import { removeAttachment } from "../../../store/board.actions";
import { ArrowTopRightCorner } from "../../svg/ImgSvg";


export function AttachmentData({board, group, task, attachment, attachIdx }) {

    const filename = attachment.fileName
    const lastIndex = filename.lastIndexOf(".");
    const fileType = lastIndex !== -1 ? filename.substring(lastIndex + 1, filename.length) : ''

    console.log(fileType);

    function onRemoveAttachment(){
        try{
            removeAttachment(board, group, task, attachIdx)
        }catch (err) {
            console.log('Cannot delete attachment', err)
            throw err
        }
    }

    return (
        <section className="attachment-container flex">
            {fileType &&
                <div className="file-type flex">
                    <a href={attachment.url} className="filetype-preview flex justify-center align-center">{fileType}</a>
                </div>}
            <div className="content flex">
                <div>
                    <a href={attachment.url}>{attachment.fileName}</a>
                    <ArrowTopRightCorner />
                </div>
                <button className="delete-attachment" onClick={onRemoveAttachment}>Delete</button>
            </div>
        </section>
    )
}