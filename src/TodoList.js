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
        const { list } = this.props;
        return (
            <div className="todoList">
                <section>
                    <TodoListHeader title = { list.title } listId = { list.id } totalCount={list.totalCount} />
                    <TodoListTasks listId = { list.id } tasks={this.getFilteredTasks()} />
                </section>
                <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter} />
            </div>
        );
    }
}

export default TodoList;

