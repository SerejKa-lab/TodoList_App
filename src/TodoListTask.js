import React from 'react';
import { connect } from 'react-redux';
import { deleteTaskAC, updateTaskAC } from './reducer';

class TodoListTask extends React.Component {

    state = {
        editMode: false
    }

    setEditMode = () => {
        let newEditMode = this.state.editMode ? false : true;
        this.setState( { editMode:newEditMode } ) 
    }

    setEditModeOnKey = (e) => { if ( e.key === "Enter" ) this.setEditMode() }

    changeTaskStatus = (e) => {
        let newTaskStatus = e.currentTarget.checked;
        this.props.editTask ( this.props.listId, this.props.task.id, { isDone: newTaskStatus } )
    }

    setTaskTitle = (e) => {
        this.props.editTask( this.props.listId, this.props.task.id, {title: e.currentTarget.value } )
    }

    setNewPriority = () => {
        this.props.editTask( this.props.listId, this.props.task.id, { priority: this.props.task.priority } );
    }

    setPriorityClassName = () => {
        switch (this.props.task.priority) {
            case 'low': return 'priorityLow';
            case 'medium': return 'priorityMedium';
            default: return 'priorityHigh';
        }
    }

    deleteTaskOnClick = () => {
        this.props.deleteTask( this.props.listId, this.props.task.id )
    };

    render = () => {
        return (
            <div className="todoList-tasks">
                <div className={ this.props.task.isDone ? 'taskIsDone' : 'todoList-task' }>
                    <input 
                        onChange = { this.changeTaskStatus } 
                        type="checkbox" 
                        checked={this.props.task.isDone} />
                    <span> { this.props.task.id } - </span>
                    
                    { this.state.editMode // активируем режим редактирования названия задачи
                    ? <input type="text" 
                            value = { this.props.task.title }
                            onChange = { this.setTaskTitle }
                            autoFocus ={ true } 
                            onBlur = { this.setEditMode } 
                            onKeyPress = { this.setEditModeOnKey } />
                    : <span onClick = { this.setEditMode } >{this.props.task.title}: </span>
                    }
                    
                    <span 
                        onClick = { this.setNewPriority } 
                        className = { this.setPriorityClassName() } > {this.props.task.priority} &nbsp;
                    </span>
                    <button className='delete_list' onClick={this.deleteTaskOnClick}>
                        <i className="fa fa-close"></i></button>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (listId, taskId) => dispatch( deleteTaskAC(listId, taskId) ),
        editTask: (listId, taskId, dataObj) => dispatch( updateTaskAC(listId, taskId, dataObj) )
    }
}

export default connect(null, mapDispatchToProps)(TodoListTask);

