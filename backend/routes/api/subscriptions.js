const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, RegionSubscription, OfficeSubscription, Region, Office } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/:userId', asyncHandler(async (req, res) => {
    
    const {userId} = req.params
    const subscriptionData = await User.scope('loginUser').findAll({
        where: {
            id: userId
        },
            include: [{model: RegionSubscription, include: Region}, {model: OfficeSubscription, include: Office}]
    })
    const regions = subscriptionData[0].RegionSubscriptions.map(region => region.Region)
    const offices = subscriptionData[0].OfficeSubscriptions.map(office => office.Office)
    const subscriptions = {regionSubs: regions, officeSubs: offices}
    return res.json(subscriptions)
}))

router.post('/feed', asyncHandler(async (req, res) => {
    const {govt, regions, offices} = req.params
    const govtData = await Region.findAll({where: {
        id: {
            [Op.in]: govt
        }
    }})
}))

module.exports = router;