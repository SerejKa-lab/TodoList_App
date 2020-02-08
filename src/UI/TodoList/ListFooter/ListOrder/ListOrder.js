import React, { useState } from 'react'
import styles from './ListOrder.module.css'
import { connect } from 'react-redux'
import { reorderList } from '../../../../Redux/reducer'


const ListOrder = (props) => {

    const [orderMode, setMode] = useState(false)

    const toggleMode = () => setMode(!orderMode)

    const reorderOnClick = (nextPos) => {
        const { listId, order: currPos } = props
        
        props.reorderList(listId, currPos, nextPos)
        toggleMode()
    }

    const getPagesArr = () => {
        let pagesArr = []
        for (let i = 1; i <= props.listsCount; i++) {
            const reorder = () => reorderOnClick(i)
            const numberStyle = (i-1) !== props.order 
                ? styles.orderNumber : styles.orderNumber+' '+styles.active
            const page = <div className={numberStyle} onClick={reorder} key={i}>{i}</div>
            pagesArr.push(page)
        }
        return pagesArr
    }

    const pagesArr = getPagesArr()

    return(
    <div className={styles.listOrder} onClick={toggleMode}>
        {props.order+1+'/'+props.listsCount}
        { orderMode
            && < div className={styles.orderBox}>{pagesArr}</div>
        }
    </div>
    )
}

export default connect(null, { reorderList })(ListOrder)