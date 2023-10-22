import React, { useState, useEffect } from 'react'
import { ClockSvg } from '../../svg/ImgSvg'

export function DateTaskBtn({ dueDate, startDate, onIsCheckDate, group, task }) {

    const currentDate = new Date()

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ]

    if (dueDate) {
        var { timeStamp, isDone } = dueDate
        const dueDateInMilliseconds = timeStamp * 1000
        const date = new Date(dueDateInMilliseconds)
        const month = monthNames[date.getMonth()]
        const day = date.getDate()
        const year = date.getFullYear()
        var formattedDate = `${month} ${day}${currentDate.getFullYear() !== year ? ', ' + year : ''}`
        var isDueDatePassed = date < currentDate
    }
    var [isTaskDone, setIsClicked] = useState(dueDate ? isDone : false)

    if (startDate) {
        const startDateTimestamp = task.startDate
        const startDate = new Date(startDateTimestamp * 1000)
        const startMonth = monthNames[startDate.getMonth()]
        const startDay = startDate.getDate()
        const startYear = startDate.getFullYear()
        var formattedStartDate = `${startMonth} ${startDay}${currentDate.getFullYear() !== startYear ? ', ' + startYear : ''}`
    }

    useEffect(() => {
        if (dueDate && dueDate.isDone && isDueDatePassed) setIsClicked(true)
        if (dueDate && !dueDate.isDone && isDueDatePassed) setIsClicked(false)
    }, [isDueDatePassed])

    function handleClick(ev) {
        ev.stopPropagation()
        if (dueDate) onIsCheckDate(group, task)
        isDone = !isDone
        setIsClicked(dueDate ? isDone : false)
    }

    var dateOutput
    if (startDate && !dueDate) dateOutput = "Starts: " + formattedStartDate
    if (!startDate && dueDate) dateOutput = formattedDate
    if (startDate && dueDate) dateOutput = formattedStartDate + ' - ' + formattedDate

    const dynClass1 = isDueDatePassed ? 'text-white' : ''
    const dynClass2 = ((isDueDatePassed || isTaskDone) && dueDate) ? 'due-date-passed' : ''
    const dynClass3 = isTaskDone ? 'clicked' : ''
    const dynClass4 = ((startDate && !dueDate) || (dueDate && !isDueDatePassed && !isTaskDone)) ? 'gray-color' : ''
    return (
        <div
            className={`btn-task-f flex align-center ${dynClass2} ${dynClass3} ${dynClass4}`}
            onClick={handleClick}
        >
            <ClockSvg />
            <p className={`fs12 ${dynClass1} ${dynClass4}`}>{dateOutput}</p>
        </div>
    )
}
