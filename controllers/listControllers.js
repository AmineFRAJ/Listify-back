const User = require("../models/user");
const List = require("../models/list");
//test
exports.test = async (req, res) => {
  try {
    res.status(200).send("List Test OK!");
  } catch (error) {
    res.status(500).send(error);
  }
};
//add task
exports.addTask = async (req, res) => {
  try {
    const { title, body, id } = req.body;

    console.log(id); // Check the user object

    const existingUser = await User.findById(id);
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const list = new List({ title, body, user: existingUser });
    await list
      .save()
      .then(() =>
        res.status(200).json({ msg: "Task added successfully", list })
      );
    existingUser.list.push(list);
    existingUser.save();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ errors: [{ msg: "Can not add" }] });
  }
};

//update task
exports.updateTask = async (req, res) => {
  try {
    console.log("Request received - Params:", req.params);
    console.log("Request received - Body:", req.body);

    const { id } = req.params;
    const { title, body, isDone } = req.body;

    const updateTask = await List.findByIdAndUpdate(
      id,
      { title, body, isDone },
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.status(200).send({ msg: "Task Updated successfully", updateTask });
  } catch (error) {
    console.log("Error in updateTask:", error.message);
    res.status(500).send({ errors: [{ msg: "Can not update task" }] });
  }
};


//delete

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.body; // Task ID to be deleted

    // Find the task first
    const deletedTask = await List.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // If the task is deleted, update all users by pulling the task from their list
    const usersUpdated = await User.updateMany(
      { list: req.params.id }, // Find users who have this task in their list
      { $pull: { list: req.params.id } } // Pull the task from their list
    );

    console.log("Users updated:", usersUpdated); // Debug users updated

    res.status(200).json({ message: "Task Deleted", deletedTask });
  } catch (error) {
    console.error("Error:", error); // Debug error
    res.status(500).json({ error: error.message });
  }
};

//get task
exports.getTasks = async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the tasks for the user and sort them by createdAt in descending order
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    // Check if tasks exist for the user
    if (list.length !== 0) {
      return res.status(200).json({ list });
    } else {
      return res.status(200).json({ message: "No tasks found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.deleteTask = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const existingUser = await User.findOneAndUpdate(
//       { email },
//       { $pull: { list: req.params.id } }
//     );

//     if (existingUser) {
//       await List.findByIdAndDelete(req.params.id).then(() =>
//         res.status(200).json({ msg: "Task Deleted" })
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
