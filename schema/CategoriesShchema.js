import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 40
  },
  img: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('Category', categoriesSchema);
