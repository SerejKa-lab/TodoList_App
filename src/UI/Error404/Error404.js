import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Error404.module.css'


const Error404 = (props) => {
    return(
        <div className={styles.error404}>
            <h3>No match for <code>"{props.location.pathname}"</code>. Please, check URL.</h3>
        </div>
    )
}

export default withRouter(Error404);