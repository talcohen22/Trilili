import { useSelector } from 'react-redux'
import { removeCover, updateColorBackground, updatePhotoBackground } from '../../store/board.actions'

export function FeatureCover() {

    const board = useSelector(storeState => storeState.boardModule.board)
    const group = useSelector(storeState => storeState.boardModule.group)
    const task = useSelector(storeState => storeState.boardModule.task)
    const storeCmp = useSelector(storeState => storeState.boardModule.cmp)

    const colors = ["#4bce97", "#f5cd47", "#fea362", "#f87168", "#9f8fef", "#579dff", "#6cc3e0", "#94c748", "#e774bb", "#8590a2"]
    const photos = [
        "https://images.unsplash.com/photo-1694989025300-9e1c2cfc7a2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMxOTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg0MDg1ODd8&ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1694536379581-3003331c1e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMxOTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg0MDg1ODd8&ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1691413436108-b4ef24809a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMxOTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg0MDg1ODd8&ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1696312870500-96b8f86faee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMxOTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg0MDg1ODd8&ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1695755594813-14e57fab9a56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMxOTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg0MDg1ODd8&ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1695808403805-ff03eec7de03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMxOTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg0MDg1ODd8&ixlib=rb-4.0.3&q=80&w=400"
    ]

    async function onSetColorBackground(color) {
        try {
            await updateColorBackground(board, group, task, color)
        } catch (err) {
            console.log('Cannot update background color', err)
        }
    }

    async function onSetImageBackground(photo) {
        try {
            await updatePhotoBackground(board, group, task, photo)
        } catch (err) {
            console.log('Cannot update background photo', err)
        }
    }

    async function onRemoveCover() {
        try {
            await removeCover(board, group, task)
        } catch (err) {
            console.log('Cannot remove cover', err)
        }
    }

    return (
        <section className="feature-cover scroll">

            <div className='remove-cover' onClick={onRemoveCover}>Remove cover</div>

            <h1>Colors</h1>
            <div className='colors-container flex'>
                {colors.map(color =>
                    <div key={color}
                        className='color-container'
                        onClick={() => onSetColorBackground(color)}
                        style={{ backgroundColor: color }}>
                    </div>)}
            </div>

            <h1>Photos from Unsplash</h1>
            <div className='photos-container flex'>
                {photos.map(photo =>
                    <div key={photo}
                        className='photo-container'
                        onClick={() => onSetImageBackground(photo)}
                        style={{ backgroundImage: `url(${photo})` }}>
                    </div>)}
            </div>

        </section>
    )
}