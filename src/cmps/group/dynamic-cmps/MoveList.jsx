import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadBoards } from '../../../store/board.actions';

export function MoveList({ group, board, onSetBoard, onHandleClose, onMoveBoards }) {

    const boards = useSelector(storeState => storeState.boardModule.boards);
    let selectBoardList = [...boards]
    const selectGroupList = [...board.groups]

    const currentGroupPosition = selectGroupList.findIndex(g => g.id === group.id);
    const [selectedBoard, setSelectedBoard] = useState(board);
    const [selectedPosition, setSelectedPosition] = useState(currentGroupPosition);

    useEffect(() => {
        loadBoards()
    }, [])

    function handleSelectChange({ target }) {
        const targetBoard = selectBoardList.find(item => item._id === target.value)
        setSelectedBoard(targetBoard)
        if (target.value !== board._id) setSelectedPosition(0)
        else setSelectedPosition(currentGroupPosition)
    }

    function handleChangePosition({ target }) {
        setSelectedPosition(target.value);
    }

    function onMoveList(event) {
        event.preventDefault()
        if (selectedPosition === currentGroupPosition && selectedBoard.title === board.title) onHandleClose()

        else if (selectedPosition !== currentGroupPosition && selectedBoard.title === board.title) {
            const copiedGroup = group
            selectGroupList.splice(currentGroupPosition, 1)
            selectGroupList.splice(selectedPosition, 0, copiedGroup)
            const updatedBoard = { ...board }
            updatedBoard.groups = selectGroupList
            onSetBoard(updatedBoard)
            onHandleClose()
        }
        else if (selectedBoard.title !== board.title) {
            let sourceBoard = { ...board }
            sourceBoard.groups.splice(currentGroupPosition, 1)
            const destinationBoard = selectedBoard
            destinationBoard.groups.splice(selectedPosition, 0, group)
            onMoveBoards(sourceBoard, destinationBoard)
        }
    }

    return (
        <section className="move-list">

            <form>

                <div className='button-link'>
                    <span className='label'>Board</span>
                    <span>{selectedBoard.title}</span>
                    <select onChange={handleSelectChange} value={selectedBoard._id}>
                        <optgroup label='WorkSpace name'>
                            {selectBoardList
                                .filter((b) => b._id !== board._id)
                                .map((b) => (
                                    <option key={b._id} value={b._id}>
                                        {b.title}
                                    </option>
                                ))}
                        </optgroup>
                        <optgroup>
                            <option value={board._id} key={board._id}>(current)</option>
                        </optgroup>
                    </select>
                </div>

                <div className='button-link'>
                    <span className='label'>Position</span>
                    <span>{(+selectedPosition + 1)}</span>
                    <select onChange={handleChangePosition} value={selectedPosition}>
                        {(selectedBoard._id === board._id) && selectGroupList.map((g, index) => {
                            if (g.id === group.id) return (<option value={index} key={g.id} >{(index + 1) + " (current)"}</option>)
                            else return (<option value={index} key={g.id}>{index + 1}</option>)
                        })}
                        {(selectedBoard._id !== board._id) &&
                            selectedBoard.groups.map((g, index) => {
                                if (g.id === group.id) return (<option value={index} key={g.id} >{(index + 1) + " (current)"}</option>)
                                else return (<option value={index} key={index}>{index + 1}</option>)
                            })}
                        {(selectedBoard._id !== board._id) && (
                            <option value={selectedBoard.groups.length} key="extra-option">
                                {selectedBoard.groups.length + 1}
                            </option>
                        )}
                    </select>
                </div>

                <div className=" move-list-btn save-delete-btns flex justify-space-b">
                    <button onClick={onMoveList} >Move</button>
                </div>

            </form>

        </section>
    )
}
