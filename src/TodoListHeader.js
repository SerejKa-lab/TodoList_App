import React from 'react';
import AddItemForm from './AddItemForm';


const TodoListHeader = (props) => {

    return (
        <div className="todoList-header">
            <h3 className="todoList-header__title">{ props.title }</h3>
            <AddItemForm
                listId ={ props.listId }
                addItem ={ props.addItem } />
        </div>
    );
}

export default TodoListHeader;

