//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    special: [
      {
        title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
        price: 1988,
        presale_price: 3988,
        sale: 66,
        cover_image: "../../images/mobile.jpeg",
        unique: "1"
      },
      {
        title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
        price: 1988,
        presale_price: 3988,
        sale: 66,
        cover_image: "../../images/mobile.jpeg",
        unique: "2"
      },
      {
        title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
        price: 1988,
        presale_price: 3988,
        sale: 66,
        cover_image: "../../images/mobile.jpeg",
        unique: "3"
      }
    ],
    hasMore: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.navigateTo({
      url: '../cart/cart',
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toSearch: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})
