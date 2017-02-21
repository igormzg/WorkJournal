import React from 'react';
import './ProjectMenu.less';

const ProjectMenu = React.createClass({
    handleProjectChange: function (event) {
        let newCurrentProject = this.props.projects.filter(function (project){
            return project._id == event.currentTarget.id;
        }) 
        console.log(newCurrentProject);
        this.props.currentProject = newCurrentProject;
    },

    render () {
        return (
            <lu className="project-menu">
                {
                    this.props.projects.map(project =>
                        <li 
                            key={project._id} 
                            id={project._id}
                            className={this.props.currentProject._id == project._id ? "active" : null}
                            onClick={this.handleProjectChange}
                        >
                            {project.name}
                        </li>
                    )
                }
            </lu>
        );
    }
});

export default ProjectMenu;