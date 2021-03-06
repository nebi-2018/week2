'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
  
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user   : user
        });
    }
   req.login(user, {session: false}, (err) => {
       if (err) {
           res.send(err);
       }
       
       const token = jwt.sign(user, '12345');
       return res.json({token});
    });
})(req, res);
};

module.exports = {
  login,
};