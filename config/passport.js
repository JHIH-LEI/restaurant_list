const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../Models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
  // 登陸策略
  passport.use(new LocalStrategy({ usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: '此Email尚未註冊！' });
          }
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, false, { message: '帳號或密碼錯誤' })
              }
              return done(null, user);
            })
        })
        .catch(err => done(err, false))
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/users/auth/facebook/callback',
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) {
          return done(null, user)
        }
        const randomPassword = Math.random().toString(36).slice(-8)
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({ email, name, password: hash }))
          .then(() => done(null, user))
          .catch(err => console.log(err))
      })
      .catch(err => done(err, null))
  }))

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