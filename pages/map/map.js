Page({
  data: {
    latitude: 0,
    longitude: 0,
    id: '',
    circles: [{
      latitude: 0,  // 初始化任务位置的纬度
      longitude: 0,  // 初始化任务位置的经度
      color: '#FF0000DD',
      fillColor: '#7cb5ec88',
      radius: 50,
      strokeWidth: 1
    }],
    markers: [{
      id: 1,
      latitude: 0,  // 初始化任务位置的纬度
      longitude: 0,  // 初始化任务位置的经度
      iconPath: '/images/icons/地点.png',  // 任务位置的图标
      width: 20,
      height: 20
    }]
  },
    
  moveToCurrentLocation: function() {
    const mapCtx = wx.createMapContext('map');
    mapCtx.moveToLocation();
  },
  centerLocation: function() {
    const mapCtx = wx.createMapContext('map');
    mapCtx.moveToLocation();
  },
  onLoad: function(options) {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          // 更新任务位置的经纬度为当前位置的经纬度
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 50,
            strokeWidth: 1
          }],
          // 添加一个标记来表示当前位置
          markers: [{
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '/images/icons/系统-位置配置.png', // 当前位置的图标
            width:50,
            height:50,
          }, {
            id: 1,
            latitude: res.latitude,  // 任务位置的纬度
            longitude: res.longitude,  // 任务位置的经度
            iconPath: '/images/icons/地点.png',  // 任务位置的图标
            width: 50,
            height: 50
          }]
        });
        this.centerLocation();
      }
    });
  },
  navigate: function() {
    // 导航到任务位置
    const destination = this.data.markers.find(marker => marker.id === 1);
    wx.openLocation({
      latitude: destination.latitude,
      longitude: destination.longitude,
      name: '任务位置',
      scale: 18
    });
  },
  onReady: function() {
    this.centerLocation();
  },
  checkIn: function() {
    wx.chooseMedia({
      count:9,
      mediaType: ['image'],  // 可以选择 'image' 或者 'video'
      sourceType: ['album', 'camera'],  // 可以选择来源是相册还是相机
      
      camera: 'back',  // 默认拉起的是后置摄像头，可以通过前置或者后置来指定
      success: function(res) {
        // 返回所选媒体文件的临时文件路径列表
        const tempFilePaths = res.tempFiles
          console.log(res.tempFiles.tempFilePath)
          console.log(res.tempFiles.size)
        
      }
    })
  },
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
})