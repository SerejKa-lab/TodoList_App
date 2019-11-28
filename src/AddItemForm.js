import React from 'react';

class AddItemForm extends React.Component {

    state = {
        inputError : false,
        itemTitle: ''
    }

    setItemTitle = (e) => {
        if ( this.state.inputError ) this.setState( { inputError : false } );
        this.setState ( {itemTitle: e.currentTarget.value} );
    }

    addItem = () => {
        if ( this.state.itemTitle === '') this.setState( { inputError : true } )
        else {
            this.props.addItem( this.state.itemTitle, this.props.listId );
            this.setState( { itemTitle : '' } )
        }
    }

    render() {
        return (
            <div className="todoList-newTaskForm">
                <input
                    className={this.state.inputError ? 'error' : ''}
                    onChange={this.setItemTitle}
                    onKeyPress={(e) => { if (e.key === 'Enter') this.addItem() }}
                    type="text" placeholder="Add item" value={this.state.itemTitle} />
                <button onClick={this.addItem} >Add</button>
            </div>
        )
    }
}

export default AddItemForm;