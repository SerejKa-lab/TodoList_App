import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteTask, updateTask } from './reducer';
import { API_KEY } from './store';
import Preloader from './Preloader/Preloader'



class TodoListTask extends React.Component {

    state = {
        title: '',
        editTitle: false,
        inputError: false,
        setStatus: false,
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
        this.setState( { editTitle: !this.state.editTitle, title: this.props.task.title } ); 
    }

    setDisplayMode = () => this.setState({ editTitle: false });

    editTaskTitle = (e) => {
        const newTitle = e.currentTarget.value;
        if (this.state.inputError) this.setState({ inputError: false });
        if (newTitle.trim() === '' || newTitle.length > 100) {
            this.setState({ title: newTitle, inputError: true })
        } else this.setState({ title: newTitle })
    }

    setTitleOnKey = (e) => {
        const title = e.currentTarget.value;
        if (e.key === 'Enter' && !this.state.inputError) {
            this.updateTaskAPI({ title });
            this.setDisplayMode()
        }
        if (e.keyCode === 27) {
            this.setDisplayMode()
            if (this.state.inputError) this.setState({ inputError: false })
        }
    }
    
    changeTaskStatus = (e) => {
        const completed = e.currentTarget.checked;
        this.updateTaskAPI({ completed })
    }

    render = () => {
        return (
            <div className="todoList-tasks">
                <div className={ this.props.task.completed ? 'taskIsDone' : 'todoList-task' }>
{/* чекбокс */}
                    <input 
                        onChange = { this.changeTaskStatus } 
                        type="checkbox" 
                        checked={this.props.task.completed} />
                    <span> { this.props.task.renderIndex } - </span>
{/* заголовок */}
                    { this.state.editTitle // активируем режим редактирования названия задачи
                   
                        ? <input type="text" 
                                value = { this.state.title }
                                className = { this.state.inputError ? 'error' : ''}
                                onChange = { this.editTaskTitle }
                                autoFocus ={ true } 
                                onBlur = { this.setDisplayMode } 
                                onKeyDown = { this.setTitleOnKey } />
                        : <span onClick = { this.setTitleEditMode } >{this.props.task.title}, </span>
                    }
{/* статус */}
                    <span 
                        onClick = { this.setNewPriority } 
                        className = { this.getPriority() } > {this.getPriority()} &nbsp;
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

