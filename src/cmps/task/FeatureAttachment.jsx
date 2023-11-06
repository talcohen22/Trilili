import { useSelector } from 'react-redux'
import { addTaskAttach, updateBoardGroupTaskType } from '../../store/board.actions'
import { CLOUD_NAME, UPLOAD_PRESET , UPLOAD_URL} from '../../services/apiKeys'

export function FeatureAttachment() {

    const board = useSelector(storeState => storeState.boardModule.board)
    const group = useSelector(storeState => storeState.boardModule.group)
    const task = useSelector(storeState => storeState.boardModule.task)

    async function onSaveFile(ev) {

        const FORM_DATA = new FormData()
        console.log("Aaaa");
        console.log(ev.target.files[0]);

        FORM_DATA.append('file', ev.target.files[0], ev.target.files[0].name)
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)

        console.log("bbbbbbbbb");

        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: FORM_DATA,
            })
            console.log("cccccccccc");
            const { url } = await res.json()
            const fileName = ev.target.files[0].name
            const attach = { fileName, url }
            addTaskAttach(board, group, task, attach)
            updateBoardGroupTaskType(null, null, null, '', null)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section className="feature-attachment scroll">
            <p className="attach-file">Attach a file from your computer</p>
            <label className='upload-btn' htmlFor="files">Choose a file</label>
            <input type="file" id="files" name="files" onChange={onSaveFile} />
        </section>
    )
}