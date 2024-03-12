const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Defining out Schema structure.

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const WorkOutModel = mongoose.model("workout", workoutSchema);
module.exports = WorkOutModel;
