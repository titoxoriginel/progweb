import { Schema, model } from 'mongoose';

// Setup schema
const userModel = new Schema({
    email: { type: String },
    password:  { type: String }
});

export default model('User', userModel);




