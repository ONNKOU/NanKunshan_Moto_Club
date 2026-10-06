Page({
  data: {
      avatarUrl: '',
      nickname: ''
  },

  onLoad() {
    const avatarUrl = wx.getStorageSync('avatarUrl') || ''
    const nickname = wx.getStorageSync('nickname') || ''
    this.setData({ avatarUrl, nickname })

    wx.cloud.callFunction({
      name: 'getOpenid'
    }).then(res => {
      console.log('openid:', res.result.openid)
      wx.setStorageSync('openid', res.result.openid)
    })
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

  goEntrance() {
    wx.navigateTo({ url: '/pages/entrance/entrance' })
  }
})