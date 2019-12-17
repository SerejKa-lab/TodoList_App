import React from 'react';
import { connect } from 'react-redux';
import { deleteTask, updateTask, setTasksPage, setFltrTasksPage, deleteFltrTask } from './reducer';
import Preloader from './Preloader/Preloader'
import { api } from './api';



class TodoListTask extends React.Component {

    state = {
        title: '',
        editTitleMode: false,
        inputError: false,
        setPriorityMode: false,
        updateInProgress: false,
    }

    getPagesCount = () => 
        this.props.totalCount ? Math.ceil(this.props.totalCount/this.props.countOnPage) : 1;

    setAllTasksPage = (page) => {
        const { listId } = this.props;
        return (
            api.setTasksPage(listId, page)
                .then((Response) => {
                    const { items: tasks, totalCount } = Response.data;
                    this.props.setTasksPage(listId, page, tasks, totalCount)
                })
        )
    }

    setFltrTasksPage = (listId, page) => {
        api.getAllTasks(listId)
            .then(Response => {
                const completed = this.props.filterValue === 'Completed' ? true : false
                const tasks = Response.data.items;
                this.props.setFltrTasksPage(listId, page, tasks, completed)
            })
    }

    deleteTask = () => {
        const { listId, page, tasksLength, filterValue } = this.props;
        const { id: taskId } = this.props.task;
        this.setState({ updateInProgress: true });
        api.deleteTask(listId, taskId)
            .then((Response) => {
                if (Response.data.resultCode === 0) {
                    if (tasksLength === 10 && page < this.getPagesCount()) {
                        if (filterValue === 'All') {
                            this.setAllTasksPage(page)
                        } else
                            this.setFltrTasksPage(listId, page)

                    } else if (tasksLength === 1 && page !== 1) {
                        if (filterValue === 'All') {
                            this.setAllTasksPage(page-1)
                        } else this.setFltrTasksPage(listId, page - 1)

                    } else if (tasksLength === 1 && page === 1 && filterValue !== 'All') {
                        this.setAllTasksPage(1)
                        .then( () => this.props.changeFilter('All') )
                    } else {
                        if (filterValue === 'All') {
                            this.props.deleteTask(listId, taskId, page);
                        } else {
                            this.props.deleteFltrTask( listId, taskId, page )
                        }
                    }
                    this.setState({ updateInProgress: false })
                }
            })
    };

    updateTask = (dataObj) => {
        const { listId, page, tasksLength, task: { id: taskId },  filterValue } = this.props;
        const {setFltrTasksPage, changeFilter } = this.props;
        const { completed } = dataObj;
        this.setState({ updateInProgress: true });
        if (completed !== undefined && filterValue !== 'All') {
            api.updateTask(listId, taskId, { ...this.props.task, ...dataObj })
                .then(Response => {
                    if (Response.data.resultCode === 0) {
                        api.getAllTasks(listId)
                            .then( (Response) => {
                                const tasks = Response.data.items;
                                const completed = filterValue === 'Completed' ? true : false;
                                if (tasksLength === 1 && page !==1) {
                                    setFltrTasksPage( listId, page-1, tasks, completed )
                                } else if ( tasksLength === 1 && page === 1) {
                                    this.setAllTasksPage(1)
                                    changeFilter('All')
                                } else {
                                    setFltrTasksPage( listId, page, tasks, completed )
                                }
                                this.setState({ updateInProgress: false })
                            } )
                    }
            })
        } else {
            api.updateTask(listId, taskId, { ...this.props.task, ...dataObj })
                .then(Response => {
                    this.props.updateTask(Response.data.data.item)
                    this.setState({ updateInProgress: false })
                })
        }
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

    setTaskStatus = (e) => {
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
        <option className={prior} key={prior} >{prior}</option>)

    getTaskPriority = () => this.priorityArray[this.props.task.priority]

    setPriorityMode = () => this.setState({ setPriorityMode: !this.state.setPriorityMode })

    priorityOnKey = (e) => { if (e.keyCode === 27) this.setPriorityMode() }
    

    render = () => {

        return (
            <div className="todoList-tasks">
                <div className={ this.props.task.completed ? 'taskIsDone' : 'todoList-task' }>
{/* чекбокс */}
                    <input 
                        onChange = { this.setTaskStatus } 
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


const actionCreators = {deleteTask, updateTask, setTasksPage, setFltrTasksPage, deleteFltrTask}

export default connect(null, actionCreators)(TodoListTask);

