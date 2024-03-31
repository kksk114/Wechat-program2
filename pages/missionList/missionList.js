var app = getApp();
var host = app.globalData.host;
Page({
  data: {
    currentTab: 0,
    mission: null,
    host: host,
    finishedList: null,
    unfinishedList: null
  },
  onLoad: function (options) {
    var type = options.id;
    console.log(type);
    this.setData({ currentTab: type });
    if (options.finishedList  && options.unfinishedList) {
      this.setData({
        finishedList: JSON.parse(options.finishedList),
        unfinishedList: JSON.parse(options.unfinishedList)
      });
    }
    this.getBookList(type);  
      this.getBookList('finishedList');   
      this.getBookList('unfinishedList');  

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
        if (type == 'finishedList') {
          page.setData({ finishedList: books });
        }  else if (type == 'unfinishedList') {
          page.setData({ unfinishedList: books });
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