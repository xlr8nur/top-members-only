const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const verifyCallback = async(username, password, done) => {
    try {
        const user = await User.findOne({username: username});
        if (!user) {
            return done (null, false, {message: 'Incorrect username or password!'});
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done (null, false, {message: 'Incorrect username or password'});
        }
        return done(null, user);
    } 
    catch (err) {
        return done (err);
    }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done (null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done (null, user);
    }
    catch (err) {
        done (err);
    }
});