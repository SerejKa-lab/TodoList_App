import React from 'react';
import { connect } from 'react-redux';
import { api } from './api';
import { deleteList, updateListTitle } from './reducer';
import Preloader from './Preloader/Preloader';


class ListTitle extends React.Component {

    state = { 
        taskLoading: false,
        editMode: false,
        title: '',
        inputError: false
     }

     deleteList = () => {
        this.setState({ inProgress: true });
        api.deleteList(this.props.listId)
            .then(() => {
                this.props.deleteList(this.props.listId);
                this.setState({ inProgress: false })
            })
    }

     setEditMode = () => this.setState({ editMode: true, title: this.props.title })
     setDisplayMode =() => {
         if (this.state.inputError) this.setState({ inputError: false })
         this.setState({ editMode: false })
     }
 
     editListTitle = (e) => {
         const newTitle = e.currentTarget.value;
         if (this.state.inputError) this.setState({ inputError: false });
         if (newTitle.trim() === '' || newTitle.length > 100) {
             this.setState({ title: newTitle, inputError: true })
         } else this.setState({ title: newTitle })
     }
 
     setTitleOnKey = (e) => {
         const title = e.currentTarget.value;
         if (e.key === 'Enter' && !this.state.inputError) {
             this.setDisplayMode()
             this.updateListTitle( title );
         }
         if (e.keyCode === 27) {
             this.setDisplayMode()
             if (this.state.inputError) this.setState({ inputError: false })
         }
     }
 
     updateListTitle = (title) => {
         const listId = this.props.listId;
         this.setState({ updateInProgress: true });
         api.updateListTitle(listId, title)
             .then(Response => {
                 if (Response.data.resultCode === 0) {
                     this.props.updateListTitle(listId, title)
                     this.setState({ updateInProgress: false })
                 }
         })
     }

    render() {
        if (this.state.editMode) {
            return (
                <div className='list_header_title__input'>
                    <input type="text"
                        value={this.state.title}
                        className={this.state.inputError ? 'error' : ''}
                        onChange={this.editListTitle}
                        autoFocus={true}
                        onBlur={this.setDisplayMode}
                        onKeyDown={this.setTitleOnKey} />
                    <button className='delete_list' onClick={this.deleteList}><i className="fa fa-close"></i></button>
                </div>
            )
        } else return (
            <div className='list_header_title'>
                <span onClick={this.setEditMode}>{this.props.title} &nbsp;</span>
                <button className='delete_list' onClick={this.deleteList}><i className="fa fa-close"></i></button>
                {this.state.inProgress && <Preloader />}
            </div>
        )
    }
}



export default connect(null, { deleteList, updateListTitle })(ListTitle)