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

    setNewPriority = () => {
        let newPriority = this.props.task.priority;
        switch (this.props.task.priority) {
            case 'high' :
                    newPriority = 'low';
                    break;
            case 'low' : 
                newPriority = 'medium';
                break;
            default: 
                newPriority = 'high';
            }
        this.props.changeTask( this.props.task, { priority: newPriority } );
    }

    setPriorityClassName = () => {
        switch (this.props.task.priority) {
            case 'low': return 'priorityLow';
            case 'medium': return 'priorityMedium';
            default: return 'priorityHigh';
        }
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
                    <span onClick = { this.setNewPriority } className = { this.setPriorityClassName() } >{this.props.task.priority}</span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

