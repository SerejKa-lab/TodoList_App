import React from 'react';
import TodoListTask from './TodoListTask';

const TodoListTasks = (props) => {

    const tasksArray = props.tasks.filter(( task, index ) => index < props.countOnPage )
    .map((task) => {
        return <TodoListTask
            key={task.id}
            task={task}
            listId={props.listId} />

    });


    return (
        <div className='todoList-Tasks'>
            {tasksArray}
        </div>
    );

}

export default TodoListTasks;

