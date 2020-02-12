import React from 'react'
import { connect } from 'react-redux'
import styles from './StatusFilter.module.css'
import { setFilterValue, ALL_S, COMPLETED, ACTIVE } from '../../../../Redux/reducer'
import onClickOutside from 'react-onclickoutside'
import { compose } from 'redux'


class StatusFilter extends React.Component {

    // configure the onClickOutside click handler
    handleClickOutside = () => this.setState({ isHidden: true })

    state = {
        isHidden: true
    }

    toggleOnClick = () => this.setState({ isHidden: !this.state.isHidden })

    render() {

        const { listId, filterValue, footerProcessing, setFilterValue } = this.props

        const buttonAll = filterValue === ALL_S ? styles.pressed : ''
        const buttonActive = filterValue === ACTIVE ? styles.pressed : ''
        const buttonCompleted = filterValue === COMPLETED ? styles.pressed : ''

        const filter = { ALL_S: 'All', COMPLETED: 'Completed', ACTIVE: 'Active' }

        const getAllTasks = () => {
            if (filterValue !== ALL_S) setFilterValue(listId, ALL_S)
        }
        const getCompletedTasks = () => {
            if (filterValue !== COMPLETED) setFilterValue(listId, COMPLETED)
        }
        const getActiveTasks = () => {
            if (filterValue !== ACTIVE) setFilterValue(listId, ACTIVE)
        }

        const filterButtonStyle =
            this.state.isHidden ? styles.frontButton : styles.frontButton + ' ' + styles.pressed

        return (
            <div className={styles.statusFilter}>
                <button className={filterButtonStyle} onClick={this.toggleOnClick}>
                   {filter[filterValue]}</button>
                {!this.state.isHidden &&
                    <div className={styles.filterButtons}>
                        <button onClick={getAllTasks}
                            className={buttonAll} disabled={footerProcessing}>All</button>
                        <button onClick={getCompletedTasks}
                            className={buttonCompleted} disabled={footerProcessing}>Completed</button>
                        <button onClick={getActiveTasks}
                            className={buttonActive} disabled={footerProcessing}>Active</button>
                    </div>
                }
            </div>
        )
    }
}


export default compose(
    connect(null, { setFilterValue }),
    onClickOutside
)(StatusFilter)