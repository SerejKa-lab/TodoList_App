import React from 'react';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import { connect } from 'react-redux';


class App extends React.Component {

    render() {
        const todoLists = this.props.lists.map((list) =>
            <TodoList
                list={list}
                key={list.id} />
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