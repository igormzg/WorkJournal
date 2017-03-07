import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JournalRecordSchema = new Schema({
    task        : { type: String, required: true },
    comment     : { type: String },
    time        : { type: String, required: true },
    date        : { type: Date, required: true },
    isBTSPosted : { type: Boolean },
    isPLPosted  : { type: Boolean }
});

mongoose.model('JournalRecord', JournalRecordSchema);
