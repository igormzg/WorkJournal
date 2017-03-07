import React from 'react';

import Store from '../../stores/NotesStore';
import ProjectActions from '../../actions/ProjectsActions';
import ProjectMenu from './ProjectMenu.jsx';
import ProjectBody from './ProjectBody.jsx';

import './ProjectContainer.less';

const ProjectContainer = React.createClass({
    getInitialState() {
        return {
             currentProject: Store.ProjectStore.getCurrentProject()
        };
    },

    componentDidMount() { 
        Store.ProjectStore.addChangeCurrentListener(this._onCurrentProjectChange);
    },

    componentWillUnmount() {
        Store.ProjectStore.removeChangeCurrentListener(this._onCurrentProjectChange);
    },

    _onCurrentProjectChange(project) {
        this.setState({
                currentProject: Store.ProjectStore.getCurrentProject()
        });
    },

    render() {
        return (
            <div>
                <div className="row project-header">
                    <div className="column medium-3 height-full">
                        <ProjectMenu />
                    </div>
                    <div className="column medium-9">
                        <label>Project:</label>
                        <span>{this.state.currentProject ? this.state.currentProject.name : null}</span>
                        <label>Description:</label>
                        <span className="multiline-text">{this.state.currentProject ? this.state.currentProject.description : null}</span>
                    </div>
                </div>
                <hr/>
                <div className="row project-body">
                    <ProjectBody />
                </div>
            </div>
        )
    }
})

export default ProjectContainer;