const User = require('../models/user');


exports.signup =  (req, res) => {
    /*console.log(req.body);

    res.json({
        data: 'You hit signup endpoint !!!'
    });*/

    const {name, email, password} = req.body;
    console.log(email);

    User.findOne({email}).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: "Email is taken"
            })
        }
    })

    let newUser = new User({name, email, password});

    newUser.save((err, success) => {
        console.log("Signup user", err);

        if(err) {
            return res.status(400).json({
                error: err
            });
        }

        res.json({
            message: "New user signup. Please sign in"
        });
    });
};