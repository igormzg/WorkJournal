import React from 'react';

import Store from '../stores/NotesStore';
import ProjectActions from '../actions/ProjectsActions';
import ProjectMenu from './ProjectMenu.jsx';

import './ProjectContainer.less';

const ProjectContainer = React.createClass({
    getInitialState() {
        let projects = Store.ProjectStore.getProjects();
        let currentProject = projects && projects.length > 0 ? projects[0] : null;
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

    handleProjectChange(project) {
        this.setState(function () {
            return {
                currentProject: project
            };
        });
    },

    _onProjectsChange() {
        let currentProject = this.state.currentProject ? this.state.currentProject : Store.ProjectStore.getProjects()[0];
        this.setState(function () {
           return {
                isLoading: Store.ProjectStore.isLoading(),
                projects: Store.ProjectStore.getProjects(),
                currentProject: currentProject
            };
        });
    },

    render() {
        return (
            <div>
                <div className="row project-header">
                    <div className="column medium-3 height-full">
                        <ProjectMenu projects={this.state.projects} currentProject={this.state.currentProject} onProjectChange={this.handleProjectChange}/>
                    </div>
                    <div className="column medium-9">
                        <label>Project:</label>
                        <span>{this.state.currentProject ? this.state.currentProject.name : null}</span>
                        <label>Description:</label>
                        <span>{this.state.currentProject ? this.state.currentProject.description : null}</span>
                    </div>
                </div>
                <hr/>
                <div className="row project-body"></div>
            </div>
        )
    }
})

export default ProjectContainer;