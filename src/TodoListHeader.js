import React from 'react';

class TodoListHeader extends React.Component {

    newTaskTitle = React.createRef();

    onAddNewTask = () => {
        let newTitle = this.newTaskTitle.current.value;
        this.props.addNewTask(newTitle);
        this.newTaskTitle.current.value = '';
    }


    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input ref = {this.newTaskTitle} type="text" placeholder="New task name" />
                    <button onClick = { this.onAddNewTask } >Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

