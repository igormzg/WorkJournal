import React from 'react'

import ProjectsActions from '../actions/ProjectsActions'

React.createClass({
    getInitialState() {
        return {
            name: '',
            description: '',
        };
    },

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    },

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    },

    handleProjectAdd() {
        const newProject = {
            name: this.state.name,
            description: this.state.description,
            color: this.state.color
        };

        //this.props.onNoteAdd(newNote);
            //handleNoteAdd(noteData) 
        ProjectsActions.createProject(newProject);
        this.setState({ name: '', description: '', color: '#FFFFFF' });
    },
    render () {
        return (
            <div>
                <label>Name:</label>
                <input type="text" value="{this.state.name}"/>
                <label>Description:</label>
                <input type="text" value="{this.state.}"/>
            </div>
        );
    }
});