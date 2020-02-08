import React, { useState } from 'react'
import styles from './TaskPriority.module.css'


const TaskPriority = (props) => {

    const [editMode, setMode ] = useState(false)

    const setTaskPriority = (e) => {
        const priority = priorityArray.findIndex((prior) => prior === e.currentTarget.value);
        props.updateTask({ priority });
        resetEditMode()
    }

    const priorityArray = ['Low', 'Middle', 'High', 'Urgent', 'Later']

    const priorityOptions = priorityArray.map(prior =>
        <option className={styles[prior]} key={prior} >{prior}</option>)

    const getTaskPriority = () => priorityArray[props.priority]
    const getTaskPriorityStyle = () => styles[ priorityArray[props.priority] ] + ' ' + styles.taskPriority

    const setEditMode = () => setMode(true)
    const resetEditMode = () => setMode(false)

    const priorityOnKey = (e) => { if (e.keyCode === 27) resetEditMode() }

    if (!editMode) {
        return (
            <span onClick={setEditMode} className={getTaskPriorityStyle()}>
                {getTaskPriority()} &nbsp;
            </span>
        )
    } else {
        return (
            <select
                defaultValue={getTaskPriority()}
                className={getTaskPriorityStyle()}
                onChange={setTaskPriority}
                onBlur={resetEditMode}
                onKeyDown={priorityOnKey}
                autoFocus={true} > {priorityOptions} </select>
        )
    }
}

export default TaskPriority