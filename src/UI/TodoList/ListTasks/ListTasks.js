import React from 'react'
import styles from './ListTasks.module.css'
import ListTask from './ListTask/ListTask'

const ListTasks = ({ tasks, countOnPage, ...restProps}) => {

    const tasksLength = tasks.length;

    const tasksArray = tasks.filter(( task, index ) => index < countOnPage )
    .map((task) => 
        <ListTask key={task.id} task={task} tasksLength={tasksLength} { ...restProps } /> 
    );


    return (
        <div className={styles.listTasks}>
            {tasksArray}
        </div>
    );

}

export default ListTasks;

