import { useEffect, useRef, useState } from "react"
import { ExitBtnSvg, NewBoardSvg } from "../svg/ImgSvg"
import { useSelector } from "react-redux"
import { updateNewBoardModal } from "../../store/board.actions"

export function NewBoardModal({ onAddBoard, onSetIsOpenModal }) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
    const [componentHeight, setComponentHeight] = useState(0);
    const [txtInput, setTxtInput] = useState('')
    const [chosenBgcImg, setChosenBgcImg] = useState('https://images.unsplash.com/photo-1695056721201-078a656ef90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=400')

    const wrapperRef = useRef(null)
    useClickOutsideCmp(wrapperRef)

    const newBoardModal = useSelector(storeState => storeState.boardModule.newBoardModal)

    const paletteImgs = [
        'https://images.unsplash.com/photo-1695056721201-078a656ef90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000',
        'https://images.unsplash.com/photo-1675889335685-4ac82f1e47ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000',
        'https://images.unsplash.com/photo-1695983953103-17bce53a8138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000',
        'https://images.unsplash.com/photo-1694802491008-a528234a9a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000'
    ]

    const palette = [
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384751/707f35bc691220846678_pjgxni.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384735/d106776cb297f000b1f4_aixvzg.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384777/8ab3b35f3a786bb6cdac_f6yj4u.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384787/a7c521b94eb153008f2d_ex0umg.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384798/aec98becb6d15a5fc95e_monues.svg',
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389855/92e67a71aaaa98dea5ad_ogsw1y.svg'
    ]

    useEffect(() => {
        if (wrapperRef.current) {
            let height = wrapperRef.current.clientHeight;
            setComponentHeight(height)
        }
    }, [newBoardModal.location]);

    function useClickOutsideCmp(ref) {
        useEffect(() => {

            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [])
    }

    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            onSetIsOpenModal()
            updateNewBoardModal(newBoardModal)
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onAddBoard({ title: txtInput, bgc: chosenBgcImg })
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setTxtInput(value)
    }

    return (
        <div className="new-board-modal-overlay" onClick={handleClickOutside} >

            <section className="new-board-modal"
                ref={wrapperRef}
                style={{
                    top: newBoardModal.location.top + componentHeight > screenHeight ? screenHeight - componentHeight - 20 : newBoardModal.location.top,
                    left: newBoardModal.location.left + 304 > screenWidth ? screenWidth - 315 : newBoardModal.location.left
                }}>

                <div className="preview">
                    <h1>Create board</h1>
                    <div className="chosen-bgc">
                        <div className="chosen-bgc-img"
                            style={{
                                backgroundImage: `url("${chosenBgcImg}"), url(${chosenBgcImg})`
                            }}>
                            <NewBoardSvg />
                        </div>
                    </div>
                </div>

                <div className="bgc-options">
                    <h1>Background</h1>
                    <div className="img-bgc flex justify-space-b">
                        {paletteImgs.map((ImgOption, index) => (
                            <button
                                key={index}
                                className="color-button"
                                onClick={() => setChosenBgcImg(paletteImgs[index])}
                                style={{
                                    backgroundImage: `url(${ImgOption})`, //`url("${ImgOption}")`
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover'
                                }}
                            ></button>
                        ))}
                    </div>
                    <div className="color-bgc flex justify-space-b">
                        {palette.map((colorOption, index) => (
                            <button
                                key={index}
                                className="color-button"
                                onClick={() => setChosenBgcImg(palette[index])}
                                style={{ backgroundImage: `url(${colorOption})` }}
                            ></button>
                        ))}
                    </div>
                </div>

                <div className="board-title">
                    <h1>Board title <span>*</span></h1>
                    <form action="" onSubmit={handleSubmit}>
                        <input value={txtInput} type="text" name="name" onChange={handleChange} required />
                    </form>
                    <p><span>👋</span>Board title is required</p>
                </div>
                
                <div className="exit-btn" onClick={onSetIsOpenModal}>
                    <ExitBtnSvg />
                </div>

            </section>

        </div>
    )
}