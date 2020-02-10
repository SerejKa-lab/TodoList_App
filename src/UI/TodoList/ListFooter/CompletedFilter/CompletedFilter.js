import React from 'react'
import { connect } from 'react-redux'
import styles from './CompletedFilter.module.css'
import { setFilterValue } from '../../../../Redux/reducer'


const CompletedFilter = ({listId, filterValue, footerProcessing, setFilterValue}) => {

    const buttonAll = filterValue === 'All' ? styles.filter_active : ''
    const buttonActive = filterValue === 'Active' ? styles.filter_active : ''
    const buttonCompleted = filterValue === 'Completed' ? styles.filter_active : ''

   
    const getAllTasks = () => setFilterValue(listId, 'All')
    const getCompletedTasks = () => setFilterValue(listId, 'Completed')
    const getActiveTasks = () => setFilterValue(listId, 'Active')


    return (
        <div className={styles.completedFilter}>
            <button onClick={getAllTasks}
                className={buttonAll} disabled={footerProcessing}>All</button>
            <button onClick={getCompletedTasks}
                className={buttonCompleted} disabled={footerProcessing}>Completed</button>
            <button onClick={getActiveTasks}
                className={buttonActive} disabled={footerProcessing}>Active</button>
        </div>
    )
}

export default connect(null, { setFilterValue })(CompletedFilter)