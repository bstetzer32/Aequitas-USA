const express = require('express');
const asyncHandler = require('express-async-handler');
const {Solution, Region, RegionSubscription} = require('../../db/models')
const { Op } = require('sequelize')


const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    console.log(req.body)
    const solution = await Solution.create(req.body.solution)
    // con
    return res.json({solution})
}))

module.exports = router;