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
        maxTasksCount: 100
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

        const {listId, title, page, totalCount} = this.props

        return (
            <div className="list_header">
                <ListTitle listId={listId} title={title} page={page} />
{/* форма добавления задач */}
                {totalCount < this.state.maxTasksCount && page === 1 &&
                    <div className='list_header_add_form'>
                        <AddItemForm
                            placeholder='Add new task'
                            listId={listId}
                            addItem={this.addTask} />
                        {this.state.taskLoading && <Preloader />}
                    </div>}
            </div>
        )
    }

}



export default connect(null, { addTask } )(TodoListHeader);

