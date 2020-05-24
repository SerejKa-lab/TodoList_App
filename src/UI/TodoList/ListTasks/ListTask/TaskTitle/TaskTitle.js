import React, { useState } from 'react'
import styles from './TaskTitle.module.css'
import Tooltip from '../../../../Tooltip/Tooltip'


const TaskTitle = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const [inputError, setError] = useState(false)


    const enableEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const enableEditModeKey = (e) => {
        if (e.charCode === 13) enableEditMode()
    }

    const setDisplayMode = () => {
        if (inputError) setError(false)
        setEditMode(false)
    }

    const editTaskTitle = (e) => {
        const newTitle = e.currentTarget.value;
        if (inputError) setError(false)
        if (newTitle.trim() === '' || newTitle.length > 100) {
            setTitle(newTitle)
            setError(true)
        } else setTitle(newTitle)
    }

    const setTitleOnKey = (e) => {
        const title = e.currentTarget.value;
        if (e.key === 'Enter' && !inputError) {
            props.updateTask({ title });
            setDisplayMode()
        }
        if (e.keyCode === 27) {
            setDisplayMode()
            if (inputError) setError(false)
        }
    }

    const taskTitleHint = 
            'Please, enter a title with length between 1 to 100 chars or press "Esc" to reset'


    if (!editMode) {
        return (
            <span tabIndex='0'
                className={styles.taskTitle}
                onClick={enableEditMode} 
                onKeyPress={enableEditModeKey}>{props.title},&nbsp;</span>
        )
    } else {
        return (
            <span className={styles.taskTitle}>
                <input type="text"
                    value={title}
                    className={inputError ? styles.error : ''}
                    onChange={editTaskTitle}
                    autoFocus={true}
                    onBlur={setDisplayMode}
                    onKeyDown={setTitleOnKey} />
                { inputError && <Tooltip hint={taskTitleHint} /> }
            </span>
        )
    }
}

export default TaskTitle