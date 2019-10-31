import React from 'react';

class TodoListTask extends React.Component {

    state = {
        editMode: false
    }

    setEditMode = () => {
        let newEditMode = this.state.editMode ? false : true;
        this.setState( { editMode:newEditMode } ) 
    }

    changeTaskStatus = (event) => {
        let newTaskStatus = event.currentTarget.checked;
        this.props.changeTask ( this.props.task, { isDone: newTaskStatus } )
    }

    editTaskTitle = (e) => {
        this.props.changeTask( this.props.task, { title: e.currentTarget.value } )
    }

    render = () => {
        return (
            <div className="todoList-tasks">
                <div className={ this.props.task.isDone ? 'taskIsDone' : 'todoList-task' }>
                    <input onChange = { this.changeTaskStatus } type="checkbox" checked={this.props.task.isDone} />
                    { this.state.editMode
                    ? <input type="text" 
                            value = { this.props.task.title }
                            onChange = { this.editTaskTitle }
                            autoFocus ={ true } 
                            onBlur = { this.setEditMode } 
                            onKeyPress = { (e) => { if ( e.key === "Enter" ) this.setEditMode() } } />
                    : <span onClick = { this.setEditMode } >{this.props.task.title}: </span>
                    }
                    <span className = 'priority' >{this.props.task.priority}</span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

