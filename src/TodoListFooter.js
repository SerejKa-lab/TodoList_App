import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { api } from './api';
import { setTasksPage } from './reducer';

class TodoListFooter extends React.Component {

    state = {
        isHidden: false,
    }

    onAllFilterClick = () => { this.props.changeFilter('All') }
    onCompletedFilterClick = () => { this.props.changeFilter('Completed') }
    onActiveFilterClick = () => { this.props.changeFilter('Active') }
    onShowButtonClick = () => { this.setState({ isHidden: false }) }
    onHideButtonClick = () => { this.setState({ isHidden: true }) }

    setTasksPage = (page) =>{
        api.setTasksPage(this.props.listId, page)
            .then( Response => {
                this.props.setTasksPage(this.props.listId, Response.data.items, page) 
            })
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
        let buttonAll = this.props.filterValue === 'All' ? 'filter-active' : '';
        let buttonActive = this.props.filterValue === 'Active' ? 'filter-active' : '';
        let buttonCompleted = this.props.filterValue === 'Completed' ? 'filter-active' : '';
        return (
            <div className="todoList-footer">
                {this.getPagesCount() > 1 && 
                    <div className='tasksPagesLinks'>{ this.getPagesLinks() }</div>}
                {!this.state.isHidden &&
                    <div className='filter_buttons'>
                        <button onClick={ this.onAllFilterClick } className={buttonAll}>All</button>
                        <button onClick={ this.onCompletedFilterClick } className={buttonCompleted}>Completed</button>
                        <button onClick={ this.onActiveFilterClick } className={buttonActive}>Active</button>
                    </div>
                }
                {!this.state.isHidden && <span onClick={ this.onHideButtonClick } >Hide</span>}
                {this.state.isHidden && <span onClick={ this.onShowButtonClick } >Show</span>}
            </div>
        );
    }
}

export default connect(null, { setTasksPage } )(TodoListFooter);

