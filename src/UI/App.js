import React from 'react';
import styles from './App.module.css'
import { connect } from 'react-redux';
import { NavLink, Route, withRouter, Switch } from 'react-router-dom';
import TodoList from './TodoList/TodoList';
import AddItemForm from './AddItemForm/AddItemForm';
import Preloader from './Preloader/Preloader';
import {restoreLists, restoreTasks, addList} from '../Redux/appReducer';
import {resetErrorAC as resetError} from '../Redux/errorsReducer';
import book from '../Assets/img/book.png';
import { compose } from 'redux';
import Error404 from './Errors/Error404/Error404';
import CommonError from './Errors/CommonError/CommonError';


class App extends React.Component {

    componentDidMount(){
        this.props.restoreLists()
    }


    restoreTasks = (listId) => this.props.restoreTasks(listId)


    render() {

        const {lists, listsCount, maxListsCount, maxTasksCount, listId, listsLoading, 
            errors, resetError} = this.props;

        const listTitles = lists.map((list) => ({title: list.title, id: list.id}) )

        // generate list Routes for single list display
        const listsRoutes = lists.map((list) =>{
            const path = list.title.replace(/\s|\?|#/g, '-')
            return (
            <Route path={`/${path}`} exact key={list.id} render={() => 
                <TodoList list={list} key={list.id} maxTasksCount={maxTasksCount}
                    restoreTasks={this.restoreTasks} listTitles={listTitles} />} 
            />) 
        })

        // generate list Routes for lists general display
        const allLists = lists.map((list) =>
            <TodoList list={list} key={list.id} listTitles={listTitles} listsCount={listsCount}
                restoreTasks={this.restoreTasks} maxTasksCount={maxTasksCount} />
        )

        const allListsLinks = lists.map( ( list ) => {
            const link = list.title.replace(/\s|\?|#/g, '-')
            return(
                <li key={list.id}><NavLink to={`/${link}`}>{list.title}</NavLink></li>
            )
        } )

        const listTitleValidation = (newTitle) => {
            const equalTitles = listTitles.find((el) => {
                return (el.title.toLowerCase() === newTitle.toLowerCase() && el.id !== listId)
            })

            if (newTitle.trim() === '' || newTitle.length > 100 || newTitle.match(/%/) || equalTitles) {
                return true
            }
        }

        const addList = (title) => {
            this.props.addList(title)
            if (this.props.history.location.pathname !== '/') {
                this.props.history.push('/')
            }
        }

        const preloaderStyles = {
            position: 'absolute', height: '12px', top: '1.75em', right: '34%', fill: 'white'
        }
        
        const errorsArr = errors.length
            ? errors.map((error, index) =>
                <CommonError message={error} resetError={resetError} key={index} />)
            : null
        
        const addListHint = 
            'Please, check the % sign is missing and enter a unique title between 1 and 100 chars long, or press "Esc" to reset'

        return (
            <div className={styles.app}>
                {(errors.length !== 0) && <div className={styles.errorsBlock}>{errorsArr}</div>}
                
                <div className={styles.app_header}>
                    { listsLoading && <Preloader {...preloaderStyles}/> }
                    <NavLink to='/' exact className={styles.app_title}>
                        <h2>
                            <img src={book} alt='book' className={styles.app_header_icon} />
                            Tasks Manager
                        </h2>
                    </NavLink>
                    {lists.length < maxListsCount 
                        && <div className={styles.app_addItemForm}>
                                <AddItemForm addItem={addList} hint={addListHint}
                                    validationFunc={listTitleValidation} placeholder='Add list' />
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
        lists: state.app.lists,
        listsCount: state.app.lists.length,
        listsLoading: state.app.listsProgress.listsLoading,
        maxListsCount: state.app.maxListsCount,
        maxTasksCount: state.app.maxTasksCount,
        errors: state.errors.length ? state.errors.map((el) => el.message) : state.errors
    }
}



export default compose(
    connect(mapStateToProps, {restoreLists, restoreTasks ,addList, resetError}),
    withRouter
)(App);