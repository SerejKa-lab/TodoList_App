import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class App extends React.Component {

    addNewTask = () => {
        let newTitle = this.taskInputRef.current.value;
        let newTask = {
            title: newTitle,
            isDone: false,
            priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
        this.taskInputRef.current.value = '';
    }

    state = {
        tasks: [
            { title: "HTML", isDone: true, priority: 'low' },
            { title: 'CSS', isDone: false, priority: 'medium' },
            { title: 'JS', isDone: true, priority: 'high' },
            { title: 'React', isDone: false, priority: 'high' }
        ],

        filterValue: 'Completed'
    };

    taskInputRef = React.createRef();

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    {/* <TodoListHeader /> */}

                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input ref= {this.taskInputRef} type="text" placeholder="New task name" />
                            <button onClick= { this.addNewTask } >Add</button>
                        </div>
                    </div>

                    <TodoListTasks subjects={this.state.tasks} />
                    <TodoListFooter filterValue={this.state.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

