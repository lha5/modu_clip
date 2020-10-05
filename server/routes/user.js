const express = require('express');
const router = express.Router();

const {User} = require('../models/User');
const {auth} = require('../middleware/auth');

// ------------------------
//          User
// ------------------------

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role !== 0,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

router.post('/signup', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) {return res.json({success: false, err});}

        return res.status(200).json({
            success: true
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email is not founded."
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "Wrong password"
                });
            }

            user.generateToken((err, user) => {
                if (err) {return res.status(400).send(err);}

                res.cookie("w_authExp", user.tokenExp, {httpOnly: true});
                res
                    .cookie("w_auth", user.token, {httpOnly: true})
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: "", tokenExp: 0}, (err, doc) => {
        if (err) {return res.json({success: false, err});}

        return res.clearCookie('w_auth').status(200).send({
            success: true
        });
    });
});

module.exports = router;