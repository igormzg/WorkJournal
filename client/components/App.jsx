import React from 'react';

import Store from '../stores/NotesStore';
import NotesActions from '../actions/NotesActions';
import ProjectActions from '../actions/ProjectsActions';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';
//import ProjectSelect from './ProjectSelect.jsx';
import ProjectMenu from './ProjectMenu.jsx';

import './App.less';

function getStateFromFlux() {
    return {
        isLoading: Store.NotesStore.isLoading(),
        notes: Store.NotesStore.getNotes()
    };
}

const App = React.createClass({
    getInitialState() {
        return {
            isLoading: Store.NotesStore.isLoading(),
            notes: Store.NotesStore.getNotes(),
            projects: Store.ProjectStore.getProjects()
        };
    },

    componentWillMount() {
        NotesActions.loadNotes();
        ProjectActions.loadProjects();
    },

    componentDidMount() {
        Store.NotesStore.addChangeListener(this._onChange);        
        Store.ProjectStore.addChangeListener(this._onProjectChange);
    },

    componentWillUnmount() {
        Store.NotesStore.removeChangeListener(this._onChange); 
        Store.ProjectStore.removeChangeListener(this._onProjectChange);
    },

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.id);
    },

    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    },

    render() {
        return (
            <div className='App'>
                <h2 className='App__header'>NotesApp</h2>
                <ProjectMenu projects={this.state.projects} currentProject={this.state.projects[0]} />
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    },

    _onProjectChange() {
        this.setState(function () {
           return {
                isLoading: Store.ProjectStore.isLoading(),
                projects: Store.ProjectStore.getProjects()
            };
        });
    }
});

export default App;
