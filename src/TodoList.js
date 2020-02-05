import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooterContainer from './TodoListFooterContainer';

class TodoList extends React.Component {

    componentDidMount(){
        this.props.restoreTasks(this.props.list.id)
    }

    
    render = () => {
        const { title, id, page, totalCount, countOnPage, tasks, generalCount, 
                listDeliting, titleUpdating, taskIsAdding, filterValue } = this.props.list;
        return (
            <div className='todoList'>
                <section className='todoList_main'>
                    <TodoListHeader 
                        title = { title } 
                        listId = { id }
                        filterValue = { filterValue }
                        page = { page }
                        generalCount = {generalCount}
                        totalCount={totalCount} 
                        listDeliting = {listDeliting}
                        titleUpdating={titleUpdating} 
                        taskIsAdding={taskIsAdding} />
                    <TodoListTasks
                        tasks={tasks}
                        listId={id}
                        page={page}
                        countOnPage={countOnPage}
                        filterValue={filterValue}
                    />
                </section>
                <TodoListFooterContainer 
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

