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


    restoreTasks = (listId) => this.props.restoreTasks(listId)


    render() {

        const listTitles = this.props.lists.map((list) => ({title: list.title, id: list.id}) )

        const listsRoutes = this.props.lists.map((list) =>{
            const path = list.title.replace(/\s|\?|#/g, '-')
            return (
            <Route path={`/${path}`} exact key={list.id} render={() => 
                <TodoList list={list} key={list.id} 
                    restoreTasks={this.restoreTasks} listTitles={listTitles} />} 
            />) 
        })

        const allLists = this.props.lists.map((list) => {
            return( 
                <TodoList list={list} key={list.id} listTitles={listTitles}
                    restoreTasks={this.restoreTasks} listsCount={this.props.listsCount}/>
            )}
        )

        const allListsLinks = this.props.lists.map( ( list ) => {
            const link = list.title.replace(/\s|\?|#/g, '-')
            return(
                <li key={list.id}><NavLink to={`/${link}`}>{list.title}</NavLink></li>
            )
        } )

        const listTitleValidation = (newTitle) => {

            const equalTitles = listTitles.find((el) => {
                return (el.title.toLowerCase() === newTitle.toLowerCase() && el.id !== this.props.listId)
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

        const addListHint = 
            'Please, check the % sign is missing and enter a unique title between 1 and 100 chars long, or press "Esc" to reset'

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
        lists: state.lists,
        listsCount: state.lists.length,
        listsLoading: state.listsProgress.listsLoading,
        maxListsCount: state.maxListsCount
    }
}



export default compose(
    connect(mapStateToProps, {restoreLists, restoreTasks ,addList}),
    withRouter
)(App);