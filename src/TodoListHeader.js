import React from 'react';
import AddItemForm from './AddItemForm';
import { connect } from 'react-redux';


const TodoListHeader = (props) => {

    const { listId, addTask, deleteList } = props;

    const deleteListOnClick = () => { deleteList( listId ) };

        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">
                    {props.title} &nbsp;
                <button className='delete_list' onClick={deleteListOnClick}><i className="fa fa-close"></i></button>
                </h3>
                <AddItemForm
                    placeholder='Add new task'
                    listId = { listId }
                    addItem={addTask} />
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
        },
        addTask: (taskTitle, listId) => {
            const action = {
                type: 'ADD-TASK',
                listId,
                taskTitle
            };
            dispatch(action);
        }
    }
}


export default connect(null, mapDispatchToProps)(TodoListHeader);

