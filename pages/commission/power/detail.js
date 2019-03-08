var t = getApp(), a = t.requirejs("core"), foxui = t.requirejs('foxui');;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: !0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options:options
    })
    this.getAgentDetail(options)
  },
  getAgentDetail:function(options){
    var that=this;
    a.get('commission/power/getAgentDetail',{
      mopenid: options.agentid
    },function(res){
      if(res.error==0){
        that.setData({
          info: res.memberinfo,
          membershow: res.membershow,
          diycommission:res.diycommission
        }) 
      }
    })
  },
  submit:function(options){
    var that=this;
    console.log(options);
    var magentid =options.currentTarget.dataset.magentid;
    a.get('commission/power/check',{
      magentid:magentid
    },function(res){
      if(res.error==0){
        wx.showModal({
          title: '提示',
          content: res.message,
          success:function(){
            wx.relaunch({
              url: '/pages/commission/power/index',
            })
          },
          fail:function(){
            wx.reLaunch({
              url: '/pages/commission/power/index',
            })
          }
        })
      }else{
        foxui.toast(that,res.message);
      }
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
  
  }
})