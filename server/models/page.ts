import { Schema, model } from 'mongoose';

const pageSchema = new Schema(
  {
    id: String,
    title: String,
    img: String,
    pageData: Object,
  },
  { timestamps: true, versionKey: false }
);

export default model('page', pageSchema);
