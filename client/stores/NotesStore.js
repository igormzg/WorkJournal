import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import ProjectActions from '../actions/ProjectsActions';

const CHANGE_EVENT = 'change';
const PROJECTS_UPDATE_EVENT = 'PROJECTS_UPDATE_EVENT';
const PROJECT_CREATE_EVENT = 'PROJECTS_CREATE_EVENT';
const CHANGE_CURRENT_PROJECT_EVENT = 'CHANGE_CURRENT_PROJECT_EVENT';

let _notes = [];
let _loadingError = null;
let _isLoading = true;

function formatNote(note) {
    return {
        id: note._id,
        title: note.title,
        text: note.text,
        color: note.color || '#ffffff',
        createdAt: note.createdAt
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getNotes() {
        return _notes;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

const ProjectStore = Object.assign({}, EventEmitter.prototype, {
    projects: [], 

    isLoading() {
        return _isLoading;
    },

    getProjects() {
        return this.projects;
    },

    getNewProject() {
        return this.newProject;
    },

    getCurrentProject() {
        return this.currentProject;
    },

    emitChange: function() {
        this.emit(PROJECTS_UPDATE_EVENT);
    },

    emitCreate: function () {
        this.emit(PROJECT_CREATE_EVENT);
    },

    emitChangeCurrentProject: function () {
        this.emit(CHANGE_CURRENT_PROJECT_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(PROJECTS_UPDATE_EVENT, callback);
    },

    addCreateListener: function (callback) {
        this.on(PROJECT_CREATE_EVENT, callback);
    },

    addChangeCurrentListener: function(callback){
        this.on(CHANGE_CURRENT_PROJECT_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(PROJECTS_UPDATE_EVENT, callback);
    },

    removeCreateListener: function(callback) {
        this.removeListener(PROJECT_CREATE_EVENT, callback);
    },

    removeChangeCurrentListener: function(callback){
        this.removeListener(CHANGE_CURRENT_PROJECT_EVENT, callback);
    },
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_NOTES_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_SUCCESS: {
            _isLoading = false;
            _notes = action.notes.map( formatNote );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_PROJECTS_SUCCESS: {
            ProjectStore.projects = action.projects;
            if(!ProjectStore.currentProject && ProjectStore.projects && ProjectStore.projects.length > 0){
                ProjectStore.currentProject = ProjectStore.projects[0];                
                ProjectStore.emitChangeCurrentProject();
            }
            else if(ProjectStore.currentProject && ProjectStore.projects){
                ProjectStore.currentProject = ProjectStore.projects.find(data => data._id == ProjectStore.currentProject._id); 
                ProjectStore.emitChangeCurrentProject();
            }
            ProjectStore.emitChange();
            break;
        }

        case AppConstants.CREATE_PROJECTS_SUCCESS: {
            ProjectStore.newProject = action.project;
            ProjectStore.emitCreate();
        }

        case AppConstants.CHANGE_CURRENT_PROJECT: {
            ProjectStore.currentProject = action.project;
            ProjectStore.emitChangeCurrentProject();
        }

        default: {
            console.log(`No such handler: ${action.type}`);
        }
    }
});

export default {
    NotesStore: TasksStore,
    ProjectStore: ProjectStore
}
