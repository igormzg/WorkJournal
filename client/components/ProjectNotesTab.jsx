import React from 'react';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

const ProjectNotesTab = React.createClass({
    handleNoteAdd: function (newNote) {
        
    },

    render() {
        return (
            <div className='row'>
                <div className='column medium-4'>
                    <h5 className='text-center'>New Note</h5>
                    <NoteEditor />
                </div>
                <div className='column medium-8'>
                    <NotesGrid />
                </div>
                {/*<NotesGrid notes={this.props.currentProject} onNoteDelete={this.handleNoteDelete} />*/}
            </div>
        );
    }
});

export default ProjectNotesTab;