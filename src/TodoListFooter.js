import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {
    render = () => {
        let buttonAll = this.props.filterValue === 'All' ? 'active' : '';
        let buttonActive = this.props.filterValue === 'Active' ? 'active' : '';
        let buttonCompleted = this.props.filterValue === 'Completed' ? 'active' : '';
        return (
            <div className="todoList-footer">
                <button onClick = { () => this.props.changeFilter ('All') } className={buttonAll}>All</button>
                <button onClick = { () => this.props.changeFilter ('Completed') } className={buttonCompleted}>Completed</button>
                <button onClick = { () => this.props.changeFilter ('Active') } className={buttonActive}>Active</button>
            </div>
        );
    }
}

export default TodoListFooter;

