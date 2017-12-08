// result.js
//获取应用实例
const app = getApp()
var api = require('../../api.js')
var lm  = 10
var n    = 0
var lists = [
  {
    title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 88,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '1'
  },
  {
          title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 98,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '2'
  },
  {
          title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 98,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '3'
  },
  {
          title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 98,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '4'
  },
  {
          title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 98,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '5'
  },
  {
          title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 98,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '6'
  },
  {
          title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 98,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '7'
  },
  {
          title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 98,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '8'
  },
  {
          title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 98,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '9'
  },
  {
          title: "华为Meta10全屏时代新旗舰2017新款5.5寸全面屏 全面屏全面屏全面屏",
    price: 1988,
    presale_price: 268,
    chart: 13728,
    good: 98,
    author_nickname: "华为",
    cover_image: "../../images/mobile.jpeg",
    id: '10'
  },
]

Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: null,
    withTotaly: true,
    withSales: false,
    withPrice: false,
    withFilter: false,
    filter: {
    },
    hidden: false,
    result: lists,
    list_view: "singel",
    windowHeight: 0,
    hasRefresh: false,
    hasMore: true,
    isTop: true,
    scrollTop: 0,
    productViewHeight: 140,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      },
    })
    this.setData({
      keyword: app.globalData.keyword,
      hidden: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.search();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 搜索
   */
  search: function (e) {
    var that = this;
    n = n + 1;
    var sort = null;
    if (that.data.withTotaly) {
      sort = '[["rank","desc"]]';
    }
    if (that.data.withSales) {
      sort = '[["rank","asc"]]';
    }
    if (that.data.withPrice === 'min') {
      sort = '[["price","asc"]]';
    } else if (that.data.withPrice === 'max') {
      sort = '[["price","desc"]]';
    }
    console.log('sort：'+sort)
    wx.request({
      url: api.search,
      data: {
        'rt': 'json',
        'kw': app.globalData.keyword,
        'sort': sort,
        'of': lm * n,
        'lm': lm,
      },
      success: function (res) {
        if (res.data.res == 0) {
          var list = that.data.result.concat(res.data.list)
          that.setData({
            result: list
          })
        } else {
          wx.showToast({
            title: '没有找到任何商品',
            icon: 'info',
            duration: 2000
          })
          that.setData({
            hasMore: false
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络错误',
          icon: 'warn',
          duration: 2000
        })
        that.setData({
          hasMore: 'badNet'
        })
      }
    })
  },
  scroll: function (e) {
    if (e.detail.scrollTop > this.data.productViewHeight) {
      this.setData({
        isTop: false
      })
    } else {
      this.setData({
        isTop: true
      })
    }
  },
  goTop: function () {
    this.setData({
      scrollTop: 0
    })
    console.log(this.data.scrollTop)
  },

  withTotaly: function (e) {
    if (this.data.withTotaly === false) {
      this.setData({
        withSales: false,
        withTotaly: true,
        withPrice: false,
        result: []
      })
      n = 0;
      this.search();
    }
  },

  withSales: function (e) {
    if (this.data.withSales === false) {
      this.setData({
        withSales: true,
        withTotaly: false,
        withPrice: false,
        result: []
      })
      n = 0;
      this.search();
    }
  },

  withPrice: function (e) {
    if (this.data.withPrice === false || this.data.withPrice === 'max') {
      this.setData({
        withSales: false,
        withTotaly: false,
        withPrice: 'min',
        result: []
      })
    } else {
      this.setData({
        withSales: false,
        withTotaly: false,
        withPrice: 'max',
        result: []
      })
    }
    this.search();
  }
})