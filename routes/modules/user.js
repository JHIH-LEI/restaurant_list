const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '必填項不可空缺' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼和確認密碼不一致' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'Email已經被註冊過了' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(user => req.flash('success', '註冊成功'))
        .then(() => res.render('register', { errors, success: req.flash('success') }))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', '登出成功')
  res.redirect('/users/login')
})

module.exports = router