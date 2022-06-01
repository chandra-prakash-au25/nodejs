const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");


// REGISTER
router.post("/Register", async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await newUser.save();
        res.send("registered")
    } catch (err) {
        res.status(500).json(err);
    }
});



//LOGIN

router.post('/Login', async(req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });

        !user && res.status(401).json("invalid credientials");

        


        const originalPassword = user.password

        const inputPassword = req.body.password

        originalPassword != inputPassword &&
            res.status(401).json("Wrong Password");
        
        const accessToken = jwt.sign({
                id: user._id,
            },
            process.env.JWT_SEC, { expiresIn: "1d" }
        );

        const { password, ...others } = user._doc;
        res.send(user)

    } catch (err) {
        res.status(500).json(err);
    }

});


module.exports = router;