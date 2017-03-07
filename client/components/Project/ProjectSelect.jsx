import React from 'react';

const ProjectSelect = React.createClass({
    handleProjectChange: function (event) {
        console.log(event.currentTarget.value);
    },

    render () {
        return (
            <div>
                <input type="text" list="projects" onChange={this.handleProjectChange}/>
                <datalist id="projects">
                    {
                        this.props.projects.map(project =>
                            <option key={project._id} value={project.name}/>
                        )
                    }
                </datalist>
            </div>
        );
    }
});

export default ProjectSelect;