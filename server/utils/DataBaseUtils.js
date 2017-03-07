import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Note';
import '../models/JournalRecord';
import '../models/Project';

const Note = mongoose.model('Note');
const JournalRecord = mongoose.model('JournalRecord');
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

export function updateProject(data){
        var query = {'_id': data._id};
        return Project.findOneAndUpdate(query, data, {upsert:true});
}

export function deleteProject(id) {
    return Project.findById(id).remove();
}

//export function 

export function createrProjectJournalRecord (data) {
    const projectId = data.projectId;
    const journal = new JournalRecord ({
        task        : data.task,
        comment     : data.comment,
        time        : data.time,
        date        : data.date,
        isBTSPosted : data.isBTSPosted,
        isPLPosted  : data.isPLPosted    
    });
    return Project.update(
        { '_id':  mongoose.Types.ObjectId(projectId) }, 
        { $push: { journal: journal} }
    );
}

export function listProjectJournalRecords (projectId) {    
    return Project.find(
        { '_id': mongoose.Types.ObjectId(projectId)}, 
        {'journal': true});
}


