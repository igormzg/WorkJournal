import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const NoteActions = {
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
};

export default NoteActions;
