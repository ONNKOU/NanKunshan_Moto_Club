Page({
  data: {
      avatarUrl: '',
      nickname: ''
  },

  onLoad() {
    const avatarUrl = wx.getStorageSync('avatarUrl') || ''
    const nickname = wx.getStorageSync('nickname') || ''
    this.setData({ avatarUrl, nickname })
  },

  onChooseAvatar(e) {
    const avatarUrl = e.detail.avatarUrl
    this.setData({ avatarUrl })
    wx.setStorageSync('avatarUrl', avatarUrl)
  },

  onNickname(e) {
    const nickname = e.detail.value
    this.setData({ nickname })
    wx.setStorageSync('nickname', nickname)
  },

  goAdmin() {
    wx.showModal({
        title: '管理员验证',
        editable: true,
        placeholderText: '请输入管理员密码',
        success: (res) => {
            if (res.confirm) {
                if (res.content === '261003') {
                    wx.navigateTo({ url: '/pages/admin/admin' })
                } else {
                    wx.showToast({ title: '密码错误', icon: 'none' })
                }
            }
        }
    })
}
})