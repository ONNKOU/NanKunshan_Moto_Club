Page({
  data: { 
    banners: [],
    poster: []
  },

  onShow() {
      wx.cloud.database().collection('JH_Banner').get().then(res => {
          this.setData({ banners: res.data })
      })

      wx.cloud.database().collection('JH_Poster').get().then(res => {
        this.setData({ poster: res.data })
    })
  },

  uploadBanner() {
      wx.chooseMedia({
          count: 1,
          mediaType: ['image'],
          success: res => {
              const tempPath = res.tempFiles[0].tempFilePath
              wx.cloud.uploadFile({
                  cloudPath: 'home_photos/banner_' + Date.now() + '.jpg',
                  filePath: tempPath
              }).then(r => {
                  wx.cloud.database().collection('JH_Banner').add({
                      data: { fileID: r.fileID }
                  }).then(() => {
                      wx.showToast({ title: '上传成功' })
                      this.onShow()
                  })
              })
          }
      })
  },

  delBanner(e) {
      const id = e.currentTarget.dataset.id
      const fileID = e.currentTarget.dataset.file
      wx.showModal({
          title: '确认删除？',
          success: res => {
              if (res.confirm) {
                  wx.cloud.database().collection('JH_Banner').doc(id).remove().then(() => {
                      if (fileID && fileID.startsWith('cloud://')) {
                          wx.cloud.deleteFile({ fileList: [fileID] })
                      }
                      wx.showToast({ title: '已删除' })
                      this.onShow()
                  })
              }
          }
      })
  },

  //海报轮播图数据
  uploadPoster() {
    wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        success: res => {
            const tempPath = res.tempFiles[0].tempFilePath
            wx.cloud.uploadFile({
                cloudPath: 'home_photos/poster_' + Date.now() + '.jpg',
                filePath: tempPath
            }).then(r => {
                wx.cloud.database().collection('JH_Poster').add({
                    data: { fileID: r.fileID }
                }).then(() => {
                    wx.showToast({ title: '上传成功' })
                    this.onShow()
                })
            })
        }
    })
},

delPoster(e) {
    const id = e.currentTarget.dataset.id
    const fileID = e.currentTarget.dataset.file
    wx.showModal({
        title: '确认删除？',
        success: res => {
            if (res.confirm) {
                wx.cloud.database().collection('JH_Poster').doc(id).remove().then(() => {
                    if (fileID && fileID.startsWith('cloud://')) {
                        wx.cloud.deleteFile({ fileList: [fileID] })
                    }
                    wx.showToast({ title: '已删除' })
                    this.onShow()
                })
            }
        }
    })
}
})