var app = getApp();
var host = app.globalData.host;
var hotList = app.globalData.hotList;
var spikeList = app.globalData.spikeList;
var bestSellerList = app.globalData.bestSellerList;
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [
      "/pages/images/books/hot-1.jpg"
    ],
    currentTab: 0,
    goodsDetail: null,
    num: 1,
    cartNum: 0
  },
  onLoad: function(e) {
    var goodsId = e.goodsId;
    this.loadGoodsDetail(goodsId);
    this.loadCart();
  },
  loadGoodsDetail: function(goodsId) {
    if (goodsId != "") {
      var that = this;
      wx.request({
        url: host + '/api/goods/getGoodsDetail',
        method: 'GET',
        data: {
          "goodsId": goodsId
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          var goodsDetail = res.data.data;
          that.setData({
            goodsDetail: goodsDetail
          });
        }
      })
    }
  },
  switchNav: function(e) {
    var index = e.currentTarget.id;
    this.setData({
      currentTab: index
    });
  },
  toMap: function(e) {
    var goodsId = e.currentTarget.id;
      wx.navigateTo({
        url: '../map/map?goodsId=' + goodsId + '&num=' + this.data.num
      })
  },
  seeCart: function(e) {
    console.log(e)
    wx.redirectTo({
      url: '../shoppingcart/shoppingcart'
    })
  },
  addGoods: function(e) {
    var num = this.data.num;
    this.setData({
      num: num + 1
    });
  },
  minusGoods: function(e) {
    var num = this.data.num;
    if (num > 1) {
      this.setData({
        num: num - 1
      });
    }
  },
  intocart: function(e) {
    var that = this;
    var goodsId = e.currentTarget.id;
    var userId = wx.getStorageSync("userId");
    if (userId != "") {
      var hotList = app.globalData.hotList;
    var goodsIndex = hotList.findIndex(item => item.id == goodsId);
    if (goodsIndex != -1) {
      // 将商品添加到 spikeList 中
      var goods = hotList[goodsIndex];
      app.globalData.spikeList.push(goods);
      // 从 hotList 中移除商品
      hotList.splice(goodsIndex, 1);
    }
      wx.request({
        url: host + '/api/cart/saveShoppingCart',
        method: 'GET',
        data: {
          'userId': userId,
          'goodsId': goodsId,
          'type': '0'
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          var code = res.data.code;
          if (code == '0000') {
            that.loadCart();
          }
        }
      })
    } else {
      wx.redirectTo({
        url: '../login/login'
      })
    }
  },
  loadCart: function() {
    var that = this;
    var userId = wx.getStorageSync("userId");
    if (userId != "") {
      wx.request({
        url: host + '/api/cart/getShoppingCartList',
        method: 'GET',
        data: {
          'userId': userId,
          'type': '0'
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res);
          var code = res.data.code;
          if (code == '0000') {
            var ret = res.data.data;
            that.setData({
              cartNum: ret.length
            });
          }
        }
      })
    }else{
      wx.redirectTo({
        url: '../login/login'
      })
    }
  }

})