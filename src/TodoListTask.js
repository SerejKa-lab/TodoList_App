import React from 'react';

class TodoListTask extends React.Component {

    onChangeStatus = (event) => {
        let newStatus = event.currentTarget.checked;
        this.props.changeTaskStatus ( newStatus, this.props.subject )
    }

    render = () => {
        return (
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input onChange = { this.onChangeStatus } type="checkbox" checked={this.props.subject.isDone} />
                    <span>{this.props.subject.title}: <span className = 'priority' >{this.props.subject.priority}</span> </span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

