// cart.js

const app = getApp()
var lists =  [
  {
    store: 1,
    store_name: "工社自营",
    checked: false,
    list: [
      {
        id: 1,
        price: 9.1,
        count: 1,
        countTakeStatus: 'disabled',
        title: "冬菇 沙茶酱 火锅调料 蘸酱 调味料240g",
        weight: 0.41,
        tiji: "240ml",
        promotion: "满99元免配送费",
        cuxiao: "第二件半价",
        cover_image: "../../images/donggu.jpg",
        checked: false,
        salesPrice: 1.29,
        inventory: 0,
        isTouchMove: false,
      },
      {
        id: 1,
        price: 15.8,
        count: 2,
        countTakeStatus: 'normal',
        title: "北京金狮 酱油 老抽 红烧 调味料1.48Kg",
        weight: 1.581,
        tiji: "1480ml",
        promotion: "满99元免配送费",
        cuxiao: "第二件半价",
        cover_image: "../../images/jinshi.jpg",
        checked: false,
        salesPrice: 1.11,
        inventory: 1,
        isTouchMove: false,
      }
    ]
  },
  {
    store: 1,
    store_name: "第三方加盟店",
    checked: false,
    list: [
      {
        id: 1,
        price: 9.1,
        count: 1,
        countTakeStatus: 'disabled',
        title: "冬菇 沙茶酱 火锅调料 蘸酱 调味料240g",
        weight: 0.41,
        tiji: "240ml",
        promotion: "满99元免配送费",
        cuxiao: "第二件半价",
        cover_image: "../../images/donggu.jpg",
        checked: false,
        salesPrice: 1.29,
        inventory: 0,
        isTouchMove: false,
      },
      {
        id: 1,
        price: 15.8,
        count: 2,
        countTakeStatus: 'normal',
        title: "北京金狮 酱油 老抽 红烧 调味料1.48Kg",
        weight: 1.581,
        tiji: "1480ml",
        promotion: "满99元免配送费",
        cuxiao: "第二件半价",
        cover_image: "../../images/jinshi.jpg",
        checked: false,
        salesPrice: 1.11,
        inventory: 1,
        isTouchMove: true,
      }
    ]
  }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    list: [],
    windowHeight: 0,
    hasRefresh: false,
    hasMore: true,
    isTop: true,
    scrollTop: 0,
    productViewHeight: 140,
    sumChecked: false,
    sum: "0.00",
    count: 0,
    sumInfo: "不含配送费，已优惠¥",
    salesPrice: "0.00",
    startX: 0, //开始坐标
    startY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var height = parseFloat(res.windowHeight) - 50;
        that.setData({
          windowHeight: height
        })
      },
    })
    this.setData({
      list: lists,
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  storeRadioClick: function (e) {
    var index = e.target.dataset.storeindex;
    var list = this.data.list;
    var store = list[index];
    var sl = store.list;
    if (store.checked) {
      this.setData({
        sumChecked: false
      })
      store.checked = false;
      for (var i=0;i<sl.length;i++) {
        if (sl[i].checked) {
          list[index].list[i].checked = false;
        }
      }
    } else {
      list[index].checked = true;
      for (var i = 0; i < sl.length; i++) {
        if (!sl[i].checked) {
          list[index].list[i].checked = true;
        }
      }
    }
    this.setData({
      list: list
    })
    this.sum();
  },

  productRadioClick: function (e) {
    var sindex = e.target.dataset.storeindex;
    var pindex = e.target.dataset.proindex;
    var list = this.data.list;
    if (list[sindex].list[pindex].checked) {
      this.setData({
        sumChecked: false
      })
      list[sindex].checked = false;
      list[sindex].list[pindex].checked = false;
    } else {
      list[sindex].list[pindex].checked = true;
    }
    this.setData({
      list: list
    })
    this.sum();
  },

  countInput: function (e) {
    var sindex = e.target.dataset.storeindex;
    var pindex = e.target.dataset.proindex;
    var count = e.detail.value;
    var list = this.data.list;
    if (count > 1) {
      list[sindex].list[pindex].count = count;
      list[sindex].list[pindex].countTakeStatus = 'normal';
      this.setData({
        list: list
      })
    } else if (count == 1) {
      list[sindex].list[pindex].count = count;
      list[sindex].list[pindex].countTakeStatus = 'disabled';
      this.setData({
        list: list
      })
    } else {
      list[sindex].list[pindex].count = 1;
      list[sindex].list[pindex].countTakeStatus = 'disabled';
      this.setData({
        list: list
      })
    }
    this.sum();
  },
  countAdd: function (e) {
    var sindex = e.target.dataset.storeindex;
    var pindex = e.target.dataset.proindex;
    var list = this.data.list;
    var count = list[sindex].list[pindex].count;
    count++;
    list[sindex].list[pindex].count = count;
    list[sindex].list[pindex].countTakeStatus = 'normal';
    this.setData({
      list: list
    })
    this.sum();
  },
  countTake: function (e) {
    var sindex = e.target.dataset.storeindex;
    var pindex = e.target.dataset.proindex;
    var list = this.data.list;
    var count = list[sindex].list[pindex].count ;
    count--;
    if ( count > 0 ) {
      list[sindex].list[pindex].count = count;
      list[sindex].list[pindex].countTakeStatus = 'normal';
      this.setData({
        list: list
      })
      if (count == 1) {
        list[sindex].list[pindex].countTakeStatus = 'disabled';
        this.setData({
          list: list
        })
      }
    } else {
      list[sindex].list[pindex].count = 1;
      list[sindex].list[pindex].countTakeStatus = 'disabled';
      this.setData({
        list: list
      })
    }
    this.sum();
  },

  sumRadioClick: function () {
    var list = this.data.list;
    if (this.data.sumChecked) {
      var checked = false;
      for (var k=0;k<list.length;k++) {
        if (list[k].checked) {
          list[k].checked = false;
        }
        var sl = list[k].list;
        for (var i=0;i<sl.length;i++) {
          if (sl[i].checked) {
            list[k].list[i].checked = false;
          }
        }
      }
    } else {
      var checked = true;
      for (var k = 0; k < list.length; k++) {
        if (!list[k].checked) {
          list[k].checked = true;
        }
        var sl = list[k].list;
        for (var i = 0; i < sl.length; i++) {
          if (!sl[i].checked) {
            list[k].list[i].checked = true;
          }
        }
      }
    }
    this.setData({
      list: list,
      sumChecked: checked
    })
    this.sum();
  },
  /**
   * 计算购物车中已选择的商品总价
   */
  sum: function () {
    var list = this.data.list;
    var count = 0;
    var sum = 0;
    var salesPrice = 0;
    for (var k=0;k<list.length; k++) {
      var sl = list[k].list;
      for (var i=0;i<sl.length; i++) {
        if (sl[i].checked) {
          count = parseInt(count) + parseInt(sl[i].count);
          sum = parseFloat(sum) + (parseInt(sl[i].count) * parseFloat(sl[i].price));
          salesPrice = parseFloat(sl[i].salesPrice) + (parseInt(sl[i].count) * parseFloat(sl[i].salesPrice));
        }
      }
    }
    sum = Math.floor(sum * 100) / 100;
    salesPrice = Math.floor(salesPrice * 100) / 100;
    if (salesPrice <= 0) {
      salesPrice = "0.00";
    }
    if (sum <= 0) {
      sum = "0.00"
    }
    this.setData({
      count: count,
      sum: sum,
      salesPrice: salesPrice
    })
  },

  touchStart: function (e) {
    var list = this.data.list;
    //开始触摸时 重置所有删除
    for (var k=0;k<list.length;k++) {
      var sl = list[k].list;
      for (var i=0;i<sl.length;i++) {
        if (sl[i].isTouchMove) {
          list[k].list[i].isTouchMove = false;
        }
      }
    }
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: list
    })
  },

  touchMove: function (e) {
    var list = this.data.list;
    var si = e.target.dataset.si;
    var pi = e.target.dataset.pi;
    var startX = this.data.startX; //开始X坐标
    var startY = this.data.startY; //开始Y坐标
    var touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标
    var touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标
    var angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    if (Math.abs(angle) < 3) {
      console.log('角度小于X度')
      return;
    }
    for (var k=0;k<list.length;k++) {
      if (k == si) {
        var sl = list[si].list;
        for (var i=0;i<sl.length;i++) {
          if (i == pi) {
            if (touchMoveX > startX) {//右滑
              list[si].list[pi].isTouchMove = false
            } else { //左滑
              list[si].list[pi].isTouchMove = true
            }
          }
        }
      }
    }
    this.setData({
      list: list
    })
  },
  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
 angle: function (start, end) {
    var _X = end.X - start.X;
    var _Y = end.Y - start.Y;
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI); //返回角度 Math.atan()返回数字的反正切值
  },
  /**
   * 删除事件
   */ 
  del: function (e) {
    var si = e.target.dataset.si;
    var pi = e.target.dataset.pi;
    var list = this.data.list;
    for (var k=0;k<list.length;k++) {
      if (k == si) {
        var sl = list[k].list;
        sl.splice(pi,1);
        if (sl.length == 0) {
          list.splice(k,1);
        }
      }
    }
    this.setData({
      list: list
    })
    this.sum();
  },
  toHome: function () {
    wx.switchTab({
      url: '../index/index',
    })
  }
})