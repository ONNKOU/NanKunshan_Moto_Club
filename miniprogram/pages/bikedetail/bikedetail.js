Page({
  data: { bike: {} },

  onLoad(options) {
      wx.cloud.database().collection('bikes').doc(options.id).get().then(res => {
        console.log('数据:', res.data)  
        this.setData({ bike: res.data })
      })
  }
})