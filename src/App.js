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

    addList = (title) => {
        this.setState({ listsLoading: true });
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            { title },
            {
                withCredentials: true,
                headers: { 'API-KEY': '8baf44b2-0e02-4373-8d97-31683e1cf067' }
            }
        )
            .then(Response => {
                this.props.addList(Response.data.data.item);
                this.setState({ listsLoading: false })
            })
    }

    restoreTasks = (listId) => {
        this.setState({ tasksLoading: true });
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${listId}/tasks`,
            { withCredentials: true })
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