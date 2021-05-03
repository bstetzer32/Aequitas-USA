const express = require('express');
const asyncHandler = require('express-async-handler');
const {Problem, Region, RegionSubscription} = require('../../db/models')
const { Op } = require('sequelize')


const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    console.log(req.body)
    const problem = await Problem.create(req.body.product)
    // con
    return res.json({problem})
}))

module.exports = router;