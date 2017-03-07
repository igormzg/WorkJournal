import mongoose from "mongoose";

const Schema = mongoose.Schema;
const NoteSchema = mongoose.model('Note').schema;
const JournalRecordSchema = mongoose.model('JournalRecord').schema;

const ProjectSchema = new Schema({
    name        : { type: String, required: true },
    description : { type: String },
    notes       : { type: [NoteSchema] },
    journal     : { type: [JournalRecordSchema] }
});

mongoose.model('Project', ProjectSchema);
