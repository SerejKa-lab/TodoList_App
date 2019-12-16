import React from 'react';
import { connect } from 'react-redux';
import { deleteTask, updateTask, setTasksPage } from './reducer';
import Preloader from './Preloader/Preloader'
import { api } from './api';



class TodoListTask extends React.Component {

    state = {
        title: '',
        editTitleMode: false,
        inputError: false,
        setPriorityMode: false,
        updateInProgress: false
    }

    getPagesCount = () => 
        this.props.totalCount ? Math.ceil(this.props.totalCount/this.props.countOnPage) : 1;

    deleteTask = () => {
        const { listId, page, tasksLength } = this.props;
        const { id: taskId } = this.props.task;
        this.setState({ updateInProgress: true });
        api.deleteTask(listId, taskId)
            .then((Response) => {
                if (Response.data.resultCode === 0) {
                    if (tasksLength === 10 && page < this.getPagesCount()) {
                        api.setTasksPage(listId, page)
                            .then((Response) => {
                                this.props.setTasksPage(this.props.listId, page, 
                                        Response.data.items, Response.data.totalCount )
                            })
                    } else if ( tasksLength === 1 && page !== 1 ){
                        api.setTasksPage(listId, page-1)
                        .then((Response) => {
                            this.props.setTasksPage(this.props.listId, page-1, 
                                    Response.data.items, Response.data.totalCount )
                        })
                    } else {
                        this.props.deleteTask(listId, taskId);
                        this.setState({ updateInProgress: false })
                    }
                }
            })
    };

    updateTask = (dataObj) => {
        const listId = this.props.listId;
        const taskId = this.props.task.id;
        this.setState({ updateInProgress: true });
        api.updateTask(listId, taskId, { ...this.props.task, ...dataObj })
            .then(Response => {
                this.props.updateTask(Response.data.data.item)
                this.setState({ updateInProgress: false })
            })
    }

    setTitleEditMode = () => {
        this.setState({ editTitleMode: !this.state.editTitleMode, title: this.props.task.title });
    }

    setDisplayMode = () => {
        if (this.state.inputError) this.setState({ inputError: false })
        this.setState({ editTitleMode: false })
    }

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
            this.updateTask({ title });
            this.setDisplayMode()
        }
        if (e.keyCode === 27) {
            this.setDisplayMode()
            if (this.state.inputError) this.setState({ inputError: false })
        }
    }

    changeTaskStatus = (e) => {
        const completed = e.currentTarget.checked;
        this.updateTask({ completed })
    }

    setTaskPriority = (e) => {
        const priority = this.priorityArray.findIndex((prior) => prior === e.currentTarget.value);
        this.updateTask({ priority });
        this.setPriorityMode()
    }

    priorityArray = ['Low', 'Middle', 'High', 'Urgent', 'Later']

    priorityOptions = this.priorityArray.map(prior =>
        <option className={prior} >{prior}</option>)

    getTaskPriority = () => this.priorityArray[this.props.task.priority]

    setPriorityMode = () => this.setState({ setPriorityMode: !this.state.setPriorityMode })

    priorityOnKey = (e) => { if (e.keyCode === 27) this.setPriorityMode() }
    

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
                    { this.state.editTitleMode // активируем режим редактирования названия задачи
                   
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
                    {this.state.setPriorityMode
                        ? <select 
                            defaultValue={this.getTaskPriority()} 
                            className={this.getTaskPriority()} 
                            onChange={this.setTaskPriority}
                            onBlur={this.setPriorityMode}
                            onKeyDown={this.priorityOnKey}
                            autoFocus ={ true } > {this.priorityOptions} </select>
                        :<span 
                            onClick = { this.setPriorityMode } 
                            className = { this.getTaskPriority() } > {this.getTaskPriority()} &nbsp;
                        </span>
                    }
{/* кнопка delete */}
                    <button className='delete_button' onClick={this.deleteTask}>
                        <i className="fa fa-close"></i></button>
                    
                    {this.state.updateInProgress && <Preloader /> }
                </div>
            </div>
        );
    }
}


const actionCreators = {deleteTask, updateTask, setTasksPage}

export default connect(null, actionCreators)(TodoListTask);

