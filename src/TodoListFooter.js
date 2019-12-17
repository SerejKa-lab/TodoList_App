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
        this.props.changeFilter(filterValue)
            .then(() => this.setTasksPage(1))
    }

    setTasksPage = (page) => {
        const { listId } = this.props;
        let completed = true;

        switch (this.props.filterValue) {
            
            case 'Active':
                completed = false
                api.getAllTasks(listId)
                    .then( Response => {
                        const tasks = Response.data.items;
                        this.props.setFltrTasksPage(listId, page, tasks, completed)
                    } )
            break

            case 'Completed':
                api.getAllTasks(listId)
                    .then( Response => {
                        const tasks = Response.data.items;
                        this.props.setFltrTasksPage(listId, page, tasks, completed)
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

    getPagesCount = () => {
        const { filterValue, totalCount, countOnPage, generalCount } = this.props
        return filterValue === 'Active'
            ? generalCount ? Math.ceil(generalCount / countOnPage) : 1
            : totalCount ? Math.ceil(totalCount / countOnPage) : 1
    }

    getPagesLinks = () => {
        const {page} = this.props;
        
        const pagesLinks = []
        for ( let i = 1; i <= this.getPagesCount(); i++ ) {
            const pageLink = <span className={ i === page ? 'pageLink active' : 'pageLink'} style={{ 'cursor': 'pointer' }}
                onClick={() => this.setTasksPage(i)} key={i}>{i}</span>
            pagesLinks.push(pageLink)
        }
        return pagesLinks
    }


    render = () => {
        let buttonAll = this.props.filterValue === 'All' ? 'filter-active' : '';
        let buttonActive = this.props.filterValue === 'Active' ? 'filter-active' : '';
        let buttonCompleted = this.props.filterValue === 'Completed' ? 'filter-active' : '';
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

