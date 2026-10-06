Page({
  
  //前往机车管理页面
  GoAdmin() {
    wx.navigateTo({ url:"/pages/admin/admin" })
  },

  //前往主页管理页面
  GoAdminHome() {
    wx.navigateTo({ url:"/pages/adminhome/adminhome" })
  }
})