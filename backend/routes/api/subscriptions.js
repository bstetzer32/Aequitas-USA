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
    const pageSubs = {regions, topics};
    return res.json(pageSubs)
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
    // console.log(subscriptionData)
    const regions = subscriptionData ? subscriptionData.RegionSubscriptions.map(region => region.Region) : []
    const offices = subscriptionData ? subscriptionData.OfficeSubscriptions.map(office => office.Office) : []
    const subscriptions = {regionSubs: regions, officeSubs: offices}
    return res.json(subscriptions)
}))

router.get('/region/:regionId', asyncHandler(async (req, res) => {
    const {regionId} = req.params
    const govtData = await Region.findAll({where: {
        id: {
            [Op.in]: govt
        }
    }})
}))

module.exports = router;