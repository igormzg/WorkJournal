import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name        : { type: String, required: true },
    description : { type: String },
    notes       : { type: [Schema.Types.ObjectId]}
});

mongoose.model('Project', ProjectSchema);
