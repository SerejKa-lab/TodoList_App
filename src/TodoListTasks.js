import React from 'react';
import TodoListTask from './TodoListTask';

const TodoListTasks = ({ tasks, countOnPage, ...restProps}) => {

    const tasksLength = tasks.length;

    const tasksArray = tasks.filter(( task, index ) => index < countOnPage )
    .map((task) => 
        <TodoListTask key={task.id} task={task} tasksLength={tasksLength} { ...restProps } /> 
    );


    return (
        <div className='todoList-Tasks'>
            {tasksArray}
        </div>
    );

}

export default TodoListTasks;

