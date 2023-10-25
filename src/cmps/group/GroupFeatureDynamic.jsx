import { useEffect,useRef } from 'react'
import { BackBtnSvg, ExitBtnSvg } from "../svg/ImgSvg";
import { CopyList } from './dynamic-cmps/CopyList';
import { MoveList } from './dynamic-cmps/MoveList';
import { MoveTasksList } from './dynamic-cmps/MoveTasksList';
import { SortList } from './dynamic-cmps/SortList';

export function GroupFeatureDynamic({ dynamicParams, onSetIsDynamicCmpOpen, groupActionPostion, setDynamicParams, board,onSetBoard, group, onHandleClose,saveCopiedGroup,onMoveBoards,openGroupActionModal }) {
    const { left, top } = groupActionPostion
    function hadleIsDynamicCmpOpen(){
        openGroupActionModal()
        onSetIsDynamicCmpOpen(false)
    }
    const modalRef= useRef(null)
    const isComponentMounted = useRef(false)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                if (isComponentMounted.current) {
                    onHandleClose();
                }
            }
            isComponentMounted.current = true
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, [onHandleClose])

    return (
        <div className="dynamic-group-feature-container" style={{ left: left + 'px', top: top + 'px', zIndex: 10000 }} ref={modalRef} >
            <div className='group-modal-header flex justify-space-b'>
                <button className="exit-icon" onClick={hadleIsDynamicCmpOpen}>
                    <BackBtnSvg />
                </button>

                <p className="dyn-group-cmp-header group-feature-header">{dynamicParams.type}</p>


                <button className="exit-icon" onClick={onHandleClose}>
                    <ExitBtnSvg />
                </button>
            </div>
            <div className='dynamic-feature-content'>
            {dynamicParams.type === 'Copy list' &&
                <CopyList group={group} saveCopiedGroup={saveCopiedGroup} onHandleClose={onHandleClose} />
            }
            {dynamicParams.type === 'Move list' &&
                <MoveList group={group} board={board} onSetBoard={onSetBoard} onHandleClose={onHandleClose} onMoveBoards={onMoveBoards}/>
            }
            {dynamicParams.type === 'Move all cards in list' &&
                <MoveTasksList group={group} board={board} onSetBoard={onSetBoard} onHandleClose={onHandleClose} onMoveBoards={onMoveBoards}/>
            }
            {dynamicParams.type === 'Sort list' &&
                <SortList group={group} board={board} onSetBoard={onSetBoard} onHandleClose={onHandleClose} onMoveBoards={onMoveBoards}/>
            }
            </div>
        </div>
    )
}
