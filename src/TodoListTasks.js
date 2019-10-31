import React from 'react';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {

        let tasksArray = this.props.tasks.map( ( task ) => {
            return <TodoListTask task = { task } changeTask = { this.props.changeTask } />

        });


        return (
            <div className='todoList-Tasks'>
                { tasksArray }
            </div>
        );
    }
}

export default TodoListTasks;

