import React from 'react';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

const NotesTab = React.createClass({
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
            </div>
        );
    }
});

export default NotesTab;