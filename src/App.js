import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import Preloader from './Preloader/Preloader';
import { restoreLists, restoreTasks, addList } from './Redux/reducer';
import { api } from './API/api';
import book from './Assets/img/book.png';


class App extends React.Component {

    componentDidMount(){
        this.restoreLists()
    }

    state = {
        listsLoading: false,
        tasksLoading: false,
        listAdding: false,
        maxListsCount: 10
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
        this.setState({ listAdding: true });
        api.addList(title)
            .then(Response => {
                this.props.addList(Response.data.data.item);
                this.setState({ listAdding: false })
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
        console.log('-------------RENDER----------------')
        const listsRoutes = this.props.lists.map((list) =>{
            const path = list.title.replace(/\s/g, '-')
            console.log('Route to '+path)
            return (
            <Route path={`/${path}`} key={list.id} render={() => 
                <TodoList list={list} key={list.id} restoreTasks={this.restoreTasks} />} 
            />) 
        })

        const allLists = this.props.lists.map( (list) => 
            <TodoList list={list} key={list.id} restoreTasks={this.restoreTasks} /> )

        const allListsLinks = this.props.lists.map( ( list ) => {
            const link = list.title.replace(/\s/g, '-')
            console.log(link)
            return(
                <li key={list.id}><NavLink to={`/${link}`}>{list.title}</NavLink></li>
            )
        } )


        return (
            <div className='app'>
                <div className='app_header'>
                    <NavLink to='/' exact className='app_title'>
                        <h2>
                            <img src={book} alt='book' className='app_header_icon' />
                            Органайзер задач
                        </h2>
                    </NavLink>
                    {this.props.lists.length < this.state.maxListsCount 
                        && <AddItemForm addItem={this.addList} placeholder='Add list' />}
                    {this.state.listAdding && <Preloader />}
                </div>
                <nav className='app_header_navigation'>
                    <ul>{allListsLinks}</ul>
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