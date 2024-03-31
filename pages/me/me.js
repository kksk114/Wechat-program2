var app = getApp();
var host = app.globalData.host;
Page({
  data: {
    Name: '立即注册'
  },
  onLoad: function(options) {
    this.checkLogin();
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },
  checkLogin: function() {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          // 发送 res.code 到后台换取 openId
          wx.request({
            url: host + '/login', 
            method: 'POST',
            data: {
              code: res.code
            },
            success: function(response) {
              if (response.data.registered) { 
                that.setData({
                  Name: response.data.Name 
                });
              } else {
                wx.navigateTo({
                  url: '../register/register',
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  nav: function(e) {
    var id = e.currentTarget.id;
    var status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '../myOrder/myOrder?id=' + id + '&status=' + status
    })
  },
  opinion: function(e) {
    wx.navigateTo({
      url: '../opinion/opinion'
    })
  },
  updatePwd: function(e) {
    wx.navigateTo({
      url: '../updatePwd/updatePwd'
    })
  },
  clearStore:function(e){
    wx.clearStorageSync();
    wx.showToast({
      title: '清除缓存成功',
      icon: 'success',
      duration: 1000
    })
    wx.reLaunch({
      url: '../me/me'
    })
  }
})