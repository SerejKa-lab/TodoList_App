import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {

    state = {
        isHidden: false
    }

    onAllFilterClick = () => { this.props.changeFilter('All') }
    onCompletedFilterClick = () => { this.props.changeFilter('Completed') }
    onActiveFilterClick = () => { this.props.changeFilter('Active') }
    onShowButtonClick = () => { this.setState({ isHidden: false }) }
    onHideButtonClick = () => { this.setState({ isHidden: true }) }


    render = () => {
        let buttonAll = this.props.filterValue === 'All' ? 'active' : '';
        let buttonActive = this.props.filterValue === 'Active' ? 'active' : '';
        let buttonCompleted = this.props.filterValue === 'Completed' ? 'active' : '';
        return (
            <div className="todoList-footer">
                {!this.state.isHidden &&
                    <div>
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

export default TodoListFooter;

