const express = require('express');
const router = express.Router()
const {
    getItemController,
    addItemController,
    editItemController,
    deleteItemController,
} = require("../controller/itemController.js");

//routes
//methods - get
router.get('/get-item', getItemController);

//methods - post
router.post('/add-item', addItemController)

//method - PUT
router.put("/edit-item", editItemController);

//method - DELETE
router.post("/delete-item", deleteItemController);


module.exports = router;

