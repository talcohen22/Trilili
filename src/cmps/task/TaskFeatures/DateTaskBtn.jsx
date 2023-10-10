import React, { useState, useEffect } from 'react';
import { ClockSvg } from '../../svg/ImgSvg';

export function DateTaskBtn({
    dueDate,
    onIsCheckDate,
    group,
    task }) {
    const { timeStamp, isDone } = dueDate
    const dueDateInMilliseconds = timeStamp * 1000
    const date = new Date(dueDateInMilliseconds)
    const currentDate = new Date()

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    const formattedDate = `${month} ${day}${currentDate.getFullYear() !== year ? ', ' + year : ''}`
    const isDueDatePassed = date < currentDate
    const [isTaskDone, setIsClicked] = useState(isDone)

    useEffect(() => {
        if (isDueDatePassed) {
            setIsClicked(!isTaskDone)
        }
    }, [isDueDatePassed])

    function handleClick(ev) {
        ev.stopPropagation()
        setIsClicked(!isTaskDone)
        onIsCheckDate(group, task)
    }

    return (
        <div
            className={`btn-task-f flex align-center ${(isDueDatePassed || isTaskDone) ? 'due-date-passed' : ''} ${isTaskDone ? 'clicked' : ''}`}
            onClick={handleClick}
        >
            <ClockSvg />
            <p className={`fs12 ${isDueDatePassed ? 'text-white' : ''}`}>{formattedDate}</p>
        </div>
    );
}
