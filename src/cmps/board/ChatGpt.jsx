import axios from "axios"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { createBoardPrompt } from "../../services/chat-gpt-prompt.service"
import { ChatGptSvg } from "../svg/ImgSvg"
import { useNavigate } from "react-router"
import { addBoard } from "../../store/board.actions"
import { utilService } from "../../services/util.service"

export function ChatGpt({ onSetIsChatGptIsOpen, addGeneratedBoard }) {
    const [prompt, setPrompt] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const wrapperRef = useRef(null)
    useClickOutsideCmp(wrapperRef)

    const moveApartmentBoard = {
        "title": "Moving Apartment Project",
        "isStarred": false,
        "archivedAt": null,
        "createdBy": {
            "id": 1,
            "fullname": "Trilili",
            "imgUrl": ""
        },
        "style": {
            "backgroundImage": "https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384798/aec98becb6d15a5fc95e_monues.svg"
        },
        "members": [],
        "groups": [
            {
                "id": "grp2",
                "title": "Scheduling and Planning",
                "tasks": [
                    {
                        "id": "task4",
                        "title": "Hire a Moving Company",
                        "byMember": null,
                        "status": null,
                        "priority": null,
                        "description": "Research and choose a moving company",
                        "comments": [],
                        "checklists": [
                            {
                                "checklistId": "chk4",
                                "title": "Moving Company Research",
                                "todos": [
                                    {
                                        "id": "todo7",
                                        "title": "Research moving companies online",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo8",
                                        "title": "Compare prices and services",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachment": [],
                        "memberIds": [],
                        "style": {
                            "backgroundColor": "#579dff",
                            "cover": ""
                        },
                        "labelIds": [
                            "TT33ft"
                        ],
                        "createdAt": 1699344301844,
                        "dueDate": null,
                        "startDate": null
                    },
                    {
                        "id": "task5",
                        "title": "Schedule Utility Cancellations",
                        "byMember": null,
                        "status": null,
                        "priority": null,
                        "description": "Contact utility companies and schedule service cancellations for moving day",
                        "comments": [],
                        "checklists": [
                            {
                                "checklistId": "chk5",
                                "title": "Utility Cancellation Checklist",
                                "todos": [
                                    {
                                        "id": "todo9",
                                        "title": "Contact electricity company",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo10",
                                        "title": "Contact gas company",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo11",
                                        "title": "Contact water company",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachment": [],
                        "memberIds": [],
                        "style": {
                            "backgroundColor": "#60c6d2",
                            "cover": ""
                        },
                        "labelIds": [],
                        "createdAt": 1699344301844,
                        "dueDate": null,
                        "startDate": null
                    },
                    {
                        "id": "task6",
                        "title": "Reserve Moving Truck",
                        "byMember": null,
                        "status": null,
                        "priority": null,
                        "description": "Rent a moving truck for moving day",
                        "comments": [],
                        "checklists": [
                            {
                                "checklistId": "chk6",
                                "title": "Moving Truck Reservation Checklist",
                                "todos": [
                                    {
                                        "id": "todo12",
                                        "title": "Check availability and reserve truck",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo13",
                                        "title": "Confirm reservation with moving company",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachment": [],
                        "memberIds": [],
                        "style": {
                            "backgroundColor": "#e774bb",
                            "cover": ""
                        },
                        "labelIds": [
                            "pxz3SH"
                        ],
                        "createdAt": 1699344301844,
                        "dueDate": null,
                        "startDate": null
                    }
                ]
            },
            {
                "id": "grp1",
                "title": "Packing and Organizing",
                "tasks": [
                    {
                        "id": "task1",
                        "title": "Pack Clothes",
                        "byMember": null,
                        "status": null,
                        "priority": null,
                        "description": "Sort and pack all clothes",
                        "comments": [],
                        "checklists": [
                            {
                                "checklistId": "chk1",
                                "title": "Clothing Packing",
                                "todos": [
                                    {
                                        "id": "todo1",
                                        "title": "Sort clothes into donate, keep, and throw away piles",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo2",
                                        "title": "Pack clothes into boxes or suitcases",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachment": [
                            {
                                "fileName": "1660990_1.jpg",
                                "url": "http://res.cloudinary.com/dug2dklcy/image/upload/v1699363068/jwbh749hh8d6q1vi0qvo.jpg"
                            }
                        ],
                        "memberIds": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "http://res.cloudinary.com/dug2dklcy/image/upload/v1699363068/jwbh749hh8d6q1vi0qvo.jpg"
                        },
                        "labelIds": [],
                        "createdAt": 1699344301844,
                        "dueDate": null,
                        "startDate": null
                    },
                    {
                        "id": "task2",
                        "title": "Label Boxes",
                        "byMember": null,
                        "status": null,
                        "priority": null,
                        "description": "Label boxes with contents and destination room",
                        "comments": [],
                        "checklists": [
                            {
                                "checklistId": "chk2",
                                "title": "Labeling Checklist",
                                "todos": [
                                    {
                                        "id": "todo3",
                                        "title": "Write contents on box",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo4",
                                        "title": "Label destination room on box",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachment": [],
                        "memberIds": [],
                        "style": {
                            "backgroundColor": "#f87462",
                            "cover": ""
                        },
                        "labelIds": [],
                        "createdAt": 1699344301844,
                        "dueDate": {
                            "timeStamp": 1700085600,
                            "isDone": false
                        },
                        "startDate": null,
                        "isWatch": true
                    },
                    {
                        "id": "task3",
                        "title": "Organize Kitchen Items",
                        "byMember": null,
                        "status": null,
                        "priority": null,
                        "description": "Sort and pack all kitchen items",
                        "comments": [],
                        "checklists": [
                            {
                                "checklistId": "chk3",
                                "title": "Kitchen Packing",
                                "todos": [
                                    {
                                        "id": "todo5",
                                        "title": "Wrap fragile items in bubble wrap",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo6",
                                        "title": "Pack non-fragile items into boxes",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachment": [],
                        "memberIds": [],
                        "style": {
                            "backgroundColor": "#9f8fef",
                            "cover": ""
                        },
                        "labelIds": [],
                        "createdAt": 1699344301844,
                        "dueDate": null,
                        "startDate": null
                    }
                ]
            },
            {
                "id": "grp3",
                "title": "Moving Day",
                "tasks": [
                    {
                        "id": "task8",
                        "title": "Label Fragile Boxes",
                        "byMember": null,
                        "status": null,
                        "priority": null,
                        "description": "Label boxes containing fragile items",
                        "comments": [],
                        "checklists": [
                            {
                                "checklistId": "chk8",
                                "title": "Fragile Box Labeling Checklist",
                                "todos": [
                                    {
                                        "id": "todo16",
                                        "title": "Mark boxes with \"fragile\" label",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo17",
                                        "title": "Use tape to secure top and bottom of boxes",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachment": [],
                        "memberIds": [],
                        "style": {
                            "backgroundColor": "#4bce97",
                            "cover": ""
                        },
                        "labelIds": [],
                        "createdAt": 1699344301844,
                        "dueDate": null,
                        "startDate": null
                    },
                    {
                        "id": "task7",
                        "title": "Pack Bathroom Items",
                        "byMember": null,
                        "status": null,
                        "priority": null,
                        "description": "Pack all bathroom items",
                        "comments": [],
                        "checklists": [
                            {
                                "checklistId": "chk7",
                                "title": "Bathroom Packing Checklist",
                                "todos": [
                                    {
                                        "id": "todo14",
                                        "title": "Pack personal hygiene items",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo15",
                                        "title": "Wrap breakable items",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachment": [
                            {
                                "fileName": "teresa-cowart-richmond-hill-ga-real-estate-TC_July-Blog-Moving-StressC.jpg",
                                "url": "http://res.cloudinary.com/dug2dklcy/image/upload/v1699362811/vrqefkpv8x3fwyybayyn.jpg"
                            }
                        ],
                        "memberIds": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "http://res.cloudinary.com/dug2dklcy/image/upload/v1699362811/vrqefkpv8x3fwyybayyn.jpg"
                        },
                        "labelIds": [],
                        "createdAt": 1699344301844,
                        "dueDate": null,
                        "startDate": null
                    },
                    {
                        "id": "task9",
                        "title": "Pack Electronics",
                        "byMember": null,
                        "status": null,
                        "priority": null,
                        "description": "Pack all electronics into boxes",
                        "comments": [],
                        "checklists": [
                            {
                                "checklistId": "chk9",
                                "title": "Electronic Packing Checklist",
                                "todos": [
                                    {
                                        "id": "todo18",
                                        "title": "Wrap cords and accessories",
                                        "isDone": false
                                    },
                                    {
                                        "id": "todo19",
                                        "title": "Label boxes with which room the items belong in",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachment": [],
                        "memberIds": [],
                        "style": {
                            "backgroundColor": "#e2b203",
                            "cover": ""
                        },
                        "labelIds": [
                            "TT33ft",
                            "pxz3SH"
                        ],
                        "createdAt": 1699344301844,
                        "dueDate": null,
                        "startDate": null
                    }
                ]
            }
        ],
        "activities": [],
        "cmpsOrder": [],
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#4bce97",
                "colorName": "green",
                "shade": ""
            },
            {
                "id": "l102",
                "title": "Important",
                "color": "#e2b203",
                "colorName": "yellow",
                "shade": ""
            },
            {
                "id": "l103",
                "title": "Very important",
                "color": "#faa53d",
                "colorName": "orange",
                "shade": ""
            },
            {
                "id": "l104",
                "title": "Most important",
                "color": "#f87462",
                "colorName": "red",
                "shade": ""
            },
            {
                "id": "l107",
                "title": "CR",
                "color": "#e774bb",
                "colorName": "pink",
                "shade": ""
            },
            {
                "id": "l105",
                "title": "Again",
                "color": "#9f8fef",
                "colorName": "purple",
                "shade": ""
            },
            {
                "id": "l106",
                "title": "Help",
                "color": "#579dff",
                "colorName": "blue",
                "shade": ""
            },
            {
                "id": "l108",
                "title": "Refactor",
                "color": "#60c6d2",
                "colorName": "sky",
                "shade": ""
            },
            {
                "id": "TT33ft",
                "title": "high priority",
                "color": "#4bce97",
                "colorName": "green",
                "shade": ""
            },
            {
                "id": "pxz3SH",
                "title": "donation",
                "color": "#e774bb",
                "colorName": "pink",
                "shade": ""
            }
        ],
        "isExpandedLabels": true
    }

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

    function handleChange(ev) {
        const value = ev.target.value
        setPrompt(value)
    }
    async function handleSubmit(ev) {
        ev.preventDefault()

        if (prompt) {
            setIsSubmit(true)
            const boardPrompt = createBoardPrompt(prompt)
            axios.post("/chat", { prompt: boardPrompt })
                .then(res => {
                    console.log(res.data)
                    const result = res.data
                    addGeneratedBoard(result)
                })
                .catch(err => {
                    console.log(err);
                })
            // const savedBoard = await addBoard(moveApartmentBoard)
            // setTimeout(() => {
            //     addGeneratedBoard(savedBoard)
            // }, 7000);
        }
    }


    return (
        <div className="chat-gpt-overlay flex justify-center align-center" onClick={handleClickOutside}>
            <div className="video-container" style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', opacity: 0.5 }}>
                <video width='100%' height="100%" controls={false} autoPlay={true} loop={true}>
                    <source src='http://res.cloudinary.com/dug2dklcy/video/upload/v1699364560/kmiq7tv60n4ebzpn1wdn.mp4' type="video/mp4" />
                </video>
            </div>
            <section className="chat-gpt-cmp" ref={wrapperRef}>
                <div className="chat-messages">
                    <div className="title flex justify-start align-center">
                        <ChatGptSvg />
                        <div className="classic-10"></div>
                    </div>
                    <div className="message received">
                        <p>Hello! Please type a topic for the project, and I can help you build it 🤩</p>
                    </div>
                    {isSubmit && (
                        <div className="message sent">
                            <p>{prompt}</p>
                        </div>
                    )}
                    {!isSubmit && (
                        <form className="flex" onSubmit={handleSubmit}>
                            <input className="chat-input" type="text" value={prompt} onChange={handleChange} />
                            <button type="submit">Create</button>
                        </form>
                    )}
                    {isSubmit && (
                        <div className="loader-container flex justify-center">
                            <div className="loader"></div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}