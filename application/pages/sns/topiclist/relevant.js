var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery");
// pages/topiclist/relevant.js
Page({
  data: {
    board : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ts = this;
    a.get("sns/board/relate",{},function(a){
      // console.log(a);
      ts.setData({
        board : a.board,
      })
    })
  }
})