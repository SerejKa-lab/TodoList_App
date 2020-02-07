import React from 'react';
import styles from './ListTitle.module.css'
import { connect } from 'react-redux';
import { deleteList, updateListTitle } from '../../../../Redux/reducer';
import Preloader from '../../../Preloader/Preloader';


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
        if (this.state.inputError) this.setState({ inputError: false });
        if (newTitle.trim() === '' || newTitle.length > 100 || newTitle.match(/%/)) {
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
            fill: 'rgb(143, 59, 26)', height: '10px', position: 'absolute', bottom: '-12px', right: '43%'
        }

        if (this.state.editMode) {
            return (
                <div className={styles.list_header_title__input}>
                    <input type="text"
                        value={this.state.title}
                        className={this.state.inputError ? styles.error : ''}
                        onChange={this.editListTitle}
                        autoFocus={true}
                        onBlur={this.setDisplayMode}
                        onKeyDown={this.setTitleOnKey} />
                </div>
            )
        } else return (
            <div className={styles.list_header_title}>
                <span onClick={this.setEditMode}>{this.props.title}</span>
                {(this.props.listDeliting || this.props.titleUpdating)
                    && <Preloader {...loaderStyle} />}
            </div>
        )
    }
}


export default connect(null, { deleteList, updateListTitle })(ListTitle)