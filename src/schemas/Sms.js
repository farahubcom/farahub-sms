const mongoose = require("mongoose");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;


const SmsSchema = new Schema({
    /**
     * Receiver person number
     * 
     * @var string
     */
    receiver: { type: String, required: true },

    /**
     * The content that sent
     * 
     * @var string
     */
    content: { type: String, required: true },

    /**
     * Total parts of the sms
     * 
     * @var number
     */
    totalParts: Number,

    /**
     * Sms cost
     * 
     * @var Number
     */
    cost: Number,

    /**
     * 
     */
    reference: { type: ObjectId, refPath: 'referenceModel' },

    /**
     * 
     */
    referenceModel: { type: String },

    /**
     * Time that message sent
     * 
     * @var Date
     */
    sentAt: { type: Date, required: true },

    /**
     * Extra data provided by the provider
     * 
     * @var Object
     */
    providerData: Schema.Types.Mixed,
}, {

    /**
     * Name of the collection
     * 
     * @var string
     */
    collection: "sms:sms",
});

SmsSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});

SmsSchema.plugin(mongooseLeanVirtuals);

module.exports = SmsSchema;