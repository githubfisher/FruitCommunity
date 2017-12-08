// search.js
//获取应用实例
const app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    keyword: "搜索",
    hotkey: [{
        keyword: "外套"
      },
      {
        keyword: "毛衣"
      },
      {
        keyword: "裘皮大衣"
      },
      {
        keyword: "板鞋"
      },
      {
        keyword: "轻薄羽绒服"
      },
      {
        keyword: "吴亦凡同款围巾"
      },
    ],
    history: [{
        keyword: "外套"
      },
      {
        keyword: "毛衣"
      },
      {
        keyword: "裘皮大衣"
      },
      {
        keyword: "板鞋"
      },
      {
        keyword: "轻薄羽绒服"
      },
      {
        keyword: "吴亦凡同款围巾"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 搜索
   */
  search: function(e) {
    app.globalData.keyword =  e.detail.value;
    wx.navigateTo({
      url: 'result'
    })
  },
  /**
   * 
   */
  click_btn: function(e) {
    app.globalData.keyword = e.currentTarget.dataset.keyword;
    wx.navigateTo({
      url: 'result'
    })
  },

  cancel: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  }
})