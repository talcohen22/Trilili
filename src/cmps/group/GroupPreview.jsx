import { useState } from "react";
import { DotsSvg, GenerateTemplateBtnSvg } from "../svg/ImgSvg";
import { TaskList } from "../task/TaskList";

export function GroupPreview({ group }) {
    const [inputValue, setInputValue] = useState(group.title)

    function handleInputChange(ev) {
        setInputValue(ev.target.value)
    }

    return (
        <section className="group-card">

            <div className="group-header flex justify-space-b align-center ">
                <input
                    className="group-title"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={(ev) => ev.target.classList.add("focused")}
                    onBlur={(ev) => ev.target.classList.remove("focused")}
                    autoFocus />
                <button className="group-btn flex justify-center align-center">
                    <DotsSvg />
                </button>
            </div>

            <div className="group-tasks">
                <TaskList />
            </div>

            <div className="group-footer flex justify-center align-center">
                <button className="group-btn add-task-btn flex align-center">
                    Add a card
                </button>
                <button className="group-btn flex justify-center align-center">
                    <GenerateTemplateBtnSvg />
                </button>
            </div>

        </section>
    )
}

