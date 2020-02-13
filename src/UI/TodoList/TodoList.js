import React from 'react'
import styles from './TodoList.module.css'
import ListHeader from './ListHeader/ListHeader'
import ListTasks from './ListTasks/ListTasks'
import ListFooter from './ListFooter/ListFooter'

class TodoList extends React.Component {

    componentDidMount(){
        this.props.restoreTasks(this.props.list.id)
    }

    
    render = () => {
        const { listsCount, listTitles, maxTasksCount } = this.props
        const { title, id, page, totalCount, countOnPage, tasks, generalCount, 
            order, filterValue, listDeliting, titleUpdating, taskIsAdding, 
            footerProcessing, tasksOrder } = this.props.list;
        const tasksCount = tasksOrder ? tasksOrder.length : null


        return (
            <div className={styles.todoList}>
                <section className={styles.todoList_wrapper}>
                    <ListHeader
                        title = { title } 
                        listId = { id }
                        filterValue = { filterValue }
                        page = { page }
                        maxTasksCount={maxTasksCount}
                        generalCount = {generalCount}
                        totalCount={totalCount}
                        listTitles={listTitles}
                        listDeliting = {listDeliting}
                        titleUpdating={titleUpdating} 
                        taskIsAdding={taskIsAdding} />
                    <ListTasks
                        tasks={tasks}
                        listId={id}
                        tasksCount={tasksCount}
                    />
                </section>
                <ListFooter 
                    listId={id}
                    page = {page}
                    order={order}
                    listsCount={listsCount}
                    filterValue = { filterValue }
                    countOnPage ={ countOnPage }
                    totalCount={totalCount} 
                    footerProcessing={footerProcessing} />
            </div>
        );
    }
}

export default TodoList;

