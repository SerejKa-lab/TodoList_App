import React from 'react';

class AddItemForm extends React.Component {

    state = {
        inputError: false,
        itemTitle: ''
    }

    setItemTitle = (e) => {
        if (this.state.inputError) this.setState({ inputError: false });
        this.setState({ itemTitle: e.currentTarget.value }, () => {
            if (this.state.itemTitle === '' || this.state.itemTitle.length > 100)
                this.setState({ inputError: true })
        });
    }

    addItem = () => {
        if (this.state.itemTitle === '') this.setState({ inputError: true })
        else
            if (!this.state.inputError) {
                this.props.addItem(this.state.itemTitle, this.props.listId);
                this.setState({ itemTitle: '' })
            }
    }

    actionOnBlur = () => {
        if (this.state.inputError && this.state.itemTitle.length <= 100) this.setState({ inputError: false })
    }

    actionOnKey = (e) => { 
        if (e.key === 'Enter') this.addItem()
        if ( e.keyCode === 27 ) {
            this.setState({ itemTitle: '', inputError: false })
        }
    }

    render() {
        return (
            <div className="todoList-newTaskForm">
                <input
                    className={this.state.inputError ? 'error' : ''}
                    onChange={this.setItemTitle}
                    onKeyDown={this.actionOnKey}
                    onBlur={this.actionOnBlur}
                    autoFocus={true}
                    type="text" placeholder={this.props.placeholder} value={this.state.itemTitle} />
                <button onClick={this.addItem} >Add</button>
            </div>
        )
    }
}

export default AddItemForm;