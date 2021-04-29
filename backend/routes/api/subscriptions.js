const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, RegionSubscription, OfficeSubscription } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/:userId', requireAuth, asyncHandler(async (req, res) => {
    
    const {userId} = req.params
    const subscriptionData = await User.scope('loginUser').findAll({
        where: {
            id: userId
        },
            include: [RegionSubscription, OfficeSubscription]
    })
    const subscriptions = subscriptionData
    return res.json(subscriptions)
}))

module.exports = router;