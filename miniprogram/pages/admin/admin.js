Page({
  data: {
      name: '',
      price: '',
      details_text:'',
      imgUrl: '',
      imgFileID: '',
      bikes:[]
  },

  onName(e) { this.setData({ name: e.detail.value }) },
  onPrice(e) { this.setData({ price: e.detail.value }) },
  onDetails_text(e) {this.setData({details_text: e.detail.value })},

  chooseImg() {
      wx.chooseMedia({
          count: 1,
          mediaType: ['image'],
          success: res => {
              const tempPath = res.tempFiles[0].tempFilePath
              this.setData({ imgUrl: tempPath })
              wx.cloud.uploadFile({
                  cloudPath: 'bikes_pic/' + Date.now() + '.jpg',
                  filePath: tempPath
              }).then(r => {
                  this.setData({ imgFileID: r.fileID })
                  console.log('上传成功', r.fileID)
              })
          }
      })
  },

  submit() {
      if (!this.data.name || !this.data.price || !this.data.imgFileID || !this.data.details_text) {
          wx.showToast({ title: '请填完整', icon: 'none' })
          return
      }
      wx.cloud.database().collection('bikes').add({
          data: {
              name: this.data.name,
              price: this.data.price,
              pic: this.data.imgFileID,
              details_text: this.data.details_text
          }
      }).then(() => {
          wx.showToast({ title: '添加成功' })
      })
  },

  onShow() {
    wx.cloud.database().collection('bikes').get().then(res => {
        this.setData({ bikes: res.data })
    })
  },

  delBike(e) {
    const id = e.currentTarget.dataset.id
    wx.cloud.database().collection('bikes').doc(id).remove().then(() => {
        wx.showToast({ title: '删除成功' })
        this.onShow()
    })
  },

  goHome() {
    wx.switchTab({ url: '/pages/home/home' })
  }
})