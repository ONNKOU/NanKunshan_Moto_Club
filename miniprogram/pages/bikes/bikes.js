Page({
  data: {
     bikes: [] 
  },
  
  onShow() {
    wx.cloud.database().collection('bikes').get().then(res => {
      this.setData({ bikes: res.data })
    })
  },

  onPullDownRefresh(){
    wx.cloud.database().collection("bikes").get().then(res => {
     this.setData({bikes: res.data})
     wx.stopPullDownRefresh()
    })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/bikedetail/bikedetail?id=${id}` })
  }
})