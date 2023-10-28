import React, { useState, useEffect } from 'react'
import { ClockSvg } from '../../svg/ImgSvg'
import { boardService } from '../../../services/board.service.local'

export function DateTaskBtn({ dueDate, startDate, onIsCheckDate, group, task }) {

    const currentDate = new Date()

    if (dueDate) {
        var { date, formattedDate } = boardService.getFormattedDate(dueDate.timeStamp)
        var isDueDatePassed = date < currentDate
    }

    if (startDate) {
        var formattedStartDate = boardService.getFormattedDate(task.startDate).formattedDate
    }

    function handleClick(ev) {
        ev.stopPropagation()
        if (dueDate) onIsCheckDate(group, task)
    }

    var dateOutput
    if (startDate && !dueDate) dateOutput = "Starts: " + formattedStartDate
    if (!startDate && dueDate) dateOutput = formattedDate
    if (startDate && dueDate) dateOutput = formattedStartDate + ' - ' + formattedDate

    const dynClass1 = isDueDatePassed ? 'text-white' : ''
    const dynClass2 = (task.dueDate && isDueDatePassed && !task.dueDate.isDone) ? 'due-date-passed' : ''
    const dynClass3 = (task.dueDate && ((isDueDatePassed && task.dueDate.isDone) || (!isDueDatePassed && task.dueDate.isDone))) ? 'clicked' : ''
    const dynClass4 = ((startDate && !dueDate) || (dueDate && !isDueDatePassed && !task.dueDate.isDone)) ? 'gray-color' : ''

    return (
        <div className={`btn-task-f flex align-center ${dynClass2} ${dynClass3} ${dynClass4}`}
            onClick={handleClick}>
            <ClockSvg />
            <p className={`fs12 ${dynClass1} ${dynClass4}`}>{dateOutput}</p>
        </div>
    )
}
