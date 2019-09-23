import React, { Component } from 'react';
import './Header.css';

import edit from './../icons/edit-regular.svg';
import lock from './../icons/lock-solid.svg';
import trash from './../icons/trash-alt-regular.svg';
import column from './../icons/columns-solid.svg';
import blocks from './../icons/th-large-solid.svg';
import check from './../icons/check-circle-regular.svg';

class Header extends Component {

    // Search Bar
    searchbarOnChange = (e) => {
        this.props.searchbarOnChange(e.target.value);
    }

    searchbarOnEnterKeyUp = (e) => {
        if (e.key === "Enter") {
            let notes = this.props.filterNotes();
            if (notes.length === 0) {
                this.props.searchbarOnEnterKeyUp();
            } 
        }
    }

    onLockHandler = () => {
        let creds = prompt("type password here...");
        this.props.lockBtnHandler(creds);
    }

    // Buttons
    columnBtnHandler = () => this.props.columnBtnHandler();

    blocksBtnHandler = () => { }

    trashBtnHandler = () => this.props.trashBtnHandler();

    newBtnHandler = () => this.props.newBtnHandler();

    checkBtnHandler = () => { }

    lockBtnHandler = () => this.onLockHandler();

    render() {
        return (
            <div className="Header">
                <div className="nav-wrapper">
                    <button
                        onClick={this.columnBtnHandler}
                        className="nav-btns"
                    >
                        <img src={column} alt="toggle sidebar" />
                    </button>


                    <button
                        disabled={true}
                        onClick={this.blocksBtnHandler}
                        className="nav-btns"
                    >
                        <img src={blocks} alt="toggle notes view" />
                    </button>

                    <button
                        onClick={this.trashBtnHandler}
                        className="nav-btns"
                    >
                        <img src={trash} alt="delete note" />
                    </button>

                    <button
                        onClick={this.newBtnHandler}
                        className="nav-btns"
                    >
                        <img src={edit} alt="new note" />
                    </button>

                    <button
                        disabled={true}
                        onClick={this.checkBtnHandler}
                        className="nav-btns"
                    >
                        <img src={check} alt="checklist" />
                    </button>

                    <button
                        onClick={this.lockBtnHandler}
                        className="nav-btns"
                    >
                        <img src={lock} alt="lock note" />
                    </button>


                    <input type="text" className="search-bar"
                        onChange={this.searchbarOnChange}
                        onKeyUp={this.searchbarOnEnterKeyUp}
                        placeholder="Search"
                    />
                </div>
            </div>
        )
    }
}

export default Header;