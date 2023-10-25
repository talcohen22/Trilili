import { useState, useRef, useEffect } from 'react';

export function MoveTasksList({ group, board, onSetBoard, onHandleClose }) {

    const selectGroupList = [...board.groups]

    const currentGroupPosition = selectGroupList.findIndex(item => item.id === group.id)


    function MoveTasksList({target}) {
       const selectedPosition = target.value
        if (selectedPosition === currentGroupPosition ) onHandleClose()
        
        else if (selectedPosition !== currentGroupPosition ) {
            const copiedtasks =[...group.tasks]
            selectGroupList[currentGroupPosition].tasks.splice(0,group.tasks.length)
            const selectedListLength= selectGroupList[selectedPosition].tasks.length
            selectGroupList[selectedPosition].tasks.push(...copiedtasks)
            const updatedBoard = { ...board }
            updatedBoard.groups = selectGroupList
            onSetBoard(updatedBoard)
            onHandleClose()
        }
    
    }

    return (
        <section className="move-tasks-list">
            <ul className='group-action-content'>
                {selectGroupList.map((group, index) => {
                    return (
                        <li onClick={MoveTasksList} className={(index === currentGroupPosition) ? 'group-action-btn disabled' :'group-action-btn'} value={index} key={group.id}>
                            {(index === currentGroupPosition) ? group.title + ' (current)' : group.title}
                        </li>)
                })}
            </ul>

        </section>
    )
}
