import React from 'react';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';


class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    };

    state = {
        nextListId: 5,
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
        let state = { lists: [] };
        const storageState = localStorage.getItem('TodoLists');
        if (storageState !== null) {
            state = JSON.parse(storageState)
        };
        this.setState(state);
    }

    addListItem = ( listTitle ) => {
        const listId = this.state.nextListId;
        const newList = { id: listId, title: listTitle, tasks: [], nextTaskId: 1 };
        this.setState( { lists: [ ...this.state.lists, newList ], nextListId: listId+1 } )
    }

    addTaskItem = (taskTitle, listId) => {
        const listIndex = this.state.lists.findIndex( (list) => list.id === listId );
        const taskId = this.state.lists[listIndex].tasks.length + 1;
        const newTask = { id: taskId, title: taskTitle, isDone: false, priority: 'medium' }
        const newLists = this.state.lists.map((list) => {
            return (list.id === listId)
                ? { ...list, tasks: [...list.tasks, newTask], nextTaskId: list.nextTaskId + 1 }
                : list
        });
        this.setState({ lists: newLists }, this.saveState);
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
        this.setState({ lists: newLists }, this.saveState);
    }


    render() {
        
        const todoLists = this.state.lists.map((list) =>
            <TodoList
                list={list}
                key={list.id}
                addItem={this.addTaskItem}
                changeTask={this.changeTask} />
        )

        return (
            <div className='app'>
                <AddItemForm addItem = { this.addListItem }/>
                <div className='app_lists'>
                    {todoLists}
                </div>
            </div>
        )
    }
}

export default App;