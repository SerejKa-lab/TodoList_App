import React, { useState } from 'react'
import styles from './AddItemForm.module.css'


const Tooltip = (props) => {

    const [display, setDisplay] = useState(true)
    const hideToollip = () => setDisplay(false)

    const tooltipStyle = display ? styles.tooltip : styles.isHidden

    return(
        <div className={tooltipStyle}>
            {props.hint}
            <i className={'fa fa-close ' + styles.delete_button} onClick={hideToollip} />
        </div>
    )
}

export default Tooltip