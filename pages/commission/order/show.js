var t = getApp(), a = t.requirejs("core"), e = t.requirejs("biz/order");
Page({
  data: {
    icons: t.requirejs("icons"),
    status: "",
    list: [],
    page: 1,
    code: !1,
    cancel: e.cancelArray,
    cancelindex: 0
  },
  onLoad: function (a) {
    this.setData({
      options: a,
      status: a.status || ""
    }),
    t.url(a),
    console.log(a);
    this.get_list(a)
  },
  get_list: function (options) {
    var t = this;
    t.setData({
      loading: !0
    }),
      a.get("commission/order/get_orderlist", {
        page: t.data.page,
        status: t.data.status,
        mopenid:options.mid
      }, function (e) {
        0 == e.error ? (t.setData({
          loading: !1,
          show: !0,
          total: e.total,
          empty: !0
        }), e.list.length > 0 && t.setData({
          page: t.data.page + 1,
          list: t.data.list.concat(e.list)
        }), e.list.length < e.pagesize && t.setData({
          loaded: !0
        })) : a.toast(e.message, "loading")
      }, this.data.show)
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.get_list()
  },
  selected: function (t) {
    var e = a.data(t).type;
    var options=this.data.options;
    this.setData({
      list: [],
      page: 1,
      status: e,
      empty: !1
    }),
      this.get_list(options)
  },
})
