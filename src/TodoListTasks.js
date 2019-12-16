import React from 'react';
import TodoListTask from './TodoListTask';

const TodoListTasks = (props) => {

    const tasksLength = props.tasks.length;

    const tasksArray = props.tasks.filter(( task, index ) => index < props.countOnPage )
    .map((task) => 
        <TodoListTask key={task.id} task={task} listId={props.listId} page={props.page}
                countOnPage={props.countOnPage} totalCount={props.totalCount} tasksLength={tasksLength}/> 
    );


    return (
        <div className='todoList-Tasks'>
            {tasksArray}
        </div>
    );

}

export default TodoListTasks;

