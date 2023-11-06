import axios from "axios"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { createBoardPrompt } from "../../services/chat-gpt-prompt.service"
import { ChatGptSvg } from "../svg/ImgSvg"

export function ChatGpt({ onSetIsChatGptIsOpen }) {
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)

    const wrapperRef = useRef(null)
    useClickOutsideCmp(wrapperRef)

    function useClickOutsideCmp(ref) {
        useEffect(() => {
            function handleClickOutside(event) { }

            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [ref])
    }

    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            onSetIsChatGptIsOpen(false)
        }
    }

    function handleChange({ target }) {
        setPrompt(target.value)
    }

    function handleChange(ev){
        const value= ev.target.value
        setPrompt(value)
    }
    async function handleSubmit(ev) {
        ev.preventDefault()

        if (prompt) {
            setIsSubmit(true)
 const boardPrompt =createBoardPrompt(prompt)
        console.log(boardPrompt);
        axios.post("http://localhost:3030/chat", { prompt: boardPrompt })
            .then(res => {
                setResponse(res.data)
                // let generatedBoard= res.data
                // generatedBoard.style.backgroundImage="https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384751/707f35bc691220846678_pjgxni.svg";
                 console.log(res.data)
                

            })
            .catch(err => {
                console.log(err);
            })
    }


            ////////////////כשזה נגמר להעביר לנתיב של הבורד החדש!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }

    }

    console.log("return");
    return (
        <div className="chat-gpt-overlay flex justify-center align-center" onClick={handleClickOutside}>

            <section className="chat-gpt-cmp" ref={wrapperRef}>

                <div className="chat-messages">
                    <div className="flex justify-center"><ChatGptSvg /></div>
                    <div className="message received">
                        <p>Hello! Please type a topic for the project and I can help you build it 🤩</p>
                    </div>
                    {isSubmit && <div className="message sent">
                        <p>{prompt}</p>
                    </div>}
                    {!isSubmit && <form className="flex" onSubmit={handleSubmit}>
                        <input className="chat-input" type="text" value={prompt} onChange={handleChange} />
                        <button>Send</button>
                    </form>}
                    {isSubmit && <div className="loader-container flex justify-center">
                        <span className="loader"></span>
                    </div>}
                </div>
                    <input onChange={handleChange} type="text" />
                </form>
            </section>
            
        </div>
    )
}