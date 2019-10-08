import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class App extends React.Component {
    subjectElements = [
        { title: "HTML", isDone: true, priority: 'low' },
        { title: 'CSS', isDone: false, priority: 'medium'},
        { title: 'JS', isDone: true, priority: 'high'},
        { title: 'React', isDone: false, priority: 'high'}
    ];

    filterValue = 'Completed';

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks subjects={this.subjectElements}/>
                    <TodoListFooter filterValue = {this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

