import React from 'react';
import TodoListTask from './TodoListTask';

const TodoListTasks = (props) => {

    const { countOnPage } = props.dataObj;
    const tasksLength = props.tasks.length;

    const tasksArray = props.tasks.filter(( task, index ) => index < countOnPage )
    .map((task) => 
        <TodoListTask key={task.id} task={task} tasksLength={tasksLength} { ...props.dataObj } /> 
    );


    return (
        <div className='todoList-Tasks'>
            {tasksArray}
        </div>
    );

}

export default TodoListTasks;

