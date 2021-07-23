const express = require('express');
const asyncHandler = require('express-async-handler');
const {Problem, Region, RegionSubscription, Highlight} = require('../../db/models')
const { Op } = require('sequelize')


const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    // console.log(req.body)
    const problem = await Problem.create(req.body.product)
    // con
    return res.json({problem})
}))

router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    let highlight;
    const {userId} = req.body
    const {id} = req.params
    const exists = await Highlight.findOne({
        where: {
            problemId: id,
            userId
        }
    })
    if (exists) {
        return res.json({error: "You have already highlighted this Problem"})
    } else {
        highlight = await Highlight.create({
          problemId: id,
          userId,
        });
    }
    // con
    return res.json({ highlight });
  })
);

module.exports = router;