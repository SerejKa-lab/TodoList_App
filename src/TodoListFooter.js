import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { api } from './api';
import { setTasksPage, setFltrTasksPage } from './reducer';

class TodoListFooter extends React.Component {

    componentDidUpdate() {
        if (this.props.filterValue !== this.state.filterValue) 
            this.setState({ filterValue: this.props.filterValue })
    }

    state = {
        isHidden: false,
        filterValue: 'All'
    }

    onShowButtonClick = () => { this.setState({ isHidden: false }) }
    onHideButtonClick = () => { this.setState({ isHidden: true }) }

    getTasks = (filterValue) => {
        this.setState({ filterValue }, 
            () => {
                this.setTasksPage(1);
                this.props.changeFilter(filterValue)
            }
        )
    }

    setTasksPage = (page) => {
        const { listId } = this.props;

        switch (this.state.filterValue) {
            
            case 'Active':
                api.getAllTasks(listId)
                    .then( Response => {
                        const tasks = Response.data.items;
                        this.props.setFltrTasksPage(listId, page, tasks, false)
                    } )
            break

            case 'Completed':
                api.getAllTasks(listId)
                    .then( Response => {
                        const tasks = Response.data.items;
                        this.props.setFltrTasksPage(listId, page, tasks, true)
                    } )
            break

            default:
                api.setTasksPage(listId, page)
                    .then(Response => {
                        const { items: tasks, totalCount} = Response.data;
                        this.props.setTasksPage(listId, page, tasks, totalCount)
                    })
        }
    }

    getPagesCount = () => 
        this.props.totalCount ? Math.ceil(this.props.totalCount/this.props.countOnPage) : 1;

    getPagesLinks = () => {
        const {page} = this.props;
        
        const pagesLinks = []
        for ( let i = 1; i <= this.getPagesCount(); i++ ) {
            const pageLink = <span className={ i === page ? 'pageLink active' : 'pageLink' }
                onClick={() => this.setTasksPage(i)} key={i}>{i}</span>
            pagesLinks.push(pageLink)
        }
        return pagesLinks
    }


    render = () => {
        let buttonAll = this.state.filterValue === 'All' ? 'filter-active' : '';
        let buttonActive = this.state.filterValue === 'Active' ? 'filter-active' : '';
        let buttonCompleted = this.state.filterValue === 'Completed' ? 'filter-active' : '';
        return (
            <div className="todoList-footer">
                {this.getPagesCount() > 1 && 
                    <div className='tasksPagesLinks'>{ this.getPagesLinks() }</div>}
                {!this.state.isHidden &&
                    <div className='filter_buttons'>
                        <button onClick={ () => this.getTasks('All') } className={buttonAll}>All</button>
                        <button onClick={ () => this.getTasks('Completed') } className={buttonCompleted}>Completed</button>
                        <button onClick={ () => this.getTasks('Active') } className={buttonActive}>Active</button>
                    </div>
                }
                {!this.state.isHidden && <span onClick={ this.onHideButtonClick } >Hide</span>}
                {this.state.isHidden && <span onClick={ this.onShowButtonClick } >Show</span>}
            </div>
        );
    }
}


export default connect(null, { setTasksPage, setFltrTasksPage } )(TodoListFooter);

