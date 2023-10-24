import { removeChecklist, updateChecklistTitle, updateIsDoneTodo } from "../../../store/board.actions";
import { ExitBtnSvg } from "../../svg/ImgSvg";
import { useState } from 'react'
import React from 'react';

export function CheckListData({ board, group, task, checklist }) {

    const [isTitleInputFocused, setTitleInputFocus] = useState(false)
    const [focusedTodoId, setFocusedTodoId] = useState(null)
    const [isAddItemFocused, setIsAddItemFocused] = useState(false)
    const inputRefs = {}

    const [checkListTitle, setCheckListTitle] = useState(checklist.title)
    const [currTodo, setTodo] = useState({ id: '', title: '' })
    const [newTodoTitle, setNewTodoTitle] = useState('')

    function onFocusChecklistInput() {
        setTitleInputFocus(true)
    }

    function onBlurChecklistInput() {
        console.log("bbbb");
        setTitleInputFocus(false)
        setCheckListTitle(checklist.title)
    }

    function onFocusTodoInput(todoId) {
        setFocusedTodoId(todoId)
    }

    function onBlurTodoInput() {
        setFocusedTodoId(null)
        setTodo({ id: '', title: '' })
    }

    function onFocusAddItemInput() {
        setIsAddItemFocused(true)
    }

    function onBlurAddItemInput() {
        setIsAddItemFocused(false)
        setNewTodoTitle('')
    }

    function onHandleTitleChange({ target }) {
        setCheckListTitle(target.value)
    }

    function onHandleTodoChange({ target }, todoId) {
        setTodo({ id: todoId, title: target.value })
    }

    function onHandleAddItemInput({ target }) {
        setNewTodoTitle(target.value)
    }

    async function onRemoveChecklist() {
        try {
            await removeChecklist(board, group, task, checklist.id)
        } catch (err) {
            console.log('Cannot remove checklist', err)
        }
    }

    async function onUpdateIsDoneTodo({ target }, todoId) {
        try {
            updateIsDoneTodo(board, group, task, checklist, todoId, target.checked)
        } catch (err) {
            console.log('Cannot update todo', err)
        }
    }

    async function onSaveCheckListTitle(ev) {
        ev.preventDefault()
        console.log("aaaaaaaaaaa");
        try {
            await updateChecklistTitle(board, group, task, checklist, checkListTitle)
        } catch (err) {
            throw err
        }
    }

    async function onSaveTodoTitle() {

    }

    return (
        <section className="check-list-container">

            {/* checklist title */}
            <div className="header flex align-center justify-space-b">
                <form action="" onSubmit={onSaveCheckListTitle}>
                    <input className="checklist-title"
                        value={checkListTitle}
                        onFocus={onFocusChecklistInput}
                        onBlur={onBlurChecklistInput}
                        onChange={onHandleTitleChange}>
                    </input>
                </form>
                <button className={`delete-checklist ${isTitleInputFocused ? 'focused' : ''}`}
                    onClick={onRemoveChecklist}>
                    Delete
                </button>
            </div>

            <div className={`update-btns ${isTitleInputFocused ? 'focused' : ''}`}>
                <button className="save-title" onClick={onSaveCheckListTitle}>Save</button>
                <button className="exit-title"><ExitBtnSvg /></button>
            </div>

            {/* todos */}
            {checklist.todos.length > 0 && checklist.todos.map(todo =>
                <React.Fragment key={todo.id}>
                    <div className="todo flex" >
                        <input type="checkbox"
                            checked={todo.isDone}
                            onChange={(ev) => onUpdateIsDoneTodo(ev, todo.id)} />
                        <input className="todo-title"
                            value={currTodo.id === todo.id ? currTodo.title : todo.title}
                            onFocus={() => onFocusTodoInput(todo.id)}
                            onBlur={onBlurTodoInput}
                            onChange={(ev) => onHandleTodoChange(ev, todo.id)}
                            ref={(el) => (inputRefs[todo.id] = el)}>
                        </input>
                    </div>

                    <div className={`update-btns todo ${focusedTodoId === todo.id ? 'flex' : ''}`}>
                        <button className="save-title" onClick={onSaveTodoTitle}>Save</button>
                        <button className="exit-title"><ExitBtnSvg /></button>
                    </div>
                </React.Fragment>
            )}

            {/* add item */}
            <input className="add-item"
                value={newTodoTitle}
                placeholder="Add an item"
                onChange={onHandleAddItemInput}
                onFocus={onFocusAddItemInput}
                onBlur={onBlurAddItemInput}>
            </input>

            {isAddItemFocused && <div className={`update-btns-add-item flex`}>
                <button className="save-title" onClick={onSaveTodoTitle}>Save</button>
                <button className="exit-title flex align-center"><ExitBtnSvg /></button>
            </div>}

        </section>
    )
}