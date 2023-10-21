import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function MoveList({ group, board, onSetBoard, onHandleClose,onMoveBoards }) {
    const boards = useSelector(storeState => storeState.boardModule.boards);
    const selectBoardList = [...boards]
    const selectGroupList = [...board.groups]

    const selectRef = useRef(null);
    const selectedBoardRef = useRef(null)
    const currentGroupPosition = selectGroupList.findIndex(item => item.id === group.id);
    const currentBoardPosition = selectBoardList.findIndex(item => item._id === board._id);

    const [selectedBoard, setSelectedBoard] = useState(board.title);
    const [selectedPosition, setSelectedPosition] = useState(currentGroupPosition);
    useEffect(() => {

    }, [selectedBoard, selectedPosition])

    function handleSelectClick({ target }) {
        selectRef.current = target
        selectRef.current.selectedIndex = selectedPosition;
    }

    function handleSelectChange({ target }) {
        const movedBoard = selectBoardList.find(item => item._id === target.value)
        selectedBoardRef.current = movedBoard
        setSelectedBoard(movedBoard.title)
        if (target.value !== board._id) setSelectedPosition(0)
        else setSelectedPosition(currentGroupPosition)

    }

    function handleChangePosition({ target }) {
        setSelectedPosition(target.value);
    }

     function onMoveList() {
        if (selectedPosition === currentGroupPosition && selectedBoard === board.title) onHandleClose()

        else if (selectedPosition !== currentGroupPosition && selectedBoard === board.title) {
            const copiedGroup = group
            selectGroupList.splice(currentGroupPosition, 1)
            selectGroupList.splice(selectedPosition, 0, copiedGroup)
            const updatedBoard = { ...board }
            updatedBoard.groups = selectGroupList
            onSetBoard(updatedBoard)
            onHandleClose()
        }
        else if (selectedBoard !== board.title) {
            let sourceBoard = { ...board }
            sourceBoard.groups.splice(currentGroupPosition, 1)
            const destinationBoard = selectedBoardRef.current
            destinationBoard.groups.splice(selectedPosition, 0, group)
            onMoveBoards(sourceBoard,destinationBoard)
            
        }

    }


    return (
        <section className="move-list">
            <form>
            <div className='button-link'>
                <span className='label'>Board</span>
                <span>{selectedBoard}</span>
                <select ref={selectRef} onClick={handleSelectClick} onChange={handleSelectChange} value={selectedBoard}>
                    <optgroup label='WorkSpace name'>
                        {selectBoardList.map((item) => {
                            if (item._id !== board._id)
                                return (
                                    <option key={item._id} value={item._id}>{item.title}</option>
                                )
                        })}
                    </optgroup>
                    <optgroup>
                        <option value={board._id} key={board._id}>(current)</option>
                    </optgroup>
                </select>
            </div>

            <div className='button-link'>
                <span className='label'>Position</span>
                <span>{(+selectedPosition + 1)}</span>
                <select ref={selectRef} onClick={handleSelectClick} onChange={handleChangePosition} value={selectedPosition}>
                    {selectGroupList.map((item, index) => {
                        if (item.id === group.id) return (<option value={index} key={item.id} >{(index + 1) + " (current)"}</option>)
                        else return (<option value={index} key={item.id}>{index + 1}</option>)
                    })}
                </select>
            </div>
            <div className=" move-list-btn save-delete-btns flex justify-space-b">
                <button onClick={onMoveList} >Move</button>
            </div>
            </form>
        </section>
    )
}
