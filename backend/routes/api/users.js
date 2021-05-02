const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { fetchOfficialData } = require('../../utils/fetchOfficialData');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

const validateVerify = [
  check('addressLineOne')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid address.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid city.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid state.'),
  check('zip')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 5 })
    .withMessage('Please provide a valid state.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Please enter your password.'),
  handleValidationErrors,
]


const router = express.Router();

router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.post(
  '/verify',
  // validateVerify,
  asyncHandler(async (req, res) => {
    const { citizenId, addressLineOne, city, state, zip } = req.body

    const data = await fetchOfficialData({citizenId, addressLineOne, city, state, zip})
    return res.json({
      data,
    });
  }),
);

module.exports = router;