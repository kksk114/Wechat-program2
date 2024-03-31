var app = getApp();
var host = app.globalData.host;
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    missionCount1: 5, 
    missionCount2: 0, 
    imgUrls: [
      "/pages/images/haibao/1.jpg",
      "/pages/images/haibao/2.jpg",
      "https://api.mofun365.com:8888/images/goods/1555850845474.jpg"
    ],
    hotList:[
      { "id": 1, "listPic": "https://api.mofun365.com:8888/images/goods/1555850845474.jpg", "missionName": "微信小程序开发图解案例教程"},
      { "id": 2, "listPic": "https://api.mofun365.com:8888/images/goods/1555851154057.jpg", "missionName": "微信小程序开发全案精讲"},
      { "id": 3, "listPic": "https://api.mofun365.com:8888/images/goods/1555851345937.jpg", "missionName": "第一行代码 Java" }
    ]
,
    spikeList:[
      { "id": 4, "listPic": "https://api.mofun365.com:8888/images/goods/1555851497575.jpg", "missionName": "Android原理解析与开发指南"},
      { "id": 5, "listPic": "https://api.mofun365.com:8888/images/goods/1555851661073.png", "missionName": "响应式Web开发项目教程"},
      { "id": 6, "listPic": "https://api.mofun365.com:8888/images/goods/1555851817322.jpg", "missionName": "第一行代码 C语言" }
    ]
,
    bestSellerList: [
      { "id": 7, "listPic": "https://api.mofun365.com:8888/images/goods/1555851965264.jpg", "missionName": "前端HTML+CSS修炼之道" },
      { "id": 8, "listPic": "https://api.mofun365.com:8888/images/goods/1555850845474.jpg", "missionName": "微信小程序开发图解案例教程" },
      { "id": 9, "listPic": "https://api.mofun365.com:8888/images/goods/1555851154057.jpg", "missionName": "微信小程序开发全案精讲" }
    ]
,
    host: host
  },
  onLoad: function (options) {
    var page = this;
    page.getBannerList();
    page.getBookList();
    app.globalData.hotList = hotList;
    app.globalData.spikeList=spikeList;
    app.globalData.bestSellerList=bestSellerList;
  },
  getBannerList: function () {
    var page = this;
    wx.request({
      url: host + '/api/banner/getBannerList?type=0',
      method: 'GET',
      data: { },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var code = res.data.code;
        var list = res.data.data;
        if (code == '0000') {
          var code = res.data.code;
          var list = res.data.data;
          if (code == '0000') {
            var imgUrls = new Array();
            for (var i = 0; i < list.length; i++) {
              imgUrls.push(host + "/" + list[i].url);
            }
            page.setData({ imgUrls: imgUrls });
          } 
        } 
      }
    })
  },
  getMissionList: function () {
    var page = this;
    wx.request({
      url: host + '/api/mission/getMissionList',
      method: 'GET',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var mission = res.data.data;
        var hotList = mission.rmjs;
        var spikeList = mission.mssk;
        var bestSellerList = mission.cxsj;
        page.setData({ hotList: hotList });
        page.setData({ spikeList: spikeList });
        page.setData({ bestSellerList: bestSellerList });
        mission.forEach(function(mission) {
          if (mission.type === 1) {
            page.setData({ missionCount1: page.data.missionCount1 + 1 });
          } else if (mission.type === 2) {
            page.setData({ missionCount2: page.data.missionCount2 + 1 });
          } 
        });
      }
    })
  },
  more: function(e) {
    var id = e.currentTarget.id;
    var type = e.currentTarget.dataset.type;
    var hotList = JSON.stringify(this.data.hotList);
    var spikeList = JSON.stringify(this.data.spikeList);
    var bestSellerList = JSON.stringify(this.data.bestSellerList);
    wx.navigateTo({
      url: '../goods/goods?id=' + id + '&type=' + type + '&hotList=' + hotList + '&spikeList=' + spikeList + '&bestSellerList=' + bestSellerList,
    })
  },
  seeDetail: function (e) {
    var goodsId = e.currentTarget.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goodsId,
    })
  },
  searchInput:function(e){
    wx.navigateTo({
      url: '../search/search',
    })
  }
})