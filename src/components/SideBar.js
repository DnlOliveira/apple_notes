import React, {Component} from 'react';
import './SideBar.css';


class SideBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let notes = this.props.filterNotes()

        return (
            <div className={this.props.isShowing ? "side-bar":"side-bar-hidden"}>
                {this.props.isShowing ? notes.map((note, i) => (
                    <button key={i}
                        className={note.key === this.props.selectedNote.key ? (
                            `note-block selected`
                        ):(
                            `note-block not-selected`
                        )}
                        onClick={() => this.props.setSelectedNote(note)}
                    >
                        <h1>{note.title}</h1>
                    </button>
                )) : <div></div>}
            </div>
        )
    }
}

export default SideBar;
