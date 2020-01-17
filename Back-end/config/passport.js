var LocalStrategy = require('passport-local').Strategy;
const db = require('./database');
const Users = db.Users;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    passport.use('login',
       new LocalStrategy(
        {
          usernameField: "username",
          passwordField:"password"
        },
        function(username, password, done) {
          // When a user tries to sign in this code runs
          Users.findOne({
            where: {
              username: username
            }
          }).then(function(dbUser) {
            // If there's no user with the given email
            if (!dbUser) {
              return done(null, false, {
                message: "Incorrect username."
              });
            }
            // If there is a user with the given email, but the password the user gives us is incorrect
            else if (!dbUser.validPassword(password)) {
              return done(null, false, {
                message: "Incorrect Password."
              });
            }
            // If none of the above, return the user
            return done(null, dbUser);
          });
        }
      ));
}