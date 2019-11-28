import React from 'react';
import TodoList from './TodoList';


class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    };

    state = {
        lists: []
        // lists: [
        //     { id: 0, title:  'Спорт', tasks: [{ id: 1, title: 'CSS', isDone: false, priority: 'medium' }], nextTaskId: 2 },
        //     { id: 1, title:  'Здоровье', tasks: [{ id: 1, title: 'JS', isDone: true, priority: 'high' }], nextTaskId: 2 },
        //     { id: 2, title:  'Красота', tasks: [{ id: 1, title: "HTML", isDone: true, priority: 'low' }], nextTaskId: 2 },
        // ]
    };

    saveState = () => {
        const stateToString = JSON.stringify(this.state);
        localStorage.setItem('TodoLists', stateToString);
    }

    restoreState = () => {
        debugger;
        let state = {lists:[]};
        const storageState = localStorage.getItem('TodoLists');
        if (storageState !== null) {
            state = JSON.parse( storageState )
        };
        this.setState(state);
    }

    addTask = (listId, taskTitle) => {
        const taskId = this.state.lists[listId].nextTaskId;
        const newTask = { id: taskId, title: taskTitle, isDone: false, priority: 'medium' }
        const newLists = this.state.lists.map( (list) => {
            return (list.id === listId)
            ? { ...list, tasks: [ ...list.tasks, newTask ], nextTaskId: list.nextTaskId+1 }
            : list
        } );
        this.setState( { lists: newLists }, this.saveState );
    }

    
    changeTask = (listId, taskId, dataObj) => {
        const newLists = this.state.lists.map((list) => {
            if (list.id === listId) {
                return {
                    ...list,
                    tasks: list.tasks.map((task) => {
                        if (task.id === taskId) {
                            return { ...task, ...dataObj }
                        } else return task;
                    })
                }
            } else return list;
        })
        this.setState({ lists: newLists }, this.saveState );
    }
    

    render() {
        
        const todoLists = this.state.lists.map( (list) => 
            <TodoList 
                list = { list } 
                key = { list.id }
                addTask = { this.addTask }
                changeTask = {this.changeTask} />
        )

        return (
            <div className='App'>
               { todoLists } 
            </div>
        )
    }
}

export default App;