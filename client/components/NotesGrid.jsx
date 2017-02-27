import React from 'react';
import Note from './Note.jsx';
import Store from '../stores/NotesStore.js';
import ProjectActions from '../actions/ProjectsActions';
import Masonry from 'react-masonry-component';

import './NotesGrid.less';

const NotesGrid = React.createClass({
    getInitialState() {
        return {
            project: Store.ProjectStore.getCurrentProject()
        };
    },

    componentDidMount() { 
        Store.ProjectStore.addChangeCurrentListener(this._onCurrentProjectChange);
    },

    componentWillUnmount() {
        Store.ProjectStore.removeChangeCurrentListener(this._onCurrentProjectChange);
    },

    _onCurrentProjectChange: function () {
        this.setState({ project: Store.ProjectStore.getCurrentProject() });
    },

    handleNoteDelete: function (note) {
        var project = this.state.project;
        var validNotes = project.notes.filter(data => {return data._id != note._id});
        project.notes = validNotes;
        ProjectActions.updateProject(project);
    },

    render() {
        const masonryOptions = {
            itemSelector: '.Note',
            //columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };

        return (
            <Masonry
                className='NotesGrid'
                options={masonryOptions}
            >
                {
                    this.state.project && this.state.project.notes ?
                        this.state.project.notes.map(note =>
                            <Note
                                key={note._id}
                                title={note.title}
                                onDelete={this.handleNoteDelete.bind(null, note)}
                                color={note.color}
                            >
                                {note.text}
                            </Note>
                        ) : null
                }
            </Masonry>
        );
    }
});

export default NotesGrid;
