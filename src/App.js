import React from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import Preloader from './Preloader/Preloader';
import { restoreLists, restoreTasks, addList } from './reducer';
import { api } from './api';


class App extends React.Component {

    componentDidMount(){
        this.restoreLists()
    }

    state = {
        listsLoading: false,
        tasksLoading: false
    }

    restoreLists = () => {
        this.setState({ listsLoading: true });
        api.restoreLists()
            .then(Response => {
                this.props.restoreLists(Response.data);
                this.setState({ listsLoading: false })
            })
    }

    addList = (title) => {
        this.setState({ listsLoading: true });
        api.addList(title)
            .then(Response => {
                this.props.addList(Response.data.data.item);
                this.setState({ listsLoading: false })
            })
    }

    restoreTasks = (listId) => {
        this.setState({ tasksLoading: true });
        api.restoreTasks(listId)
            .then(Response => {
                this.props.restoreTasks(listId, Response.data.items);
                this.setState({ tasksLoading: false })
            })
    }


    render() {
        const todoLists = this.props.lists.map((list) =>
            <TodoList list={list} key={list.id} restoreTasks={this.restoreTasks} />
        )

        return (
            <div className='app'>
                <h2>Органайзер задач</h2>
                <div className='inProgress'>
                    {this.props.lists.length < 10 
                        && <AddItemForm addItem={this.addList} placeholder='Add list' />}
                    {this.state.listsLoading && <Preloader />}
                </div>
                <div className='app_lists'>
                    {todoLists}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists
    }
}


const actionCreators = {restoreLists, restoreTasks ,addList}

export default connect(mapStateToProps, actionCreators)(App);