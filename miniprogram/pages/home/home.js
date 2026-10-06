Page({
  data: {
    banners: [],
    
    club_logo:'cloud://moto-club-d1guy17qhab5acc6b.6d6f-moto-club-d1guy17qhab5acc6b-1499253637/home_photos/club_logo.jpg',

    poster:[],

    markers: [{
      id: 1,
      latitude:23.576088,
      longitude:113.970765,
      name: '南昆山永汉河机车俱乐部',
      width: 30,
      height: 30
    }]
  },
  onShow(){
    wx.cloud.database().collection('JH_Banner').get().then(res => {
      this.setData({
          banners: res.data.map(item => item.fileID)
      })
    }),
    wx.cloud.database().collection('JH_Poster').get().then(res => {
      this.setData({
          poster: res.data.map(item => item.fileID)
      })
    })
  },
  

  clickshow_poster(e){
    wx.previewImage({
      current:e.currentTarget.dataset.src,
      urls: this.data.poster
    })
  },

  openMap() {
    wx.openLocation({
        latitude:23.576088,
        longitude:113.970765,
        name: '南昆山永汉河机车俱乐部',
        address: '广东省惠州市龙门县永汉河',
        scale: 18
    })
  },

  callPhone() {
    wx.makePhoneCall({
        phoneNumber: '13928769108'
    })
  }

})
