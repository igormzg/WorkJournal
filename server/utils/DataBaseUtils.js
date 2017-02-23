import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Note';
import '../models/Project';

const Note = mongoose.model('Note');
const Project = mongoose.model('Project');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listNotes(id) {
    return Note.find();
}

export function createNote(data) {
    const note = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });

    return note.save();
}

export function deleteNote(id) {
    return Note.findById(id).remove();
}

export function listProjects() {
    return Project.find();
}

export function createProject(data){
    const project = new Project({
       name: data.name,
       description: data.description 
    });
    return project.save();
}

export function updateProject(data, next){

    Project.findById(data._id, function (error, project) {
        if (error || !project)
            next(null, error);
        Project.update(data, function (error, project) {
            if (error)
                next(null, error);
            else
                next(project);
        });
    });
}

export function deleteProject(id) {
    return Project.findById(id).remove();
}
