import React, { useState } from 'react'
import styles from './TaskTitle.module.css'


const TaskTitle = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const [inputError, setError] = useState(false)


    const setTitleEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
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


    if (!editMode) {
        return (
            <span onClick={setTitleEditMode} className={styles.taskTitle}>{props.title}, </span>
        )
    } else {
        return (
            <input type="text"
                value={title}
                className={inputError ? styles.error : ''}
                onChange={editTaskTitle}
                autoFocus={true}
                onBlur={setDisplayMode}
                onKeyDown={setTitleOnKey} />
        )
    }
}

export default TaskTitle