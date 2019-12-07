import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AddItemForm from './AddItemForm';
import { deleteList, addTask } from './reducer';
import Preloader from './Preloader/Preloader';


class TodoListHeader extends React.Component {

    state = {
        inProgress: false,
        taskLoading: false
    }

    deleteList = () => {
        this.setState({ inProgress: true });
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.listId}`,
            {
                withCredentials: true,
                headers: { 'API-KEY': '8baf44b2-0e02-4373-8d97-31683e1cf067' }
            }
        )
            .then(() => {
                this.props.deleteList(this.props.listId);
                this.setState({ inProgress: false })
            })
    }

    addTask = (title) => {
        this.setState({ taskLoading: true });
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.listId}/tasks`,
            {title},
            {
                withCredentials: true,
                headers: { 'API-KEY': '8baf44b2-0e02-4373-8d97-31683e1cf067' }
            }
        )
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

