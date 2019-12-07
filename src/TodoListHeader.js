import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AddItemForm from './AddItemForm';
import { deleteList, addTask } from './reducer';
import Preloader from './Preloader/Preloader';


class TodoListHeader extends React.Component {

    state = {
        inProgress: false
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
                debugger
                this.props.deleteList(this.props.listId);
                this.setState({ inProgress: false })
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
                <AddItemForm
                    placeholder='Add new task'
                    listId={this.props.listId}
                    addItem={addTask} />
            </div>
        )
    }

}


const actionCreators = { deleteList, addTask }

export default connect(null, actionCreators)(TodoListHeader);

