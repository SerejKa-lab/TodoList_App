import React from 'react';
import { connect } from 'react-redux';
import AddItemForm from './AddItemForm';
import ListTitle from './ListTitle';
import Preloader from './Preloader/Preloader';
import { api } from './API/api';
import { addTask, setTasksPage, setFltrTasksPage } from './Redux/reducer';

class TodoListHeader extends React.Component {

    state = {
        taskLoading: false,
        maxTasksCount: 33
    }

    setFirstTasksPage = () => {
        return api.setTasksPage(this.props.listId, 1)
            .then((Response) => {
                this.props.setTasksPage(this.props.listId, 1,
                    Response.data.items, Response.data.totalCount)
            })
    }

    addTask = (title) => {
        const { listId, page, filterValue } = this.props;
        this.setState({ taskLoading: true });
        
        if (filterValue === 'Completed') {
            api.addTask(listId, title)
                .then((Response) => {
                    if (Response.data.resultCode === 0) {
                        this.setFirstTasksPage()
                            .then(() => {
                                this.props.changeFilter('All')
                                this.setState({ taskLoading: false })
                            })
                    }
                })
        
        } else if (filterValue === 'All') {
            if (page === 1) {
                api.addTask(listId, title)
                    .then(Response => {
                        if (Response.data.resultCode === 0) {
                            this.props.addTask(Response.data.data.item)
                            this.setState({ taskLoading: false })
                        }
                    })
            } else {
                api.addTask(listId, title)
                    .then((Response) => {
                        if (Response.data.resultCode === 0) {
                            this.setFirstTasksPage()
                                .then(() => this.setState({ taskLoading: false }))
                        }
                    })
            }

        } else if (filterValue === 'Active') {
            api.addTask(listId, title)
                .then(Response => {
                    if (Response.data.resultCode === 0) {
                        api.getAllTasks(listId)
                            .then((Response) => {
                                const completed = false;
                                const tasks = Response.data.items;
                                this.props.setFltrTasksPage(listId, 1, tasks, completed)
                                this.setState({ taskLoading: false })
                            })
                    }
                })
        }
    }


    render() {

        const {listId, title, page, totalCount, filterValue, generalCount} = this.props
        const { maxTasksCount } = this.state
        const totalTasksCount = filterValue === 'All' ? totalCount : generalCount
        const loaderStyle ={
            fill: 'rgb(143, 59, 26)', height: '8px', position: 'absolute', right: '-3px', top: '5px'}

        return (
            <div className="list_header">
                <ListTitle listId={listId} title={title} page={page} />
{/* форма добавления задач */}
                { totalTasksCount < maxTasksCount 
                    && <div className='list_header_add_form'>
                        <AddItemForm
                            placeholder='Add new task'
                            listId={listId}
                            addItem={this.addTask} />
                        {this.state.taskLoading && <Preloader {...loaderStyle} />}
                    </div>}
            </div>
        )
    }

}



export default connect(null, { addTask, setTasksPage, setFltrTasksPage } )(TodoListHeader);

