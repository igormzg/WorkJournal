import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
const PROJECTS_UPDATE_EVENT = 'PROJECTS_UPDATE_EVENT';
const PROJECT_CREATE_EVENT = 'PROJECTS_CREATE_EVENT';

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

    emitChange: function() {
        this.emit(PROJECTS_UPDATE_EVENT);
    },

    emitCreate: function () {
        this.emit(PROJECT_CREATE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(PROJECTS_UPDATE_EVENT, callback);
    },

    addCreateListener: function (callback) {
        this.on(PROJECT_CREATE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(PROJECTS_UPDATE_EVENT, callback);
    },

    removeCreateListener: function(callback) {
        this.removeListener(PROJECT_CREATE_EVENT, callback);
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
            ProjectStore.emitChange();
            break;
        }

        case AppConstants.CREATE_PROJECTS_SUCCESS: {
            ProjectStore.newProject = action.project;
            ProjectStore.emitCreate();
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default {
    NotesStore: TasksStore,
    ProjectStore: ProjectStore
}
