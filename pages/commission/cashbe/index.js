var t = getApp(),
  a = t.requirejs("core");
Page({
  data: {
    status: 4,
    page: 1,
    list: []
  },
  onLoad: function () {
    this.getList()
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList()
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  getList: function () {
    var t = this;
    a.get("commission/record/get_list", {
      page: t.data.page,
      status: t.data.status
    }, function (a) {
      var s = {
        total: a.total,
        pagesize: a.pagesize,
        commissioncount: a.commissioncount,
        textyuan: a.textyuan,
        textcomm: a.textcomm,
        textcomd: a.textcomd,
        record: a.record,
        show: !0
      };
      a.list.length > 0 && (s.page = t.data.page + 1, s.list = t.data.list.concat(a.list), a.list.length < a.pagesize && (s.loaded = !0)), t.setData(s), wx.setNavigationBarTitle({
        title: a.textcomd + "(" + a.total + ")"
      })
    }, this.data.show)
  },
  myTab: function (t) {
    var s = this,
      e = a.pdata(t).status;
    s.setData({
      status: e,
      page: 1,
      list: []
    }), s.getList()
  }
})