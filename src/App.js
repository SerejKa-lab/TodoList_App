import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import Preloader from './Preloader/Preloader';
import { restoreLists, restoreTasks, addList } from './reducer';


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
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', { withCredentials: true })
            .then(Response => {
                this.props.restoreLists(Response.data);
                this.setState({ listsLoading: false })
            })
    }

    restoreTasks = (listId) => {
        this.setState({ tasksLoading: true });
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${listId}/tasks`,
            { withCredentials: true })
            .then(Response => {
                console.log(Response);
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
                <AddItemForm addItem={this.addList} placeholder='Add list' />
                <div className='app_lists'>
                    {this.state.listsLoading && <Preloader />}
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