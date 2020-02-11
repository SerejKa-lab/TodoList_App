import React, { useState } from 'react'
import Preloader from '../../Preloader/Preloader'
import styles from './ListFooter.module.css'
import ListOrder from './ListOrder/ListOrder'
import StatusFilter from './StatusFilter/StatusFilter'
import PagesLinks from './PagesLinks/PagesLinks'
import { withRouter } from 'react-router-dom'

const ListFooter = (props) => {

    const { listId, filterValue, listsCount, order,
            totalCount, countOnPage, page, footerProcessing } = props

    const loaderStyle = {
        fill: 'rgb(85, 47, 11)', height: '10px', position: 'absolute', bottom: '5px', right: '45%'
    }

    const pagesCount = totalCount ? Math.ceil(totalCount / countOnPage) : 1
    
    // define conditions to show/hide order button
    const showOrder = props.history.location.pathname === '/' ? true : false

    const [isHidden, setHidden] = useState(true)
    const toggleOnClick = () => setHidden(!isHidden)

    const filterButtonStyle = 
        isHidden ? styles.filterButton : styles.filterButton + ' '+ styles.pressed


    return (
        <div className={styles.list_footer}>
            {pagesCount > 1 
                && <PagesLinks page={page} pagesCount={pagesCount} listId={listId} filterValue={filterValue} />}
            {!isHidden &&
                <div className={styles.filterBlock}>
                    <StatusFilter
                        listId={listId}
                        filterValue={filterValue}
                        footerProcessing={footerProcessing} />
                </div>
            }
            
            <button className={filterButtonStyle} onClick={toggleOnClick} >Filter</button>

            {showOrder && listsCount !== 1
                && <ListOrder order={order} listsCount={listsCount} listId={listId} />}
            {footerProcessing && <Preloader {...loaderStyle} />}
        </div>
    );

}


export default withRouter(ListFooter)

