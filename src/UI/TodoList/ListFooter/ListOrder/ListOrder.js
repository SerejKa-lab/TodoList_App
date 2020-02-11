import React from 'react'
import styles from './ListOrder.module.css'
import { connect } from 'react-redux'
import { reorderList } from '../../../../Redux/reducer'
import onClickOutside from 'react-onclickoutside'
import { compose } from 'redux'


class ListOrder extends React.Component {

    // configure the onClickOutside click handler
    handleClickOutside = () => this.setState({ showOrder: false })

    state = {
        showOrder: false
    }

    toggleMode = () => this.setState({ showOrder: !this.state.showOrder })

    reorderOnClick = (nextPos) => {
        const { listId, order: currPos, reorderList } = this.props
        reorderList(listId, currPos, nextPos)
        this.toggleMode()
    }


    render() {

        const { listsCount, order } = this.props

        const getPagesArr = () => {
            let pagesArr = []
            for (let i = 1; i <= listsCount; i++) {
                const reorder = () => this.reorderOnClick(i)
                const numberStyle = (i - 1) !== order
                    ? styles.orderNumber : styles.orderNumber + ' ' + styles.active
                const page = <button className={numberStyle} onClick={reorder} key={i}>{i}</button>
                pagesArr.push(page)
            }
            return pagesArr
        }
        const pagesArr = getPagesArr()

        const orderBtnStyle = this.state.showOrder ? styles.pressed : ''

        return (
            <div className={styles.listOrder}>
                <button className={orderBtnStyle} onClick={this.toggleMode}>
                    {order + 1 + '/' + listsCount}
                </button>
                {this.state.showOrder
                    && < div className={styles.orderBox}>{pagesArr}</div>
                }
            </div>
        )
    }
}

export default compose(
    connect(null, { reorderList }),
    onClickOutside
)(ListOrder)