import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './PagesLinks.module.css'
import { setTasksPage } from '../../../../Redux/appReducer'


const PagesLinks = ({listId, filterValue, page, pagesCount, setTasksPage}) => {

    // block the button immediately after clicking on it
    const [disabled, setDisabled] = useState(false)
    useEffect(() => setDisabled(false), [page])
    
    const getPagesLinks = () => {
        const pagesLinks = []
        for ( let i = 1; i <= pagesCount; i++ ) {
            const onClick = () => {
                setTasksPage(listId, filterValue, i)
                setDisabled(true)
            }
            
            const disabledValue = i === page || disabled ? true : false
            const linkStyle = i === page ? `${styles.pageLink} ${styles.active}` : styles.pageLink
            
            const pageLink = 
                <button key={i} disabled={disabledValue}
                    className={ linkStyle } onClick={ onClick } >{i}</button>
            pagesLinks.push(pageLink)
        }
        return pagesLinks
    }


    return(
        <div className={styles.tasksPagesLinks}>{ getPagesLinks() }</div>
    )
}

export default connect(null, { setTasksPage })(PagesLinks)