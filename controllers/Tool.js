const asyncHandler = require("express-async-handler");
//tool model
const Tool = require("../models/Tool")
//get all tools
const getToolList = asyncHandler(async (req, res) => {
    const toolList = await Tool.find();
    //send my created news list
    res.status(200).json(toolList);
});
//get single too details
const getToolDetails = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const tool = await Tool.findById(id);
    if (!tool) {
        res.status(401);
        throw new Error("Please provide a valid id");
    }
    res.status(200).json(tool);
});
//add new tool
const addTool = asyncHandler(async (req, res) => {
    const { name, price, thumbURL, minQty, availQty, shortDesc } = req.body;
    if (!name || !price || !thumbURL || !minQty || !availQty || !shortDesc) {
        res.status(400);
        throw new Error("Please provide all info");
    }
    //add new tool
    const tool = await Tool.create({
        name, price, thumbURL, minQty, availQty, shortDesc
    });
    //send added tool data
    res.status(200).json(tool);
});
//delete tool
const deleteTool = asyncHandler(async (req, res) => {
    const id = req.params.id;
    //see if the tool exits.
    const tool = await Tool.findById(id);

    if (!tool) {
        res.status(400);
        throw new Error("please provide a valid id");
    }
    await tool.remove();
    // send the removed news data
    res.status(200).json({id});
});

module.exports = { getToolList, getToolDetails, addTool, deleteTool };