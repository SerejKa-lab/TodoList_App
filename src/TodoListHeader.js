import React from 'react';
import { connect } from 'react-redux';
import AddItemForm from './AddItemForm';
import { deleteList, addTask } from './reducer';
import Preloader from './Preloader/Preloader';
import { api } from './api';

class TodoListHeader extends React.Component {

    state = {
        inProgress: false,
        taskLoading: false
    }

    deleteList = () => {
        this.setState({ inProgress: true });
        api.deleteList(this.props.listId)
            .then(() => {
                this.props.deleteList(this.props.listId);
                this.setState({ inProgress: false })
            })
    }

    addTask = (title) => {
        this.setState({ taskLoading: true });
        api.addTask(this.props.listId, title)
            .then(Response => {
                this.props.addTask(Response.data.data.item)
                this.setState({ taskLoading: false })
            })
    }

    render() {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title inProgress">
                    {this.props.title} &nbsp;
                <button className='delete_list' onClick={this.deleteList}><i className="fa fa-close"></i></button>
                    {this.state.inProgress && <Preloader />}
                </h3>
                <div className='inProgress'>
                    <AddItemForm
                        placeholder='Add new task'
                        listId={this.props.listId}
                        addItem={this.addTask} />
                    {this.state.taskLoading && <Preloader />}
                </div>
            </div>
        )
    }

}


const actionCreators = { deleteList, addTask }

export default connect(null, actionCreators)(TodoListHeader);

