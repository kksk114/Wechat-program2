var app = getApp();
var host = app.globalData.host;
Page({
  data: {
    currentTab: 0,
    mission: null,
    host: host,
    hotList: null,
    spikeList: null,
    bestSellerList: null
  },
  onLoad: function (options) {
    var type = options.id;
    console.log(type);
    this.setData({ currentTab: type });
    if (options.hotList && options.spikeList && options.bestSellerList) {
      this.setData({
        hotList: JSON.parse(options.hotList),
        spikeList: JSON.parse(options.spikeList),
        bestSellerList: JSON.parse(options.bestSellerList)
      });
    }
    this.getBookList(type);  
      this.getBookList('hotList');  
      this.getBookList('spikeList');  
      this.getBookList('bestSellerList');  

  },
  getBookList: function (type) {
    var page = this;
    wx.request({
      url: host + '/api/goods/getGoodsListByType',
      method: 'GET',
      data: { type: type},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var mission = res.data.data;
        console.log(mission);
        page.setData({ mission:mission });
      }
    })
  },
  switchNav: function (e) {
    var page = this;
    var type = e.target.dataset.current;
    if (this.data.currentTab == type) {
      return false;
    } else {
      page.setData({ currentTab: type });
      this.getBookList(type);
    }
  },
  seeDetail:function(e){
    var goodsId = e.currentTarget.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goodsId,
    })
  }, getBookList: function (type) {
    var page = this;
    wx.request({
      url: host + '/api/goods/getGoodsListByType',
      method: 'GET',
      data: { type: type},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var books = res.data.data;
        console.log(books);
        if (type == 'hotList') {
          page.setData({ hotList: books });
        } else if (type == 'spikeList') {
          page.setData({ spikeList: books });
        } else if (type == 'bestSellerList') {
          page.setData({ bestSellerList: books });
        }
      }
    });
  },
  searchInput: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})