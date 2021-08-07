const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../Models/user')

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
  // 登陸策略
  passport.use(new LocalStrategy({ username: 'email' },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false);
          }
          if (user.passport !== password) {
            return done(null, false)
          }
          return done(null, user);
        })
        .catch(err => done(err, null))
    }
  ));
  // 序列化&反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean() //透過id找到user，這很可能傳到前端樣板，所以要先經過處理
      .then(user => done(null, user))
      .catch(err => done(err, null))
  });
}