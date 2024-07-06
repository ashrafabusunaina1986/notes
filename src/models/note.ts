import { model, models, Schema } from "mongoose";

const noteSchema = new Schema({
  title: String,
  text: String,
});

const Note = models.Notes || model("Notes", noteSchema);

export default Note;
