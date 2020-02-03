import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { api } from './API/api';
import { setTasksPage, setFltrTasksPage } from './Redux/reducer';
import Preloader from './Preloader/Preloader';

class TodoListFooter extends React.Component {

    componentDidUpdate() {
        if (this.props.filterValue !== this.state.filterValue) 
            this.setState({ filterValue: this.props.filterValue })
    }

    state = {
        isHidden: false,
        filterValue: 'All',
        inProgress: false
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

        this.setState({inProgress: true});

        switch (this.props.filterValue) {
            
            case 'Active':
                completed = false
                api.getAllTasks(listId)
                    .then( Response => {
                        const tasks = Response.data.items;
                        this.props.setFltrTasksPage(listId, page, tasks, completed)
                        this.setState({ inProgress: false })
                    } )
            break

            case 'Completed':
                api.getAllTasks(listId)
                    .then( Response => {
                        const tasks = Response.data.items;
                        this.props.setFltrTasksPage(listId, page, tasks, completed)
                        this.setState({ inProgress: false })
                    } )
            break

            default:
                api.setTasksPage(listId, page)
                    .then(Response => {
                        const { items: tasks, totalCount} = Response.data;
                        this.props.setTasksPage(listId, page, tasks, totalCount)
                        this.setState({ inProgress: false })
                    })
        }
    }

    getPagesCount = () => {
        const { totalCount, countOnPage } = this.props
            return totalCount ? Math.ceil(totalCount / countOnPage) : 1
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
        const loaderStyle ={
            fill: 'rgb(143, 59, 26)', height: '10px', position: 'absolute', top: '5px', right: '5px'}

        return (
            <div className="todoList-footer">
                {this.getPagesCount() > 1 && 
                    <div className='tasksPagesLinks'>{ this.getPagesLinks() }</div>}
                {!this.state.isHidden &&
                    <div className='filter_buttons'>
                        <button onClick={ () => this.getTasks('All') } className={buttonAll}>All</button>
                        <button onClick={ () => this.getTasks('Completed') } className={buttonCompleted}>Completed</button>
                        <button onClick={ () => this.getTasks('Active') } className={buttonActive}>Active</button>
                        { this.state.inProgress && <Preloader {...loaderStyle} /> }
                    </div>
                }
                {!this.state.isHidden && <span onClick={ this.onHideButtonClick } >Hide</span>}
                {this.state.isHidden && <span onClick={ this.onShowButtonClick } >Show</span>}
            </div>
        );
    }
}


export default connect(null, { setTasksPage, setFltrTasksPage } )(TodoListFooter);

