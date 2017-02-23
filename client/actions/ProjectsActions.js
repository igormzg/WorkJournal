import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const ProjectActions = {
    loadProjects() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_PROJECTS_REQUEST
        });

        api.projects.getProjects()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PROJECTS_SUCCESS,
                projects: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PROJECTS_FAIL,
                error: err
            })
        );
    },

    createProject(project) {
        api.projects.createProject(project)
        .then((resp) => {
            this.loadProjects()
            AppDispatcher.dispatch({
                type: Constants.CREATE_PROJECTS_SUCCESS,
                project: resp.data
            })
        })
        .catch(err =>
            console.error(err)
        );
    },

    deleteProject(projectId) {
        api.projects.deleteProject(projectId)
        .then(() => {
            this.loadProjects()
        })
        .catch(err =>
            console.error(err)
        );
    },

    updateProject(project) {
        api.projects.updateProject(project)
        .then(() => {
            this.loadProjects()
        })
        .catch(err =>
            console.error(err)
        );
    },

    changeCurrentProject (project) {
        AppDispatcher.dispatch({
                type: Constants.CHANGE_CURRENT_PROJECT,
                project: project
            })
    }
};

export default ProjectActions;
