import axios from "axios"
import { useState } from "react"

export function ChatGpt() {

    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')

    async function handleSubmit(ev) {
        ev.preventDefault()

        axios.post("http://localhost:3030/chat", { prompt: 'what is youtube?' })
            .then(res => {
                setResponse(res.data)
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="chat-gpt-overlay">

            <section className="chat-gpt-cmp">
                <form action="" onSubmit={handleSubmit}>

                    <input type="text" />
                </form>
            </section>
        </div>
    )
}