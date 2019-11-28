import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    state = {
        filterValue: 'All'
    };

    saveState = () => {
        const {id} = this.props.list;
        const stateToString = JSON.stringify(this.state);
        localStorage.setItem( id+1+'-ListState', stateToString);
    }

    restoreState = () => {
        const {id} = this.props.list;
        let state = {
            filterValue: 'All'
        }
        const stringToState = localStorage.getItem(id+1+'-ListState');
        if (stringToState !== null) {
            state = JSON.parse(stringToState)
        };
        this.setState(state);
    }

 
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
        const { list, changeTask, addTask } = this.props;
        return (
            <div className="todoList">
                <TodoListHeader title = { list.title } listId = { list.id } addTask={addTask} />
                <TodoListTasks tasks={this.getFilteredTasks()} changeTask = { changeTask } listId = { list.id }/>
                <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter} />
            </div>
        );
    }
}

export default TodoList;

