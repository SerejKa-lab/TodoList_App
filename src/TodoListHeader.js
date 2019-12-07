import React from 'react';
import AddItemForm from './AddItemForm';
import { connect } from 'react-redux';
import { deleteListAC, addTaskAC } from './reducer';


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
        deleteList: (listId) => dispatch( deleteListAC(listId) ),
        addTask: (taskTitle, listId) => dispatch( addTaskAC( taskTitle, listId ) )
    }
}


export default connect(null, mapDispatchToProps)(TodoListHeader);

