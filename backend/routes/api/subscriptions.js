const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, RegionSubscription, OfficeSubscription } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    console.log(req)
    const {userId} = req.params
    const officeSubscriptions = await User.findAll({
        where: {
            id: 1
        },
            include: [RegionSubscription, OfficeSubscription]
    })
    return res.json(officeSubscriptions)
}))

module.exports = router;