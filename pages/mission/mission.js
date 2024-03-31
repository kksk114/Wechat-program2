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
    unfinishedList:[
      { "id": 1, "listPic": "https://api.mofun365.com:8888/images/goods/1555850845474.jpg", "missionName": "微信小程序开发图解案例教程"},
      { "id": 2, "listPic": "https://api.mofun365.com:8888/images/goods/1555851154057.jpg", "missionName": "微信小程序开发全案精讲"},
      { "id": 3, "listPic": "https://api.mofun365.com:8888/images/goods/1555851345937.jpg", "missionName": "第一行代码 Java" }
    ]
,
    finishedList: [
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
    app.globalData.unfinishedList = unfinishedList;
    app.globalData.finishedList=finishedList;
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
        var unfinishedList = mission.unfinishedList;
        var finishedList = mission.finishedList;
        page.setData({ unfinishedList:unfinishedList });
        page.setData({ finishedList:finishedList });
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
    var unfinishedList = JSON.stringify(this.data.unfinishedList);
    var finishedList = JSON.stringify(this.data.finishedList);
    wx.navigateTo({
      url: '../missionList/missionList?id=' + id + '&type=' + type + '&unfinishedList=' + unfinishedList  + '&finishedList=' + finishedList,
    })
  },
  seeDetail: function (e) {
    var missionId = e.currentTarget.id;
    wx.navigateTo({
      url: '../missionDetail/missionDetail?missionId=' + missionId,
    })
  },
  searchInput:function(e){
    wx.navigateTo({
      url: '../search/search',
    })
  }
})