import React from 'react';
import AddItemForm from './AddItemForm';
import { connect } from 'react-redux';


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


const mapDispatchToProps = (dispatch) => {
    return {
        deleteList: (listId) => {
            const action = {
                type: 'DELETE-LIST',
                listId

            };
            dispatch(action);
        }
    }
}


export default connect(null, mapDispatchToProps)(TodoListHeader);

