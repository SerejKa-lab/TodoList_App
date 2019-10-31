import React from 'react';

class TodoListHeader extends React.Component {

    state = {
        inputError : false,
        taskTitle : ''
    }

    setTaskTitle = (e) => {
        if ( this.state.inputError ) this.setState( { inputError : false } );
        this.setState( { taskTitle : e.currentTarget.value } )
    }

    onAddNewTask = () => {
        if ( this.state.taskTitle === '') this.setState( { inputError : true } )
        else {
            this.props.addNewTask( this.state.taskTitle );
            this.setState( { taskTitle : '' } )
        }
    }


    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input 
                        className = { this.state.inputError ? 'error' : '' }
                        onChange = { this.setTaskTitle } 
                        onKeyPress = { (e) => { if ( e.key === 'Enter' ) this.onAddNewTask() } }
                        type="text" placeholder="New task name" value = { this.state.taskTitle } />
                    <button onClick = { this.onAddNewTask } >Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

