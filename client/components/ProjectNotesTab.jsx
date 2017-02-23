import React from 'react';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

const ProjectNotesTab = React.createClass({
    handleNoteAdd: function (newNote) {
        
    },

    render() {
        return (
            <div>
                <NoteEditor />
                {/*<NotesGrid notes={this.props.currentProject} onNoteDelete={this.handleNoteDelete} />*/}
            </div>
        );
    }
});

export default ProjectNotesTab;