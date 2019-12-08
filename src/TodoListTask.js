import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteTask, updateTask } from './reducer';
import { API_KEY } from './store';
import Preloader from './Preloader/Preloader'



class TodoListTask extends React.Component {

    state = {
        title: '',
        editTitleMode: false,
        updateInProgress: false
    }

    deleteTask = () => {
        const listId = this.props.listId;
        const taskId = this.props.task.id;
        this.setState({ updateInProgress: true });
        axios.delete(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${listId}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: { 'API-KEY': API_KEY }
            }
        )
        .then( () => {
        this.props.deleteTask(listId, taskId);
        this.setState({ updateInProgress: false })
        })
    };

    updateTaskAPI = (dataObj) => {
        const listId = this.props.listId;
        const taskId = this.props.task.id;
        this.setState({ updateInProgress: true });
        axios.put(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${listId}/tasks/${taskId}`,
            {...this.props.task, ...dataObj},
            {
                withCredentials: true,
                headers: { 'API-KEY': API_KEY }
            }
        )
        .then( Response => {
            console.log(Response)
            this.props.updateTask ( Response.data.data.item )
            this.setState({ updateInProgress: false })
        })
    }

    setTitleEditMode = () => {
        this.setState( { editTitleMode: !this.state.editTitleMode, title: this.props.task.title } ); 
    }

    setDisplayMode = () => this.setState({ editTitleMode: false });

    editTaskTitle = (e) => this.setState({ title: e.currentTarget.value });

    setTitleOnKey = (e) => {
        if (e.key === 'Enter') {
            const title = e.currentTarget.value;
            this.updateTaskAPI({ title });
            this.setDisplayMode()
        }
        if (e.keyCode === 27) this.setDisplayMode() 
    }
    
    changeTaskStatus = (e) => {
        const completed = e.currentTarget.checked;
        this.updateTaskAPI({ completed })
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


    render = () => {
        return (
            <div className="todoList-tasks">
                <div className={ this.props.task.completed ? 'taskIsDone' : 'todoList-task' }>
                    <input 
                        onChange = { this.changeTaskStatus } 
                        type="checkbox" 
                        checked={this.props.task.completed} />
                    <span> { this.props.task.renderIndex } - </span>
                    
                    { this.state.editTitleMode // активируем режим редактирования названия задачи
                   
                        ? <input type="text" 
                                value = { this.state.title }
                                onChange = { this.editTaskTitle }
                                autoFocus ={ true } 
                                onBlur = { this.setDisplayMode } 
                                onKeyDown = { this.setTitleOnKey } />
                        : <span onClick = { this.setTitleEditMode } >{this.props.task.title}, </span>
                    }
                    
                    <span 
                        onClick = { this.setNewPriority } 
                        className = { this.setPriorityClassName() } > {this.props.task.priority} &nbsp;
                    </span>
                    <button className='delete_list' onClick={this.deleteTask}>
                        <i className="fa fa-close"></i></button>
                    {this.state.updateInProgress && <Preloader /> }
                </div>
            </div>
        );
    }
}


const actionCreators = {deleteTask, updateTask}

export default connect(null, actionCreators)(TodoListTask);

