const asyncHandler = require("express-async-handler")
//review model
const Review = require("../models/Review")
//add review
const addReview = asyncHandler(async (req, res) => {
    let { ratings, desc } = req.body;
    let username = req.user.username;
    if (!ratings || !desc || !username) {
        res.status(400);
        throw new Error("Provide all info!");
    }
    const review = await Review.create({
        username,
        ratings,
        desc
    })
    if (review) {
        res.status(200).json(review)
    } else {
        res.status(400);
        throw new Error("Some error occured!");
    }
})

//get reviews(6)
const getReviews = asyncHandler(async (req, res) => {
    let reviews = await Review.find().limit(6);
    if (reviews) {
        res.status(200).json(reviews)
    } else {
        res.status(400);
        throw new Error("Some error occured!");
    }
})

module.exports = { addReview, getReviews }