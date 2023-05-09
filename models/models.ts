import { Schema, model, models } from "mongoose";

const Schemas = new Schema({
    department: String,
    score: Number,
    arrayDepartment: Array,
    arrayAdvice: Array
})

const Note = models.smh || model("smh", Schemas)

export default Note;