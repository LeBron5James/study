function checkAuth(callback) {
  if (wx.getStorageSync('tel')) {
    //处理业务
    callback()
  } else {
    if (wx.getStorageSync('token')) {
      //手机号绑定
      wx.navigateTo({
        url: "/pages/telform/telform",
      })
    } else {
      //授权登录
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }
  }
}
export default checkAuth