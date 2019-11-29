import React from 'react';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import { connect } from 'react-redux';


class App extends React.Component {

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