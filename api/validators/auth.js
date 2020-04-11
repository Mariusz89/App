const {check} = require('express-validator');

exports.userSignupValidator = [
	check('name')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Name is required'),

	check('email')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Email is required'),

	check('email')
		.trim()
		.isEmail()
		.withMessage('Email is invalid'),

	check('password')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Password is required'),

	check('password')
		.trim()
		.isLength({min: 8})
		.withMessage('Password must be at least 8 characters long')
];

exports.userSigninValidator = [
	check('email')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Email is required'),

	check('email')
		.trim()
		.isEmail()
		.withMessage('Email is invalid'),

	check('password')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Password is required'),

	check('password')
		.trim()
		.isLength({min: 8})
		.withMessage('Password must be at least 8 characters long')
];