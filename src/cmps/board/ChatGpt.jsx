import axios from "axios"
import { useState } from "react"
import { createBoardPrompt } from "../../services/chat-gpt-prompt.service"
export function ChatGpt() {

    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')

    function handleChange(ev){
        const value= ev.target.value
        setPrompt(value)
    }
    async function handleSubmit(ev) {
        ev.preventDefault()
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


    return (
        <div className="chat-gpt-overlay">

            <section className="chat-gpt-cmp">
                <form action="" onSubmit={handleSubmit}>

                    <input onChange={handleChange} type="text" />
                </form>
            </section>
        </div>
    )
}