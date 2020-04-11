process.env.NODE_TLS_REJECT_UNAUTHORIZED;
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


exports.signup =  (req, res) => {
	const {name, email, password} = req.body;

	User.findOne({email}).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				error: "Email is taken"
			})
		}

		const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'});
		console.log('token: ' + token)

		const smtpTransport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS
			}
		});

		console.log(process.env.EMAIL_FROM);
		
		const mailOptions = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: `Account activation link`,
			text: "Please use the following link to activate your account",
			html: `
				<b>Please use the following link to activate your account</b>
				<p>${process.env.CLIENT_URL}/auth/activate/${token}</p>	
				<hr />
				<p>This email may contain sensitive information</p>
				<p>${process.env.CLIENT_URL}</p>
			`
		}

		smtpTransport.sendMail(mailOptions)
			.then(sent => {
				console.log('asasasa ' + sent.messageId);

				return res.json({
					message: `Email has been sent to ${email}. Follow the instruction to activate your account.`
				})	
			})
			.catch(err => {			
				return res.json({
					message: err
				})
			})

		smtpTransport.close();
	});
};

exports.accountActivation = (req, res) => {
	const {token} = req.body;

	if(token) {
		jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
			if(err) {
				console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);

				return res.status(401).json({
					error: 'Expired link. Signup again'
				})
			}

			const {name, email, password} = jwt.decode(token);

			const user = new User ({name, email, password});

			user.save((err, user) => {
				if(err) {
					console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);

					return res.status(401).json({
						error: 'Error saving user in database. Try signup again'
					});
				}

				return res.json({
					message: 'Signup success. Please signin'
				});
			});
		});
	} else {
			return res.json({
				message: 'Something went wrong. Try again'
			})
	}
};

exports.signin = (req, res) => {
	const {email, password} = req.body;

	User.findOne({email}).exec((err, user) => {
		if(err || !user) {
			return res.status(400).json({
				error: 'User with that email does not exist. Please signup'
			});
		}

		if(!user.authenticate(password)) {
			return res.status(400).json({
				error: 'Email and password do not match'
			});
		}

		const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
		const {_id, name, email, role} = user;

		return res.json({
			token,
			user: {_id, name, email, role}
		});
	});
};