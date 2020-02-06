import React from 'react'
import styles from './ListTask.module.css'
import { connect } from 'react-redux';
import { delTaskFromPage, updateTask, setTasksPage, setAllTasksPage,
        setFltrTasksPage, setFilterValue } from '../../../../Redux/reducer'
import Preloader from '../../../Preloader/Preloader'
// import { api } from './API/api';



class ListTask extends React.Component {

    state = {
        title: '',
        editTitleMode: false,
        inputError: false,
        setPriorityMode: false
    }


    deleteTask = () => {
        const {listId, delTaskFromPage} = this.props
        const {id: taskId} = this.props.task
        delTaskFromPage(listId, taskId)
    };

    updateTask = (updateObj) => {
        const {listId, updateTask} = this.props
        const {id: taskId} = this.props.task
        updateTask(listId, taskId, updateObj)
        /* const { listId, page, tasksLength, task: { id: taskId },  filterValue } = this.props;
        const {setFltrTasksPage, setFilterValue, setAllTasksPage } = this.props;
        this.setState({ updateInProgress: true });
        if (filterValue !== 'All') {
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
                                    setAllTasksPage(listId, 1)
                                    setFilterValue('All')
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
        } */
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
        const completed = e.currentTarget.checked ? 1 : 0;  // completed server module is no longer supported,
        this.updateTask({ status: completed })              // so status server module is used
    }

    setTaskPriority = (e) => {
        const priority = this.priorityArray.findIndex((prior) => prior === e.currentTarget.value);
        this.updateTask({ priority });
        this.setPriorityMode()
    }

    priorityArray = ['Low', 'Middle', 'High', 'Urgent', 'Later']

    priorityOptions = this.priorityArray.map(prior =>
        <option className={styles[prior]} key={prior} >{prior}</option>)

    getTaskPriority = () => this.priorityArray[this.props.task.priority]
    getTaskPriorityStyle = () => styles[ this.priorityArray[this.props.task.priority] ]

    setPriorityMode = () => this.setState({ setPriorityMode: !this.state.setPriorityMode })

    priorityOnKey = (e) => { if (e.keyCode === 27) this.setPriorityMode() }
    

    render = () => {
        
        const { editTitleMode, title, inputError, setPriorityMode } = this.state
        const { taskInProcess } = this.props.task

        const loaderStyle ={
            fill: 'rgb(143, 59, 26)', height: '8px'}

        return (
            <div className={styles.todoList_task}>
                <div className={ this.props.task.status ? styles.taskIsDone : '' }>
{/* чекбокс */}
                    <input 
                        onChange = { this.setTaskStatus } 
                        type="checkbox" 
                        checked={this.props.task.status} />
                    <span> { this.props.task.renderIndex } - </span>
{/* заголовок */}
                    { editTitleMode // активируем режим редактирования названия задачи
                   
                        ? <input type="text" 
                                value = { title }
                                className = { inputError ? styles.error : ''}
                                onChange = { this.editTaskTitle }
                                autoFocus ={ true } 
                                onBlur = { this.setDisplayMode } 
                                onKeyDown = { this.setTitleOnKey } />
                        : <span onClick = { this.setTitleEditMode } >{this.props.task.title}, </span>
                    }
{/* статус */}
                    {setPriorityMode
                        ? <select 
                            defaultValue={this.getTaskPriority()} 
                            className={this.getTaskPriorityStyle()} 
                            onChange={this.setTaskPriority}
                            onBlur={this.setPriorityMode}
                            onKeyDown={this.priorityOnKey}
                            autoFocus ={ true } > {this.priorityOptions} </select>
                        :<span 
                            onClick = { this.setPriorityMode } 
                            className = { this.getTaskPriorityStyle() } > {this.getTaskPriority()} &nbsp;
                        </span>
                    }
{/* кнопка delete */}
                    <button className={styles.delete_button} onClick={this.deleteTask} 
                        disabled={taskInProcess}>
                        <i className='fa fa-close'></i></button>
                    
                    { taskInProcess && <Preloader {...loaderStyle}/> }
                </div>
            </div>
        );
    }
}


const actionCreators = {
    updateTask, delTaskFromPage,
    setFltrTasksPage,
    setFilterValue, setTasksPage,
    setAllTasksPage
}

export default connect(null, actionCreators)(ListTask);

