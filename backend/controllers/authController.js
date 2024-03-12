const WorkOutModel = require("../models/workOut");
const mongoose = require("mongoose");

// controllers functions

// workOut all
module.exports.workOut_get_all = async (req, res) => {
  //   res.json({ msg: "Get all the workouts" });
  try {
    const allWorkOut = await WorkOutModel.find();
    console.log(allWorkOut);
    if (allWorkOut.length === 0) {
      return res
        .status(200)
        .json({ success: true, msg: "You have no workout record available" });
    }
    return res.status(200).json({ success: true, data: allWorkOut });
  } catch (err) {
    console.log(err);
  }
};

module.exports.single_get_workOut = async (req, res) => {
  //   res.json({ msg: "Get Single workout" });
  try {
    const paramsID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(paramsID)) {
      return res.status(404).json({ success: false, msg: "No such workout" });
    }
    const SingleWorkOut = await WorkOutModel.findById(paramsID);
    // console.log(SingleWorkOut);
    if (!SingleWorkOut) {
      return res.status(400).json({ success: false, msg: "No such workout" });
    }
    res.status(200).json({ success: true, data: SingleWorkOut });
    // if(SingleWorkOut)
  } catch (err) {
    console.log(err);
  }
};

module.exports.workOut_post = async (req, res) => {
  //   res.json({ msg: "Post new workout" });
  const { title, reps, load } = req.body;
  try {
    const createWorkOut = await WorkOutModel.create({ title, reps, load });
    res
      .status(201)
      .json({ success: true, msg: "WorkOut created successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports.workOut_delete = async (req, res) => {
  //   res.json({ msg: "Delete workout" });
  try {
    const paramsID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(paramsID)) {
      return res.status(404).json({ success: false, msg: "No such workout" });
    }
    const deleteResult = await WorkOutModel.findByIdAndDelete({
      _id: paramsID,
    });
    console.log(deleteResult);
    if (!deleteResult) {
      return res.status(400).json({ success: false, msg: "No such workout" });
    }
    res.status(200).json({
      success: true,
      data: `ObjectID ${deleteResult._id} deleted successfully`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.workOut_update = async (req, res) => {
  //   res.json({ msg: "Update workout" });

  try {
    const paramsID = req.params.id;
    const updatedValue = req.body;
    if (!mongoose.Types.ObjectId.isValid(paramsID)) {
      return res.status(404).json({ success: false, msg: "No such workout" });
    }
    const updatedWork = await WorkOutModel.findByIdAndUpdate(
      paramsID,
      updatedValue,
      { new: true }
    );

    if (!updatedWork) {
      return res.status(404).json({ success: false, msg: "No such workout" });
    }

    res.status(204).json({ success: true, data: updatedWork });
  } catch (err) {
    console.log(err);
  }
};
