var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery");
Page({
  data: {
    root:'index',
    advs: 0,
    cate: 0,
    rec: 0,
  },
  onLoad: function () {
    var ts = this;
    wx.showLoading({
      title: '加载中',
    })
      
    a.get("sns/main", {}, function (a) {
      ts.setData({
        advs: a.advs,
        cate: a.cate,
        rec: a.rec,
        root: "index",
      })
      wx.hideLoading()
    })
  },
  onShareAppMessage: function () {

  }
})