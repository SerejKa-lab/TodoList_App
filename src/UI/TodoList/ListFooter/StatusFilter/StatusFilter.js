import React from 'react'
import { connect } from 'react-redux'
import styles from './StatusFilter.module.css'
import { setFilterValue, ALL_S, COMPLETED, ACTIVE } from '../../../../Redux/reducer'


const StatusFilter = ({listId, filterValue, footerProcessing, setFilterValue}) => {

    const buttonAll = filterValue === ALL_S ? styles.filter_active : ''
    const buttonActive = filterValue === ACTIVE ? styles.filter_active : ''
    const buttonCompleted = filterValue === COMPLETED ? styles.filter_active : ''

   
    const getAllTasks = () => {
        if (filterValue !== ALL_S) setFilterValue(listId, ALL_S)
    }
    const getCompletedTasks = () => {
        if (filterValue !== COMPLETED) setFilterValue(listId, COMPLETED)
    }
    const getActiveTasks = () => {
        if (filterValue !== ACTIVE) setFilterValue(listId, ACTIVE)
    }


    return (
        <div className={styles.StatusFilter}>
            <button onClick={getAllTasks}
                className={buttonAll} disabled={footerProcessing}>All</button>
            <button onClick={getCompletedTasks}
                className={buttonCompleted} disabled={footerProcessing}>Completed</button>
            <button onClick={getActiveTasks}
                className={buttonActive} disabled={footerProcessing}>Active</button>
        </div>
    )
}

export default connect(null, { setFilterValue })(StatusFilter)