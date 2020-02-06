import React from 'react'
import styles from './ListFooter.module.css'
import { setTasksPage, setFilterValue, setFilteredPage, setAllTasksPage } from '../../../Redux/reducer'
import { connect } from 'react-redux';
import ListFooter from './ListFooter'


class ListFooterContainer extends React.Component {

    state = {
        isHidden: false,
        inProcess: false
    }

    showOnButtonClick = () => { this.setState({ isHidden: false }) }
    hideOnButtonClick = () => { this.setState({ isHidden: true }) }

    getTasks = (filterValue) => {
        const { listId, setFilterValue } = this.props
        setFilterValue(listId, filterValue)
            .then( () => this.setTasksPage(1) )
    }

    setTasksPage = (page) => {
        const { listId, setFilteredPage, setAllTasksPage } = this.props;
        this.setState({inProcess: true});

        switch (this.props.filterValue) {
            
            case 'Active':
                setFilteredPage(listId, page, 0)   // status = 0
                    .then(() => this.setState({ inProcess: false }) )
            break

            case 'Completed':
                setFilteredPage(listId, page, 1)   // status = 1
                    .then(() => this.setState({ inProcess: false }) )
            break

            default:
                setAllTasksPage(listId, page)
                this.setState({ inProcess: false })
        }
    }

    getPagesCount = () => {
        const { totalCount, countOnPage } = this.props
            return totalCount ? Math.ceil(totalCount / countOnPage) : 1
    }

    getPagesLinks = () => {
        const {page} = this.props;
        const pagesLinks = []
        for ( let i = 1; i <= this.getPagesCount(); i++ ) {
            const pageLink = <span 
                    className={ i === page ? `${styles.pageLink} ${styles.active}` : styles.pageLink} 
                    style={{ 'cursor': 'pointer' }} key={i}
                    onClick={() => this.setTasksPage(i)} >{i}
                </span>
            pagesLinks.push(pageLink)
        }
        return pagesLinks
    }

    render() {
        return(
            <ListFooter 
                isHidden={this.state.isHidden}
                inProcess={this.state.inProcess}
                filterValue={this.props.filterValue}
                pagesCount={this.getPagesCount()}
                pagesLinks={this.getPagesLinks()}
                getTasks={this.getTasks}
                hideOnButtonClick={this.hideOnButtonClick}
                showOnButtonClick={this.showOnButtonClick}
            />
        )
    }
    
}

const mdtp = { setTasksPage, setFilterValue, setFilteredPage, setAllTasksPage }

export default connect(null, mdtp )(ListFooterContainer)
