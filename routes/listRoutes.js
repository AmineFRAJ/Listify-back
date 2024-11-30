const express = require("express");
const {test,  addTask, updateTask, deleteTask, getTasks}=require("../controllers/listControllers");
const router = express.Router();


router.get("/test", test);
router.post("/addTask", addTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);
router.get('/getTask/:id', getTasks);

module.exports = router;