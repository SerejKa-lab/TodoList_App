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

    changeFilter = (newFilterValue) => {
        this.setState({ filterValue: newFilterValue }, this.saveState )
    };

    getFilteredTasks = () => {
        return (
            this.props.list.tasks.filter((task) => {
                switch (this.state.filterValue) {
                    case 'Completed': return task.completed;
                    case 'Active': return !task.completed;
                    default: return true;
                }
            })
        )
    };


    render = () => {
        const { title, id, page, totalCount } = this.props.list;
        return (
            <div className="todoList">
                <section>
                    <TodoListHeader 
                        title = { title } 
                        listId = { id }
                        page = { page } 
                        totalCount={totalCount} />
                    <TodoListTasks listId = { id } tasks={this.getFilteredTasks()} />
                </section>
                <TodoListFooter 
                    filterValue={this.state.filterValue} 
                    changeFilter={this.changeFilter}
                    listId={id}
                    page = {page}
                    totalCount={totalCount} />
            </div>
        );
    }
}

export default TodoList;

