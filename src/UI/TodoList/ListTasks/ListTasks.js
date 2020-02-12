import React from 'react'
import styles from './ListTasks.module.css'
import ListTask from './ListTask/ListTask'

const ListTasks = ({ tasks, ...restProps}) => {

    const tasksArray = tasks.map((task) => 
        <ListTask key={task.id} task={task} { ...restProps } /> 
    );


    return (
        <div className={styles.listTasks}>
            {tasksArray}
        </div>
    );

}

export default ListTasks;

