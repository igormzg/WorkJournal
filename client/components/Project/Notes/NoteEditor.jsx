import React from 'react';

import ProjectActions from '../../../actions/ProjectsActions.js'
import Store from '../../../stores/NotesStore.js';

import ColorPicker from './ColorPicker.jsx';

import './NoteEditor.less';

const NoteEditor = React.createClass({
    getInitialState() {
        return {
            title: '',
            text: '',
            color: '#FFFFFF'
        };
    },

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    },

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    },

    handleColorChange(color) {
        this.setState({ color });
    },

    handleNoteAdd() {
        const newNote = {
            title: this.state.title,
            text: this.state.text,
            color: this.state.color
        };

        let currentProject = Store.ProjectStore.getCurrentProject();
        if(!currentProject.notes){
            currentProject.notes = [];
        }
        currentProject.notes.push(newNote);
        ProjectActions.updateProject(currentProject);

        //this.props.onNoteAdd(newNote);
        this.setState({ text: '', title: '', color: '#FFFFFF' });
    },

    render() {
        return (
            <div className='NoteEditor'>
                <input
                    type='text'
                    className='NoteEditor__title'
                    placeholder='Enter title'
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                />
                <textarea
                    placeholder='Enter note text'
                    rows={5}
                    className='NoteEditor__text'
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div className='NoteEditor__footer'>
                    <ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange}
                    />

                </div>
                <input type="button" className="button small width-full menu-button-margin" value="Create" 
                        disabled={!this.state.text} onClick={ this.handleNoteAdd } />
            </div>
        );
    }
});

export default NoteEditor;
