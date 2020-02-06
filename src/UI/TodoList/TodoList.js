import React from 'react'
import styles from './TodoList.module.css'
import ListHeader from './ListHeader/ListHeader'
import ListTasks from './ListTasks/ListTasks'
import ListFooterContainer from './ListFooter/ListFooterContainer'

class TodoList extends React.Component {

    componentDidMount(){
        this.props.restoreTasks(this.props.list.id)
    }

    
    render = () => {
        const { title, id, page, totalCount, countOnPage, tasks, generalCount, 
                listDeliting, titleUpdating, taskIsAdding, filterValue } = this.props.list;
        return (
            <div className={styles.todoList}>
                <section className={styles.todoList_main}>
                    <ListHeader 
                        title = { title } 
                        listId = { id }
                        filterValue = { filterValue }
                        page = { page }
                        generalCount = {generalCount}
                        totalCount={totalCount} 
                        listDeliting = {listDeliting}
                        titleUpdating={titleUpdating} 
                        taskIsAdding={taskIsAdding} />
                    <ListTasks
                        tasks={tasks}
                        listId={id}
                        page={page}
                        countOnPage={countOnPage}
                        filterValue={filterValue}
                    />
                </section>
                <ListFooterContainer 
                    listId={id}
                    page = {page}
                    filterValue = { filterValue }
                    countOnPage ={ countOnPage }
                    totalCount={totalCount} />
            </div>
        );
    }
}

export default TodoList;

