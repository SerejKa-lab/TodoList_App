import React from 'react';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {

        let subjectElements = this.props.subjects.map((subject) => {
            return <TodoListTask subject = {subject} changeTaskStatus = {this.props.changeTaskStatus} />

        });


        return (
            <div className='todoList-Tasks'>
                {subjectElements}
            </div>
        );
    }
}

export default TodoListTasks;

