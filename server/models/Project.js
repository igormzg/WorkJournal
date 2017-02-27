import mongoose from "mongoose";

const Schema = mongoose.Schema;
const NoteSchema = mongoose.model('Note').schema;

const ProjectSchema = new Schema({
    name        : { type: String, required: true },
    description : { type: String },
    notes       : { type: [NoteSchema] }
});

mongoose.model('Project', ProjectSchema);
