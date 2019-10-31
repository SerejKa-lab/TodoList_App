import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class App extends React.Component {

    state = {
        tasks: [
            { id: 0, title: 'CSS', isDone: false, priority: 'medium' },
            { id: 1, title: 'JS', isDone: true, priority: 'high' },
            { id: 2, title: "HTML", isDone: true, priority: 'low' },
            { id: 3, title: 'React', isDone: false, priority: 'high' }
        ],

        filterValue: 'All',
        taskId: 4
    };


    addNewTask = (newTitle) => {
        let newTask = {
            id: this.state.taskId,
            title: newTitle,
            isDone: false,
            priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks : newTasks,
            taskId : this.state.taskId +1
        });
    };

    getFilteredTasks = () => {
        return (
            this.state.tasks.filter((task) => {
                switch (this.state.filterValue) {
                    case 'Completed': return task.isDone;
                    case 'Active': return !task.isDone;
                    default : return true;
                }
            })
        )
    };

    changeFilter = (newFilterValue) => {
        this.setState({ filterValue: newFilterValue })
    };

    changeTask = ( taskId, obj ) => {
        let newTasks = this.state.tasks.map ( (t) => {
            if (t.id === taskId) return ( { ...t, ...obj } )
            else return t;
        });
        this.setState ( { tasks: newTasks } );
    };


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addNewTask={this.addNewTask} />
                    <TodoListTasks tasks = { this.getFilteredTasks() } changeTask = {this.changeTask} />
                    <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter} />
                </div>
            </div>
        );
    }
}

export default App;

