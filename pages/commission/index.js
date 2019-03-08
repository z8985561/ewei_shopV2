//作者QQ:1026770372
var t = getApp(),
  e = t.requirejs("core");
Page({
  data: { ver: t.globalData.ver},
  onLoad: function (t) { },
  onShow: function () {
    this.getData()
  },
  getData: function () {
    var t = this;
    e.get("commission/index", {},
      function (e) {
        if (7e4 == e.error) return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
        e.show = !0,
          t.setData(e)
      })
  }
})