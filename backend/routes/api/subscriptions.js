const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, RegionSubscription, OfficeSubscription, Region, Office, Topic } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const topics = await Topic.findAll();
    const regions = await Region.findAll();
    const pageNames = {};
    pageNames.topics = []
    pageNames.regions = []
    topics.forEach(topic => {
        pageNames.topics.push({id: topic.id, name: topic.name})
    });
    regions.forEach(region => {
        pageNames.regions.push({id: region.id, name: region.name})
    })
    return res.json(pageNames)
}))

router.get('/:userId', asyncHandler(async (req, res) => {
    
    const {userId} = req.params
    if (!userId) {
        return res.json({})
    }

    const subscriptionData = await User.findOne({
        where: {
            id: userId
        },
            include: [{model: RegionSubscription, include: Region}, {model: OfficeSubscription, include: Office}]
    })
    const regions = subscriptionData ? subscriptionData.RegionSubscriptions.map(region => region.Region) : []
    const offices = subscriptionData ? subscriptionData.OfficeSubscriptions.map(office => office.Office) : []
    const subscriptions = { regionSubs: regions, officeSubs: offices}
    return res.json(subscriptions)
}))

router.get('/region/:regionId', asyncHandler(async (req, res) => {
    const {regionId} = req.params
    const region = await Region.findOne({where: { id: regionId}})
    const govtData = await Office.findAll({where: {
        region: region.name
    }, include: User.scope('leader')})
    return res.json(govtData)
}))

router.get('/user/:userId', asyncHandler(async (req, res) => {
    const {userId} = req.params
    const problems = await Problem.findAll({where: { citiznd: userId}})
    return res.json(problems)
}))

module.exports = router;