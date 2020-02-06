import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, withRouter } from 'react-router-dom';
import TodoList from './TodoList/TodoList';
import AddItemForm from './AddItemForm/AddItemForm';
import Preloader from './Preloader/Preloader';
import {restoreLists, restoreTasks, addList} from '../Redux/reducer';
import book from '../Assets/img/book.png';
import { compose } from 'redux';


class App extends React.Component {

    componentDidMount(){
        this.props.restoreLists()
    }

    addList = (title) => {
        if (!title.match(/%/)) {
            this.props.addList(title)
            this.props.history.push('/')
        }
    }

    restoreTasks = (listId) => this.props.restoreTasks(listId)


    render() {
        const listsRoutes = this.props.lists.map((list) =>{
            const path = list.title.replace(/\s|\?|#/g, '-')
            return (
            <Route path={`/${path}`} key={list.id} render={() => 
                <TodoList list={list} key={list.id} restoreTasks={this.restoreTasks} />} 
            />) 
        })

        const allLists = this.props.lists.map( (list) => 
            <TodoList list={list} key={list.id} restoreTasks={this.restoreTasks} /> )

        const allListsLinks = this.props.lists.map( ( list ) => {
            const link = list.title.replace(/\s|\?|#/g, '-')
            return(
                <li key={list.id}><NavLink to={`/${link}`}>{list.title}</NavLink></li>
            )
        } )

        const preloaderStyles = {
            position: 'absolute', height: '12px', top: '1.75em', right: '34%', fill: 'white'
        }


        return (
            <div className='app'>
                <div className='app_header'>
                    { this.props.listsLoading && <Preloader {...preloaderStyles}/>
                    }
                    <NavLink to='/' exact className='app_title'>
                        <h2>
                            <img src={book} alt='book' className='app_header_icon' />
                            Tasks Organizer
                        </h2>
                    </NavLink>
                    {this.props.lists.length < this.props.maxListsCount 
                        && <AddItemForm addItem={this.addList} placeholder='Add list' />}
                </div>
                <nav className='app_header_navigation'>
                    <ul>{allListsLinks}</ul>
                </nav>
                <div className='app_lists'>
                    { listsRoutes }
                    <Route path='/' exact>{allLists}</Route>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists,
        listsLoading: state.listsProgress.listsLoading,
        maxListsCount: state.maxListsCount
    }
}



export default compose(
    connect(mapStateToProps, {restoreLists, restoreTasks ,addList}),
    withRouter
)(App);