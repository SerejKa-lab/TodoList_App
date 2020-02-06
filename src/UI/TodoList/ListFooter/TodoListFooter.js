import React from 'react';
import '../../App.css';
import Preloader from '../../Preloader/Preloader';

const TodoListFooter = (props) => {

    const { isHidden, inProcess, filterValue, pagesCount, pagesLinks,
            hideOnButtonClick, showOnButtonClick, getTasks } = props
        
        const buttonAll = filterValue === 'All' ? 'filter-active' : '';
        const buttonActive = filterValue === 'Active' ? 'filter-active' : '';
        const buttonCompleted = filterValue === 'Completed' ? 'filter-active' : '';
        const loaderStyle ={
            fill: 'rgb(143, 59, 26)', height: '10px', position: 'absolute', top: '5px', right: '5px'}
        
        const getAllTasks = () => getTasks('All')
        const getCompletedTasks = () => getTasks('Completed')
        const getActiveTasks = () => getTasks('Active')

        return (
            <div className="todoList-footer">
                {pagesCount > 1 && 
                    <div className='tasksPagesLinks'>{ pagesLinks }</div>}
                {!isHidden &&
                    <div className='filter_buttons'>
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


export default TodoListFooter

