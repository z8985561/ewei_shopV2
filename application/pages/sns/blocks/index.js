var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery");
Page({
  data: {
    root:'',
    cate : {},
    rec : {},
    ids : 0,
  },
  onLoad: function (options) {
    var th = this;
    a.get("sns/cates/index", {'id':options.id }, function (a) {
      // console.log(a)
      th.setData({
        rec: a.rec,
        cate: a.cate,
        ids : a.id,
        root: 'cate',
      })
    })
  },
  changeCate: function(e){
    a.get("sns/cates/index", { 'id': e.currentTarget.dataset.pid }, function (a) {
      // console.log(a)
      wx.redirectTo({
        url: "index?id=" + a.id,
      })
    })
  }
})