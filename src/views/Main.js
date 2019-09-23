import React, { Component } from 'react';
import { Note } from '../classes/Note';

// components
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import NoteArea from '../components/NoteArea';

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            selectedNote: {},

            filter: "", // searchbar's current value
            ActiveSidebar: true,
        }
    }

    componentDidMount() {
        // insert default note if none exist
        if (this.state.notes.length === 0) {
            let note = new Note()
            this.setState({
                notes: [note],
                selectedNote: note,
            })
        }
    }

    setNotePasscode = (creds) => {
        let note = this.state.selectedNote;
        note.passcode = creds;
        this.saveUpdatedNote(note);
    }

    toggleSidebar = () => {
        if (this.state.ActiveSidebar === true) {
            this.setState({ActiveSidebar:false})
        } else {
            this.setState({ActiveSidebar:true})
        }       
    }

    // sets the current note on side bar click
    setSelectedNote = (note) => {
        if (note.passcode !== "") {
            let creds = prompt("enter passcode")
            if (creds !== note.passcode) {
                return;
            }
        }
        this.setState({selectedNote:note});
    }

    createNewNote = () => {
        let notes = this.state.notes;
        let note = new Note();
        // note.selected = true;
        notes.push(note);
        this.setState({
            notes: notes,
            selectedNote: note,
            filter: "",
        });
    }

    deleteNote = () => {
        let notes = this.state.notes.filter(note => {
            return note.key !== this.state.selectedNote.key;
        });

        let newSelectedNote

        if (notes.length > 0) {
            newSelectedNote = notes[notes.length-1];
        } else {
            newSelectedNote = new Note();
            notes.push(newSelectedNote);
        }

        this.setState({
            notes: notes,
            selectedNote: newSelectedNote,
        });
    }

    // ** Note Area Handlers

    // save note's state on text area's value change
    saveUpdatedNote = (updatedNote) => {
        let notes = this.state.notes.filter(note => {
            return note.key !== updatedNote.key;
        });

        notes.push(updatedNote);
        this.setState({
            notes: notes,
        });
    }


    // ** Searchbar Handlers ** //

    // filters notes based on current value of state.filter
    filterNotes = () => {
        if (this.state.filter !== "") {
            return this.state.notes.filter(note => {
                let content = note.content.toLowerCase()
                return content.includes(this.state.filter.toLowerCase())
            })
        }
        return this.state.notes
    }

    // updates filter on searchbar change
    setFilter = (filter) => this.setState({ filter: filter });

    render() {
        return (
            <div className="App" >
                <Header
                    searchbarOnChange={this.setFilter}
                    searchbarOnEnterKeyUp={this.createNewNote}

                    columnBtnHandler={this.toggleSidebar}
                    // blocksBtnHandler={}
                    trashBtnHandler={this.deleteNote}
                    newBtnHandler={this.createNewNote}
                    // checkBtnHandler={}
                    lockBtnHandler={this.setNotePasscode}
                    filterNotes={this.filterNotes}
                />

                <SideBar
                    notes={this.state.notes}
                    filterNotes={this.filterNotes}
                    selectedNote={this.state.selectedNote}
                    setSelectedNote={this.setSelectedNote}
                    isShowing={this.state.ActiveSidebar}
                />

                <NoteArea
                    note={this.state.selectedNote}
                    onTextAreaUpdate={this.saveUpdatedNote}
                    extended={this.state.ActiveSidebar}
                />
            </div>
        )
    }
}

export default Main
