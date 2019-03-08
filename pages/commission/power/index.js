var t = getApp(), a = t.requirejs("core"),foxui = t.requirejs('foxui');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.getAgentList();
  },

  getAgentList:function(){
    var that = this;
    a.get('commission/power/getAgentList',{
      page: that.data.page,
    },function(res){
        if(res.error ==0){
          var a = {
            total:res.total,
            pagesize:res.pagesize
          }
          if(res.list.length>0){
            a.page=that.data.page+1,
            a.list=that.data.list.concat(res.list)
            if(a.list.length>=res.total){
              a.loaded=1;
            }
            that.setData(a);
          }

        }else{
          foxui.toast(that,res.message);
        }
    })
  },
  showAgent:function(options){
    var that = this;
    var agentID= options.currentTarget.dataset.mid;
    wx.navigateTo({
      url: '/pages/commission/power/detail?agentid=' + agentID,
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
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getAgentList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})