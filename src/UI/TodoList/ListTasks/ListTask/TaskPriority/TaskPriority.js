import React, { useState } from 'react'
import styles from './TaskPriority.module.css'


const TaskPriority = (props) => {

    const [editMode, setMode ] = useState(false)
    const [currentValue, setCurrentValue ] = useState('')

    const setEditMode = (e) => {
        setMode(true)
        setCurrentValue(e.currentTarget.textContent.trim())
    }
    const setEditModeKey = (e) => {
        if (e.keyCode === 13) setEditMode(e)
    }
    const resetEditMode = () => setMode(false)

    const setTaskPriority = (e) => {
        if (e.currentTarget.value !== currentValue) {
            const priority = priorityArray.findIndex((prior) => prior === e.currentTarget.value);
            props.updateTask({ priority });
        }
        resetEditMode()
    }

    const setPriorityOnKey = (e) => {
        if (e.keyCode === 27) resetEditMode() 
        if (e.keyCode === 13) setTaskPriority(e)
    }

    const setPriorityClick = (e) => {
        if (e.currentTarget.value !== currentValue) {
            setTaskPriority(e)
        }
    }

    
    const getTaskPriority = () => priorityArray[props.priority]
    const getTaskPriorityStyle = () => styles[ priorityArray[props.priority] ] + ' ' + styles.taskPriority
    
    const priorityArray = ['Low', 'Middle', 'High', 'Urgent', 'Later']

    const priorityOptions = priorityArray.map(prior =>
        <option key={prior} className={styles[prior]}>{prior}</option>)

    if (!editMode) {
        return (
            <span tabIndex='0'
                className={getTaskPriorityStyle()}
                onClick={setEditMode}
                onKeyDown={setEditModeKey} >
                {getTaskPriority()} &nbsp;
            </span>
        )
    } else {
        return (
            <select
                defaultValue={getTaskPriority()}
                className={getTaskPriorityStyle()}
                onBlur={resetEditMode}
                onKeyDown={setPriorityOnKey}
                onClick={setPriorityClick}
                autoFocus={true} >{priorityOptions}</select>
        )
    }
}

export default TaskPriority