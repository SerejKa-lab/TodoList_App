import React from 'react';
import AddItemForm from './AddItemForm';


const TodoListHeader = (props) => {

    const { listId, addItem, deleteList } = props;
    const deleteListOnClick = () => {
        deleteList( listId );
    }

    return (
        <div className="todoList-header">
            <h3 className="todoList-header__title">
                { props.title } &nbsp;
                <button className='delete_list' onClick = { deleteListOnClick }><i className="fa fa-close"></i></button>
                </h3>
            <AddItemForm
                placeholder = 'Add new task'
                listId ={ listId }
                addItem ={ addItem } />
        </div>
    );
}

export default TodoListHeader;

