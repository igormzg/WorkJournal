import React from 'react';

import Store from '../stores/NotesStore';
import NotesActions from '../actions/NotesActions';
import ProjectActions from '../actions/ProjectsActions';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';
import ProjectContainer from './ProjectContainer.jsx';

import './App.less';

function getStateFromFlux() {
    return {
        isLoading: Store.NotesStore.isLoading(),
        notes: Store.NotesStore.getNotes()
    };
}

const App = React.createClass({
    // getInitialState() {
    //     return {
    //         isLoading: Store.NotesStore.isLoading(),
    //         notes: Store.NotesStore.getNotes()
    //     };
    // },

    // componentWillMount() {
    //     NotesActions.loadNotes();
    // },

    // componentDidMount() {
    //     Store.NotesStore.addChangeListener(this._onChange);        
    // },

    // componentWillUnmount() {
    //     Store.NotesStore.removeChangeListener(this._onChange); 
    // },

    // handleNoteDelete(note) {
    //     NotesActions.deleteNote(note.id);
    // },

    // handleNoteAdd(noteData) {
    //     NotesActions.createNote(noteData);
    // },

    render() {
        return (
            <div className='App'>
                <h2 className='App__header'>Projects App</h2>
                <ProjectContainer />
                {/*<NoteEditor onNoteAdd={this.handleNoteAdd} />*/}
                {/*<NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />*/}
            </div>
        );
    },

    // _onChange() {
    //     this.setState(getStateFromFlux());
    // },

    // _onProjectChange() {
    //     this.setState(function () {
    //        return {
    //             isLoading: Store.ProjectStore.isLoading(),
    //         };
    //     });
    // }
});

export default App;
