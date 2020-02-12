import React from 'react'
import styles from './ListTask.module.css'
import { connect } from 'react-redux';
import { delTaskFromPage, updateTask, statusObj } from '../../../../Redux/reducer'
import Preloader from '../../../Preloader/Preloader'
import TaskPriority from './TaskPriority/TaskPriority';
import TaskTitle from './TaskTitle/TaskTitle';
import TaskOrder from './TaskOrder/TaskOrder';



const ListTask = (props) => {

    const { id: taskId, status, renderIndex, priority, title, taskInProcess } = props.task
    const { listId, tasksCount } = props


    const deleteTask = () => props.delTaskFromPage(listId, taskId)

    const updateTask = (updateObj) => props.updateTask(listId, taskId, updateObj)

    const setTaskStatus = (e) => {
        const completed = e.currentTarget.checked 
            ? statusObj.completed 
            : statusObj.active
        updateTask({ status: completed })
    }

    const loaderStyle = { fill: 'rgb(85, 47, 11)', height: '8px' }

    return (
        <div className={styles.todoList_task}>
            <div className={status ? styles.taskIsDone : ''}>
                {/* чекбокс */}
                <input
                    className={styles.isDoneCheck}
                    onChange={setTaskStatus}
                    type="checkbox"
                    checked={status} />
                
                <TaskOrder listId={listId} taskId={taskId} 
                    renderIndex={renderIndex} tasksCount={tasksCount}/>
                <TaskTitle title={title} updateTask={updateTask} />
                <TaskPriority priority={priority} updateTask={updateTask} />

                {/* кнопка delete */}
                {!taskInProcess
                    && < i className={'fa fa-close ' + styles.delete_button} onClick={deleteTask}/> }
                {taskInProcess
                    && < i className={'fa fa-close ' + styles.delete_button}/> 
                    && <Preloader {...loaderStyle} /> }
                 {/* {taskInProcess && <Preloader {...loaderStyle} />} */}
            </div>
        </div>
    )
}



export default connect(null, {updateTask, delTaskFromPage})(ListTask);

