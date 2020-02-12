import React from 'react'
import styles from './ListTask.module.css'
import { connect } from 'react-redux';
import { delTaskFromPage, updateTask, reorderTask, statusObj } from '../../../../Redux/reducer'
import Preloader from '../../../Preloader/Preloader'
import TaskPriority from './TaskPriority/TaskPriority';
import TaskTitle from './TaskTitle/TaskTitle';



const ListTask = (props) => {

    const { id: taskId, status, renderIndex, priority, title, taskInProcess } = props.task
    const { listId} = props

    const deleteTask = () => props.delTaskFromPage(listId, taskId)

    const updateTask = (updateObj) => props.updateTask(listId, taskId, updateObj)

    const setTaskStatus = (e) => {
        const completed = e.currentTarget.checked 
            ? statusObj.completed 
            : statusObj.active
        updateTask({ status: completed })
    }

    const reorderTask = () => {
        const nextPos = prompt('enter next postion', `${renderIndex}`)
        props.reorderTask(listId, taskId, renderIndex-1, nextPos)
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
                <span onClick={reorderTask}> {renderIndex} - </span>

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



export default connect(null, {updateTask, delTaskFromPage, reorderTask})(ListTask);

