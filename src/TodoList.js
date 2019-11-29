import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class TodoList extends React.Component {

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
                    case 'Completed': return task.isDone;
                    case 'Active': return !task.isDone;
                    default: return true;
                }
            })
        )
    };


    render = () => {
        const { list, changeTask, addItem } = this.props;
        return (
            <div className="todoList">
                <TodoListHeader title = { list.title } listId = { list.id } addItem={addItem} />
                <TodoListTasks tasks={this.getFilteredTasks()} changeTask = { changeTask } listId = { list.id }/>
                <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter} />
            </div>
        );
    }
}

export default TodoList;

