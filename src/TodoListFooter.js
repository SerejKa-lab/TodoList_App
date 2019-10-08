import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {
    render = () => {
        let buttonAll = this.props.filterValue === 'All' ? 'active' : '';
        let buttonActive = this.props.filterValue === 'Active' ? 'active' : '';
        let buttonCompleted = this.props.filterValue === 'Completed' ? 'active' : '';
        return (
            <div className="todoList-footer">
                <button className={buttonAll}>All</button>
                <button className={buttonCompleted}>Completed</button>
                <button className={buttonActive}>Active</button>
            </div>
        );
    }
}

export default TodoListFooter;

