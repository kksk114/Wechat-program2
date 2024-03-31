var app = getApp();
var host = app.globalData.host;
Page({
  data: {
    result: [],
    name:'',
    goodsNames:[
	  { "goodsName": "机器学习"},
      { "goodsName": "Spring Cloud"},
      { "goodsName": "网站" },
      { "goodsName": "Redis" },
      { "goodsName": "Memcached" },
      { "goodsName": "Vue" },
      { "goodsName": "Spring MVC" },
      { "goodsName": "小程序" },
      { "goodsName": "Oracle" },
      { "goodsName": "Java" }
]
  },
  onLoad:function(e){
     this.hotSearch();
  },
  hotSearch:function(){
    var that = this;
    wx.request({
      url: host + '/api/hotSearch/getHotSearchList',
      method: 'GET',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var goodsNames = res.data.data;
        console.log(goodsNames);
        that.setData({ goodsNames: goodsNames });
      }
    })
  },
  formSubmit:function(e){
    var that= this;
    var goodsName = e.detail.value.goodsName;
	//演示用数据
    var array = [
      { "id": 1, "goodsName": "微信小程序开发图解案例教程" },
      { "id": 2, "goodsName": "微信小程序开发全案精讲" }
    ];

	/*
    if (goodsName != "") {
      wx.request({
        url: host + '/api/goods/getGoodsList',
        method: 'GET',
        data: { "goodsName": goodsName },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var result = res.data.data;
          that.setData({ result: result });
        }
      })
    }
	*/
  },
  refresh:function(){
    this.hotSearch();
  },
  seeDetail: function (e) {
    console.log(e)
    var bookId = e.currentTarget.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + bookId,
    })
  }
})