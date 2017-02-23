import React from 'react';
import keyMirror from 'keymirror';

import Store from '../stores/NotesStore';
import ProjectActions from '../actions/ProjectsActions';

import './ProjectMenu.less';

const ProjectMenu = React.createClass({  
    menuStates: keyMirror({
        MAIN: null,
        CREATE: null
    }),

    getInitialState() {
        return {
            menuState: this.menuStates.MAIN
        };
    },

    componentDidMount() { 
        Store.ProjectStore.addCreateListener(this._onProjectsCreate);
    },

    componentWillUnmount() {
        Store.ProjectStore.removeCreateListener(this._onProjectsCreate);
    },

    _onProjectsCreate: function () {
        let newProject = Store.ProjectStore.getNewProject();
        //ProjectActions.changeCurrentProject(newProject);
        this.setState({ menuState: this.menuStates.MAIN });
    },

    //Handle click event on menu element
    //change selected application project
    handleProjectChange: function (event) {
        let newCurrentProject = this.props.projects.filter(function (project){
            return project._id == event.currentTarget.id;
        }) 
        ProjectActions.changeCurrentProject(newCurrentProject[0]);
    },

    //This method changed state of menu between 'Main view' and 'Create new project'
    handleToggleMenuStateClick: function (newMenuState) {
        if(newMenuState == this.menuStates.CREATE) {
            this.cleanNewProjectData();
        }
        this.setState({ menuState: newMenuState });
    },

    //change new project model state while user typing name of new project
    handleNewProjectNameChange: function (event) {
        this.setState({ newProject: {
                name: event.target.value,
                description: this.state.newProject.description
            }  
        });
    },

    //change new project model state while user typing description of new project
    handleNewProjectDescriptionChange: function (event) {
        this.setState({ newProject: {
                name: this.state.newProject.name,
                description: event.target.value
            }  
        });
    },
    
    //clean new project data
    cleanNewProjectData: function () {
        this.setState({ newProject: {} });
    },

    //handle click event on 'create new project' button
    handleCreateProjectClick: function(event) {
        ProjectActions.createProject(this.state.newProject);
    },

    //handle click event on 'x' button of menu element
    handleDeleteProjectClick: function(projectId) {
        ProjectActions.deleteProject(projectId);
    },

    render () {
        var menuPartial = null;
        if (this.state.menuState == this.menuStates.MAIN)
        {
            menuPartial = (
                <div className="height-full">
                    <ul className="project-menu">
                        {
                            this.props.projects.map(project =>
                                <li key={project._id} id={project._id} 
                                    className={this.props.currentProject._id == project._id ? "active" : null}
                                    onClick={this.handleProjectChange} >
                                        <span className='delete-icon' 
                                            onClick={() => this.handleDeleteProjectClick(project._id)}> × </span>
                                        {project.name}
                                </li>
                            )
                        }
                    </ul>
                    <input type="button" className="button small width-full menu-button-margin" value="New project" 
                        onClick={() => this.handleToggleMenuStateClick(this.menuStates.CREATE)} />
                </div>
            );
        }
        else if(this.state.menuState == this.menuStates.CREATE)
        {
            menuPartial = (
                <div className="height-full">
                    <h5 className="text-center">New project</h5>
                    <input type='text' placeholder='Enter project name' 
                        onChange={this.handleNewProjectNameChange} />
                    <textarea className="none-resize" placeholder='Enter project description' rows={5}
                        onChange={this.handleNewProjectDescriptionChange}  />
                    <input type="button" className="button small width-full menu-button-margin" value="Create" 
                        onClick={ this.handleCreateProjectClick } />
                    <input type="button" className="button small width-full menu-button-margin" value="Back" 
                        onClick={() => this.handleToggleMenuStateClick(this.menuStates.MAIN)} />
                </div>
            );
        }
        return (
            <div className="width-full height-full">
                {menuPartial}
            </div>
        );
    }
});

export default ProjectMenu;