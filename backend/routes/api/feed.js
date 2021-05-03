const express = require('express');
const asyncHandler = require('express-async-handler');
const {Problem, Region, RegionSubscription, Solution} = require('../../db/models')
const { Op } = require('sequelize')


const router = express.Router();




router.post('/', asyncHandler(async (req, res) => {
    const {context, offset} = req.body;
    const feedData = await Problem.findAll({limit: 20, offset, order:[['updatedAt', 'DESC']], include: {model: Solution}})
    // console.log(feedData)
    return res.json({feedData})
}))

router.post('/region/:regionId', asyncHandler(async (req, res) => {
    const {offset} = req.body;
    const {regionId} = req.params
    const feedData = await Problem.findAll({where: {
        
            regionId: regionId
        
    }, limit: 20, offset, include: {model: Solution}})
    return res.json({feedData})
}))

router.post('/topic/:topicId', asyncHandler(async (req, res) => {
    const {offset} = req.body;
    const {topicId} = req.params

    const feedData = await Problem.findAll({where: {
        
            topicId: topicId
        
    }, limit: 20, offset, include: {model: Solution}})
    return res.json({feedData})
}))

module.exports = router;