import React from 'react';
import TodoListTask from './TodoListTask';

const TodoListTasks = (props) => {

    const tasksArray = props.tasks.map((task) => {
        return <TodoListTask
            task={task}
            key={task.id}
            listId={props.listId} />

    });


    return (
        <div className='todoList-Tasks'>
            {tasksArray}
        </div>
    );

}

export default TodoListTasks;

