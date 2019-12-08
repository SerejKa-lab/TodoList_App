import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteTask, updateTask } from './reducer';
import { API_KEY } from './store';
import Preloader from './Preloader/Preloader'



class TodoListTask extends React.Component {

    state = {
        editMode: false,
        delereInProgress: false
    }

    setEditMode = () => {
        let newEditMode = this.state.editMode ? false : true;
        this.setState( { editMode:newEditMode } ) 
    }

    setEditModeOnKey = (e) => { if ( e.key === "Enter" ) this.setEditMode() }

    changeTaskStatus = (e) => {
        let newTaskStatus = e.currentTarget.checked;
        this.props.updateTask ( this.props.listId, this.props.task.id, { isDone: newTaskStatus } )
    }

    setTaskTitle = (e) => {
        this.props.updateTask( this.props.listId, this.props.task.id, {title: e.currentTarget.value } )
    }

    setNewPriority = () => {
        this.props.updateTask( this.props.listId, this.props.task.id, { priority: this.props.task.priority } );
    }

    setPriorityClassName = () => {
        switch (this.props.task.priority) {
            case 'low': return 'priorityLow';
            case 'medium': return 'priorityMedium';
            default: return 'priorityHigh';
        }
    }

    deleteTask = () => {
        const listId = this.props.listId;
        const taskId = this.props.task.id;
        this.setState({ delereInProgress: true });
        axios.delete(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${listId}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: { 'API-KEY': API_KEY }
            }
        )
        .then( () => {
        this.props.deleteTask(listId, taskId);
        this.setState({ isLoading: false })
        })
    };

    render = () => {
        return (
            <div className="todoList-tasks">
                <div className={ this.props.task.completed ? 'taskIsDone' : 'todoList-task' }>
                    <input 
                        onChange = { this.changeTaskStatus } 
                        type="checkbox" 
                        checked={this.props.task.completed} />
                    <span> { this.props.task.renderIndex } - </span>
                    
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
                    <button className='delete_list' onClick={this.deleteTask}>
                        <i className="fa fa-close"></i></button>
                    {this.state.delereInProgress && <Preloader /> }
                </div>
            </div>
        );
    }
}


const actionCreators = {deleteTask, updateTask}

export default connect(null, actionCreators)(TodoListTask);

