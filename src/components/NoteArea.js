import React, {Component} from 'react';
import './NoteArea.css';

class NoteArea extends Component {
    
    onChangeHandler = (e) => {
        let note = this.props.note
        note.title = e.target.value.slice(0,20);
        note.content = e.target.value;

        if (note.title === "") {
            note.title = "Untitled";
        }

        let lines = note.title.split("\n")
        if (lines.length > 0) {
            note.title = lines[0];
        }
        this.props.onTextAreaUpdate(note);
    }

    render() {
        return (
            <div className={this.props.extended ? "note-area":"note-area-ext"}>
                <textarea 
                    onChange={this.onChangeHandler}
                    value={this.props.note.content}
                    placeholder={this.props.note.content === "" ? (
                        "Start typing here..."
                    ):( 
                        ""
                    )}
                />
            </div>
        )
    }
}

export default NoteArea;
