import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
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
                this.props.restoreTasks(listId, Response.data.items, Response.data.totalCount);
                this.setState({ tasksLoading: false })
            })
    }


    render() {
        const listsRoutes = this.props.lists.map((list) =>
            <Route path={`/${list.title}`}><TodoList list={list} key={list.id} restoreTasks={this.restoreTasks} /></Route>
        )

        const allLists = this.props.lists.map( (list) => 
            <TodoList list={list} key={list.id} restoreTasks={this.restoreTasks} /> )

        const listLinks = this.props.lists.map( ( list ) => 
            <li><NavLink to={`/${list.title}`}>{list.title}</NavLink></li> )

        return (
            <div className='app'>
                <div className='app_header'>
                    <NavLink to='/' exact className='app_title'><h2>Органайзер задач</h2></NavLink>
                    {this.props.lists.length < 10 
                        && <AddItemForm addItem={this.addList} placeholder='Add list' />}
                    {this.state.listsLoading && <Preloader />}
                </div>
                <nav className='app_header_navigation'>
                    <ul>{listLinks}</ul>
                </nav>
                <div className='app_lists'>
                    {listsRoutes}
                    <Route path='/' exact>{allLists}</Route>
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