import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './TaskOrder.module.css'
import { reorderTask } from '../../../../../Redux/appReducer'


const TaskOrder = ({ listId, taskId, tasksCount, renderIndex, reorderTask }) => {

    const [selectMode, setMode] = useState(false)
    const [currentOrder, setCurrentOrder] = useState(null)
    
    const enableSelect = (e) => {
        setMode(true)
        const currOrd = e.currentTarget.textContent
            .split('')
            .filter((el) => el
            .match('^[0-9]$')).join('')
        
        setCurrentOrder(currOrd)
        
    }

    const enableSelectKey = (e) => {
        if (e.charCode === 13) enableSelect(e)
    }

    const disableSelect = () => setMode(false)

    const setTaskOrder = (e) => {
        const nextRenderPos = e.currentTarget.value
            const currPos = renderIndex - 1
            reorderTask(listId, taskId, currPos, nextRenderPos)
            disableSelect()
    }

    const setOrderOnKey = (e) => {
        if (e.keyCode === 27) disableSelect()
        if (e.keyCode === 13) setTaskOrder(e)
    }

    const setOrderOnClick = (e) => {
        if (e.currentTarget.value !== currentOrder) {
            
            setTaskOrder(e)
        }
    }

    const getOptions = () => {
        let optionArr = []
        for (let i = 1; i <= tasksCount; i++) {
            const el = <option value={i} key={i}>{i}</option>
            optionArr.push(el)
        }
        return optionArr
    }

    const optionArr = getOptions()

    if (selectMode) return (
        <select autoFocus
            onBlur={disableSelect}
            onKeyDown={setOrderOnKey}
            onClick={setOrderOnClick}
            defaultValue={renderIndex}>{optionArr}</select>
    )

    else return (
        <span tabIndex='0'
            className={styles.taskOrder}
            onClick={enableSelect}
            onKeyPress={enableSelectKey}>&nbsp;{renderIndex}&nbsp;-&nbsp;</span>
    )
}

export default connect(null, { reorderTask })(TaskOrder)