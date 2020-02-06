import React from 'react'
import styles from './ListTask.module.css'
import { connect } from 'react-redux';
import { delTaskFromPage, updateTask } from '../../../../Redux/reducer'
import Preloader from '../../../Preloader/Preloader'
import TaskPriority from './TaskPriority/TaskPriority';
import TaskTitle from './TaskTitle/TaskTitle';



const ListTask = (props) => {

    const { id: taskId, status, renderIndex, priority, title, taskInProcess } = props.task
    const { listId} = props

    const deleteTask = () => props.delTaskFromPage(listId, taskId)

    const updateTask = (updateObj) => props.updateTask(listId, taskId, updateObj)

    const setTaskStatus = (e) => {
        const completed = e.currentTarget.checked ? 1 : 0  // completed server module is no longer supported,
        updateTask({ status: completed })              // so status server module is used
    }

    const loaderStyle = { fill: 'rgb(143, 59, 26)', height: '8px' }

    return (
        <div className={styles.todoList_task}>
            <div className={status ? styles.taskIsDone : ''}>
                {/* чекбокс */}
                <input
                    onChange={setTaskStatus}
                    type="checkbox"
                    checked={status} />
                <span> {renderIndex} - </span>

                <TaskTitle title={title} updateTask={updateTask} />
                <TaskPriority priority={priority} updateTask={updateTask} />

                {/* кнопка delete */}
                <button className={styles.delete_button} onClick={deleteTask}
                    disabled={taskInProcess}>
                    <i className='fa fa-close'></i></button>

                {taskInProcess && <Preloader {...loaderStyle} />}
            </div>
        </div>
    )
}



export default connect(null, {updateTask, delTaskFromPage})(ListTask);

