import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class App extends React.Component {

    state = {
        tasks: [
            { title: "HTML", isDone: true, priority: 'low' },
            { title: 'CSS', isDone: false, priority: 'medium' },
            { title: 'JS', isDone: true, priority: 'high' },
            { title: 'React', isDone: false, priority: 'high' }
        ],

        filterValue: 'All'
    };

    addNewTask = (newTitle) => {
        let newTask = {
            title: newTitle,
            isDone: false,
            priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
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

    changeTask = ( task, obj ) => {
        let newTasks = this.state.tasks.map ( (t) => {
            if (t === task) return ( { ...t, ...obj } )
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

