import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class TodoList extends React.Component {

    componentDidMount(){
        this.props.restoreTasks(this.props.list.id)
    }

    state = {
        filterValue: 'All'
    };

    changeFilter = async(filterValue) => this.setState({ filterValue })

    
    render = () => {
        const { title, id, page, totalCount, countOnPage, tasks, generalCount } = this.props.list;
        return (
            <div className='todoList'>
                <section className='todoList_main'>
                    <TodoListHeader 
                        title = { title } 
                        listId = { id }
                        filterValue = { this.state.filterValue }
                        changeFilter = { this.changeFilter }
                        page = { page }
                        generalCount = {generalCount}
                        totalCount={totalCount} />
                    <TodoListTasks
                        tasks= {tasks}
                        dataObj={
                            {
                                listId: id,
                                page: page,
                                totalCount: totalCount,
                                countOnPage: countOnPage,
                                filterValue: this.state.filterValue,
                                changeFilter: this.changeFilter
                            }
                        } />
                </section>
                <TodoListFooter 
                    listId={id}
                    page = {page}
                    filterValue = { this.state.filterValue }
                    changeFilter={this.changeFilter}
                    countOnPage ={ countOnPage }
                    totalCount={totalCount} />
            </div>
        );
    }
}

export default TodoList;

