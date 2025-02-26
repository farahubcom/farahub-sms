const mongoose = require("mongoose");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;


const WorkspaceSchema = new Schema({
    smsCharge: { type: Number, default: 0 }
}, { timestamps: true });

WorkspaceSchema.plugin(mongooseLeanVirtuals);

module.exports = WorkspaceSchema;