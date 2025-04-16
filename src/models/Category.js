import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  budget: {
    type: Number,
    required: false,
    min: 0,
  },
  color: {
    type: String,
    required: false,
    default: "#000000",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
