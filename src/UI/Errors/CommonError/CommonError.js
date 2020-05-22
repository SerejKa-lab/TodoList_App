import React, { useEffect } from 'react';
import styles from './CommonError.module.css';


const CommonError = ({message, resetError}) => {

    useEffect(() => {
        setTimeout(resetError, 5000)
    },[resetError])

    const keyReset = (e) => {
        if (e.key === 'Enter') resetError()
    }

    return(
        <div className={styles.error}>
            {message}
            {<span className={`fa fa-times ${styles.closeIcon}`} aria-hidden="true" 
                onClick={resetError} tabIndex='0' onKeyPress={keyReset}
                aria-label='close error'></span>}
        </div>
    )
}

export default CommonError;