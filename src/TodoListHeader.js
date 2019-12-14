import React from 'react';
import { connect } from 'react-redux';
import AddItemForm from './AddItemForm';
import { addTask } from './reducer';
import Preloader from './Preloader/Preloader';
import { api } from './api';
import ListTitle from './ListTitle';

class TodoListHeader extends React.Component {

    state = {
        taskLoading: false,
        maxTasksCount: 30
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
            <div className="list_header">
                <ListTitle listId={this.props.listId} title={this.props.title} />
{/* форма добавления задач */}
                {this.props.totalCount < this.state.maxTasksCount &&
                    <div className='list_header_add_form'>
                        <AddItemForm
                            placeholder='Add new task'
                            listId={this.props.listId}
                            addItem={this.addTask} />
                        {this.state.taskLoading && <Preloader />}
                    </div>}
            </div>
        )
    }

}



export default connect(null, { addTask } )(TodoListHeader);

