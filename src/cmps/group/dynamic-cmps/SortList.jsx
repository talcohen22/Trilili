
export function SortList({ group, board, onSetBoard, onHandleClose }) {

    const selectGroupList = [...board.groups]
    const tasks = [...group.tasks]
    const currentGroupPosition = selectGroupList.findIndex(item => item.id === group.id)

    function SortByDate(direction) {

        if (direction === 'DESC') {
            tasks.sort((taskA, taskB) => {
                return taskB.createdAt - taskA.createdAt
            })
        }
        else if (direction === 'ASC') {
            tasks.sort((taskA, taskB) => {
                return taskA.createdAt - taskB.createdAt
            })
        }
        board.groups[currentGroupPosition].tasks = tasks
        onSetBoard(board)
        onHandleClose()
    }

    function SortAlphabetically() {
        tasks.sort((taskA, taskB) => {
            const titleA = taskA.title.toLowerCase()
            const titleB = taskB.title.toLowerCase()
            return titleA.localeCompare(titleB);
        })
        board.groups[currentGroupPosition].tasks = tasks
        onSetBoard(board)
        onHandleClose()
    }

    return (
        <section>
            <ul className='group-action-content sort-tasks-list'>
                <li className='group-action-btn' onClick={() => SortByDate('DESC')}>Date created (newest first)</li>
                <li className='group-action-btn' onClick={() => SortByDate('ASC')}>Date created (oldest first)</li>
                <li className='group-action-btn' onClick={SortAlphabetically}>Card name (alphabetically)</li>
            </ul>
        </section>
    )
}
