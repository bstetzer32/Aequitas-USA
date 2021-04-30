const express = require('express');
const asyncHandler = require('express-async-handler');
const {Problem} = require('../../db/models')
const { Op } = require('sequelize')


const router = express.Router();


router.post('/', asyncHandler(async (req, res) => {
    const {context, offset} = req.body;
    const feedData = await Problem.findAll({where: {
        [Op.or]: [{
            regionId: {
                [Op.in]: context.regions
            }
        }]
    }, limit: 20, offset})
    return res.json({feedData})
}))

module.exports = router;