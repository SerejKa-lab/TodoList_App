import React, { useState } from 'react'
import styles from './Tooltip.module.css'


const Tooltip = (props) => {

    const [display, setDisplay] = useState(true)
    const hideToollip = () => setDisplay(false)

    const tooltipStyle = display ? styles.tooltip : styles.isHidden

    return(
        <div className={tooltipStyle} onClick={hideToollip}>
            {props.hint}
        </div>
    )
}

export default Tooltip