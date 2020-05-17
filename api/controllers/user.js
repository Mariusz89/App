const User = require('../models/user');

module.exports.read = (req, res) => {
    const userId = req.params.id;

    User.findById(userId).exec((err, user) => {
			if(err || !user) {
				return res.status(400).json({
					error: "User not found"
				})
			}
			user.salt = undefined;
			user.hashed_password = undefined;
			res.json(user);
		});
};

module.exports.update = (req, res) => {
	console.log('Update user', req.user, 'Update data', req.body);

	const {name, password} = req.body;

	User.findOne({_id: req.user._id}, (err, user) => {
		if(err || !user) {
			return res.status(400).json({
				error: 'User not found'
			});
		}
		
		if(!name) {
			return res.status(400).json({
				error: 'Name is required'
			})
		} else {
				user.name = name;
		}

		if(password) {
			if(password < 6) {
				return res.status(400).json({
					error: 'Password must have 6 characters'
				})
			} else {
					user.password = password;
			}
		}

		user.save((err, updatedUser) => {
			console.log('Updated user failer, err');

			if(err) {
				return res.status(400).json({
					error: 'User update failed'
				});
			}

			updatedUser.hashed_password = undefined;
			updatedUser.salt = undefined;

			res.json(updatedUser);
		});
	});
}