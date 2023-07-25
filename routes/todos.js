const express = require("express");
const router = express.Router();
const { checkIfEmpty } = require("../utils/checkIfEmpty");
const { jwtValidate } = require("../utils/jwtValidate");
const { getAllTodos, createTodo } = require("../controllers/todosController");

router.get("/all-todos", jwtValidate, getAllTodos);
router.post("/create-todo", checkIfEmpty, jwtValidate, createTodo);

module.exports = router;
