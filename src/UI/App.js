import React from 'react';
import styles from './App.module.css'
import { connect } from 'react-redux';
import { NavLink, Route, withRouter, Switch } from 'react-router-dom';
import TodoList from './TodoList/TodoList';
import AddItemForm from './AddItemForm/AddItemForm';
import Preloader from './Preloader/Preloader';
import {restoreLists, restoreTasks, addList} from '../Redux/reducer';
import book from '../Assets/img/book.png';
import { compose } from 'redux';
import Error404 from './Error404/Error404';


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
            <Route path={`/${path}`} exact key={list.id} render={() => 
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
            <div className={styles.app}>
                <div className={styles.app_header}>
                    { this.props.listsLoading && <Preloader {...preloaderStyles}/>
                    }
                    <NavLink to='/' exact className={styles.app_title}>
                        <h2>
                            <img src={book} alt='book' className={styles.app_header_icon} />
                            Tasks Organizer
                        </h2>
                    </NavLink>
                    {this.props.lists.length < this.props.maxListsCount 
                        && <div className={styles.app_addItemForm}>
                                <AddItemForm addItem={this.addList} placeholder='Add list' />
                            </div>}
                </div>
                <nav className={styles.app_header_navigation}>
                    <ul>{allListsLinks}</ul>
                </nav>
                <div className={styles.app_lists}>
                    <Switch>
                        {listsRoutes}
                        <Route path='/' exact>{allLists}</Route>
                        <Route component={Error404} />
                    </Switch>
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