import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [
            { id: 0, title: 'CSS', isDone: false, priority: 'medium' },
            { id: 1, title: 'JS', isDone: true, priority: 'high' },
            { id: 2, title: "HTML", isDone: true, priority: 'low' },
            { id: 3, title: 'React', isDone: false, priority: 'high' }
        ],

        filterValue: 'All',
        taskId: 0
    };

    saveState = () => {
        let stateToJsonString = JSON.stringify(this.state);
        localStorage.setItem('TodoListAppState', stateToJsonString);
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
        let jsonStringToState = localStorage.getItem('TodoListAppState');
        if (jsonStringToState !== null) {
            state = JSON.parse(jsonStringToState)
        };
        this.setState(state);
    }

    addNewTask = (newTitle) => {
        let newTask = {
            id: this.state.taskId,
            title: newTitle,
            isDone: false,
            priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks,
            taskId: this.state.taskId + 1
        }, this.saveState );
    };


    changeFilter = (newFilterValue) => {
        this.setState({ filterValue: newFilterValue }, this.saveState )
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map((t) => {
            if (t.id === taskId) return ({ ...t, ...obj })
            else return t;
        });
        this.setState({ tasks: newTasks }, this.saveState );
    };

    getFilteredTasks = () => {
        return (
            this.state.tasks.filter((task) => {
                switch (this.state.filterValue) {
                    case 'Completed': return task.isDone;
                    case 'Active': return !task.isDone;
                    default: return true;
                }
            })
        )
    };


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addNewTask={this.addNewTask} />
                    <TodoListTasks tasks={this.getFilteredTasks()} changeTask={this.changeTask} />
                    <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter} />
                </div>
            </div>
        );
    }
}

export default App;

