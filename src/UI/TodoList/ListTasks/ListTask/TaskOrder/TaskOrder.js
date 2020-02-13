import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './TaskOrder.module.css'
import { reorderTask } from '../../../../../Redux/reducer'


const TaskOrder = ({ listId, taskId, tasksCount, renderIndex, reorderTask }) => {

    const [selectMode, setMode] = useState(false)
    const setOnMode = () => setMode(true)
    const resetMode = () => setMode(false)
    const resetOnKey = (e) => { if (e.keyCode === 27) resetMode() }

    const reorderOnSelect = (e) => {
        const nextRenderPos = e.currentTarget.value
        const currPos = renderIndex - 1
        reorderTask(listId, taskId, currPos, nextRenderPos)
        resetMode()
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
            onBlur={resetMode}
            onKeyDown={resetOnKey}
            onChange={reorderOnSelect}
            defaultValue={renderIndex}>{optionArr}</select>
    )

    return <span className={styles.taskOrder} onClick={setOnMode}> {renderIndex} - </span>
}

export default connect(null, { reorderTask })(TaskOrder)