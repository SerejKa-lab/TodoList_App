import React from 'react';
import styles from './ListHeader.module.css'
import { connect } from 'react-redux';
import AddItemForm from '../../AddItemForm/AddItemForm';
import ListTitle from './ListTitle/ListTitle';
import Preloader from '../../Preloader/Preloader';
import { addTask, addTaskActive, setTasksPage, 
        setFilterValue, setAllTasksPage, deleteList } from '../../../Redux/reducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

class ListHeader extends React.Component {

    state = {
        maxTasksCount: 33
    }

    deleteList = () => {
        this.props.deleteList(this.props.listId)
            .then(() => {
                if (this.props.history.location.pathname !== '/') {
                    this.props.history.push('/')
                }
            })
    }

    addTask = (title) => {
        const { listId, filterValue, taskIsAdding } = this.props;

        if ( (filterValue === 'Completed' || filterValue === 'All') && !taskIsAdding )  {
            this.props.addTask(listId, title)
        }

        if (filterValue === 'Active' && !taskIsAdding) {
            this.props.addTaskActive(listId, title)
        }
    }


    render() {

        const {listId, title, page, totalCount, filterValue,
            generalCount, listDeliting, titleUpdating, taskIsAdding} = this.props
        const { maxTasksCount } = this.state
        const totalTasksCount = filterValue === 'All' ? totalCount : generalCount
        const loaderStyle ={
            fill: 'rgb(143, 59, 26)', height: '8px', position: 'absolute', right: '-3px', top: '5px'}

        return (
            <div className={styles.list_header}>
                <ListTitle listId={listId} title={title} page={page} 
                    listDeliting={listDeliting} titleUpdating={titleUpdating} />
                {/* форма добавления задач */}
                {totalTasksCount < maxTasksCount
                    && <div className={styles.list_header_add_form}>
                        <AddItemForm
                            placeholder='Add new task'
                            listId={listId}
                            addItem={this.addTask} />
                        {taskIsAdding && <Preloader {...loaderStyle} />}
                    </div>}
                { !listDeliting
                    &&<i className={'fa fa-close ' + styles.delete_button} onClick={this.deleteList} />
                }
                { listDeliting
                    &&<i className={'fa fa-close ' + styles.delete_button}/>
                }
            </div>
        )
    }

}


const mdtp = { 
    addTask, addTaskActive, setTasksPage, 
    setFilterValue, setAllTasksPage,
    deleteList
}

export default compose (
    connect(null, mdtp ),
    withRouter
)(ListHeader);

