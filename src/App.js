import React from 'react';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import { connect } from 'react-redux';


class App extends React.Component {

  
    addTask = (taskTitle, listId) => {
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
        
        const todoLists = this.props.lists.map((list) =>
            <TodoList
                list={list}
                key={list.id}
                
                addItem={this.addTask}
                changeTask={this.changeTask} />
        )

        return (
            <div className='app'>
                <h2>Органайзер задач</h2>
                <AddItemForm addItem = { this.props.addList } placeholder = 'Add list'/>
                <div className='app_lists'>
                    {todoLists}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        lists: state.lists
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        addList: ( listTitle ) => {
            const action = {
                type: 'ADD-LIST',
                listTitle: listTitle
            }
            dispatch( action );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);