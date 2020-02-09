import React from 'react'
import styles from './AddItemForm.module.css'
import Tooltip from './Tooltip';

class AddItemForm extends React.Component {

    state = {
        inputError: false,
        itemTitle: ''
    }

    setItemTitle = (e) => {
        if (this.state.inputError) this.setState({ inputError: false });
        this.setState({ itemTitle: e.currentTarget.value }, () => {
            const newTitle = this.state.itemTitle
            const validationResult = this.props.validationFunc 
                ? this.props.validationFunc(newTitle) : null
            if (validationResult)
                this.setState({ inputError: true })
        });
    }

    addItem = () => {
        if (this.state.itemTitle === '') this.setState({ inputError: true })
        else
            if (!this.state.inputError) {
                this.props.addItem(this.state.itemTitle);
                this.setState({ itemTitle: '' })
            }
    }

    actionOnBlur = () => {
        const validationResult = this.props.validationFunc 
                ? this.props.validationFunc(this.state.itemTitle) : null
        if (this.state.inputError && !validationResult) {
            this.setState({ inputError: false })
        }
    }

    actionOnKey = (e) => { 
        if (e.key === 'Enter') this.addItem()
        if ( e.keyCode === 27 ) {
            this.setState({ itemTitle: '', inputError: false })
        }
    }

    render() {
        return (
            <div className={styles.newItemForm}>
                <input
                    className={this.state.inputError ? styles.error : ''}
                    onChange={this.setItemTitle}
                    onKeyDown={this.actionOnKey}
                    onBlur={this.actionOnBlur}
                    autoFocus={true}
                    type="text" placeholder={this.props.placeholder} value={this.state.itemTitle} />

                <button onClick={this.addItem} >Add</button>
                
                { this.state.inputError && <Tooltip hint={this.props.hint} /> }
            </div>
        )
    }
}

export default AddItemForm;