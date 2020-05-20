import React from 'react';
import styles from './ListTitle.module.css'
import { connect } from 'react-redux';
import { updateListTitle } from '../../../../Redux/appReducer';
import Preloader from '../../../Preloader/Preloader';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Tooltip from '../../../Tooltip/Tooltip';


class ListTitle extends React.Component {

    state = {
        editMode: false,
        title: '',
        inputError: false,
    }

    updateListTitle = (title) => {
        if (!title.match(/%/)) {
            this.props.updateListTitle(this.props.listId, title)
            if (this.props.history.location.pathname !== '/') {
                this.props.history.push(`/${title.replace(/\s|\?|#/g, '-')}`)
            }
        }
    }

    setEditMode = () => this.setState({ editMode: true, title: this.props.title })
    setDisplayMode = () => {
        if (this.state.inputError) this.setState({ inputError: false })
        this.setState({ editMode: false })
    }

    editListTitle = (e) => {
        const newTitle = e.currentTarget.value;
        const equalTitles = this.props.listTitles.find((el) => {
            return (el.title.toLowerCase() === newTitle.toLowerCase() && el.id !== this.props.listId)
        })
        
        if (this.state.inputError) this.setState({ inputError: false });
        if (newTitle.trim() === '' || newTitle.length > 100 
            || newTitle.match(/%/) || equalTitles) {
            this.setState({ title: newTitle, inputError: true })
        } else this.setState({ title: newTitle })
    }

    setTitleOnKey = (e) => {
        const title = e.currentTarget.value;
        if (e.key === 'Enter' && !this.state.inputError) {
            this.setDisplayMode()
            this.updateListTitle(title);
        }
        if (e.keyCode === 27) {
            this.setDisplayMode()
            if (this.state.inputError) this.setState({ inputError: false })
        }
    }


    render() {

        const loaderStyle = {
            fill: 'rgb(85, 47, 11)', height: '10px', position: 'absolute', bottom: '-12px', right: '43%'
        }

        const listTitleHint = 
            'Please, check the % sign is missing and enter a unique title between 1 and 100 chars long, or press "Esc" to exit'

        if (this.state.editMode) {
            return (
                <div className={styles.list_title__input}>
                    <input type="text"
                        value={this.state.title}
                        className={this.state.inputError ? styles.error : ''}
                        onChange={this.editListTitle}
                        autoFocus={true}
                        onBlur={this.setDisplayMode}
                        onKeyDown={this.setTitleOnKey} />
                    
                    { this.state.inputError && <Tooltip hint={listTitleHint} /> }
                </div>
            )
        } else return (
            <div className={styles.list_title}>
                <span onClick={this.setEditMode}>{this.props.title}</span>
                {(this.props.listDeliting || this.props.titleUpdating)
                    && <Preloader {...loaderStyle} />}
            </div>
        )
    }
}


export default compose(
    connect(null, { updateListTitle }),
    withRouter
)(ListTitle)