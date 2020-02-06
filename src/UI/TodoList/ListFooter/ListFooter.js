import React from 'react'
import Preloader from '../../Preloader/Preloader'
import styles from './ListFooter.module.css'

const ListFooter = (props) => {

    const { isHidden, inProcess, filterValue, pagesCount, pagesLinks,
            hideOnButtonClick, showOnButtonClick, getTasks } = props
        
        const buttonAll = filterValue === 'All' ? styles.filter_active : ''
        const buttonActive = filterValue === 'Active' ? styles.filter_active : ''
        const buttonCompleted = filterValue === 'Completed' ? styles.filter_active : ''
        const loaderStyle ={
            fill: 'rgb(143, 59, 26)', height: '10px', position: 'absolute', top: '5px', right: '5px'}
        
        const getAllTasks = () => getTasks('All')
        const getCompletedTasks = () => getTasks('Completed')
        const getActiveTasks = () => getTasks('Active')

        return (
            <div className={styles.todoList_footer}>
                {pagesCount > 1 && 
                    <div className={styles.tasksPagesLinks}>{ pagesLinks }</div>}
                {!isHidden &&
                    <div className={styles.filter_buttons}>
                        <button onClick={ getAllTasks } 
                            className={buttonAll} disabled={inProcess}>All</button>
                        <button onClick={ getCompletedTasks } 
                            className={buttonCompleted} disabled={inProcess}>Completed</button>
                        <button onClick={ getActiveTasks } 
                            className={buttonActive} disabled={inProcess}>Active</button>
                        { inProcess && <Preloader {...loaderStyle} /> }
                    </div>
                }
                {!isHidden && <span onClick={ hideOnButtonClick } >Hide</span>}
                {isHidden && <span onClick={ showOnButtonClick } >Show</span>}
            </div>
        );
    
}


export default ListFooter

