// 進入路由之前，判斷是否已經有驗證成功
// 如果有，就繼續（進入路由）
// 沒有，則導向到登陸頁面，並給予相應提示
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error', '請先登陸才能使用')
    res.redirect('/users/login')
  }
}