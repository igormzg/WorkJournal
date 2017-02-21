import React from 'react';

import Store from '../stores/NotesStore';
import ProjectActions from '../actions/ProjectsActions';

const ProjectTab = React.createClass({
    getInitialState() {
        let projects = Store.ProjectStore.getProjects();
        let currentProject = projects && projects[0] ? projects[0] : null;
        return {
            projects: Store.ProjectStore.getProjects(),
            currentProject: currentProject
        };
    },

    componentWillMount() {
        ProjectActions.loadProjects();
    },

    componentDidMount() { 
        Store.ProjectStore.addChangeListener(this._onProjectsChange);
    },

    componentWillUnmount() {
        Store.ProjectStore.removeChangeListener(this._onProjectsChange);
    },

    _onProjectsChange() {
        this.setState(function () {
           return {
                isLoading: Store.ProjectStore.isLoading(),
                projects: Store.ProjectStore.getProjects()
            };
        });
    },

    render() {
        return (
            <ProjectMenu projects={this.state.projects} currentProject={this.state.currentProject}/>
        )
    }
})