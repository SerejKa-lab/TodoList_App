import React from 'react'
import Preloader from '../../Preloader/Preloader'
import styles from './ListFooter.module.css'
import ListOrder from './ListOrder/ListOrder'

const ListFooter = (props) => {

    const { isHidden, inProcess, filterValue, pagesCount, pagesLinks, order, displayOrder, 
        listsCount, hideOnButtonClick, showOnButtonClick, getTasks, listId } = props
        
        const buttonAll = filterValue === 'All' ? styles.filter_active : ''
        const buttonActive = filterValue === 'Active' ? styles.filter_active : ''
        const buttonCompleted = filterValue === 'Completed' ? styles.filter_active : ''
        const loaderStyle ={
            fill: 'rgb(143, 59, 26)', height: '8px', position: 'absolute', top: '8px', right: '5px'}
        
        const getAllTasks = () => getTasks('All')
        const getCompletedTasks = () => getTasks('Completed')
        const getActiveTasks = () => getTasks('Active')

        return (
            <div className={styles.list_footer}>
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
                {!isHidden && <span className={styles.show_hide} onClick={ hideOnButtonClick } >Hide</span>}
                {isHidden && <span className={styles.show_hide} onClick={ showOnButtonClick } >Show</span>}

                {displayOrder && <ListOrder order={order} listsCount={listsCount} listId={listId} />}
            </div>
        );
    
}


export default ListFooter

