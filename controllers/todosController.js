const Todo = require("../models/Todo");
const User = require("../models/User");

const getAllTodos = async (req, res) => {
	try {
		const user = res.locals.decodedToken.userId;
		const allTodos = await Todo.find({ owner: user });
		res.status(200).json({ success: true, data: allTodos });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "error", error: error });
	}
};

const createTodo = async (req, res) => {
	try {
		const user = res.locals.decodedToken.userId;
		const todoData = {
			owner: user,
			title: req.body.title,
			description: req.body.description,
			priority: req.body.priority,
		};
		const newTodo = await new Todo(todoData);
		const savedTodo = await newTodo.save();
		const updateUser = await User.findOneAndUpdate(
			{ _id: user },
			{ $push: { todos: newTodo._id } }
		);
		await updateUser.save();

		res.status(200).json({ success: true, data: savedTodo });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "error", error: error });
	}
};

module.exports = {
	getAllTodos,
	createTodo,
};
