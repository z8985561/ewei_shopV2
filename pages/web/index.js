Page({
  data: {
    url: ""
  },
  onLoad: function (o) {
    if ("sign" == o.module) e = o.domain + "?" + decodeURIComponent(o.params) + "&uid=" + o.mid+"&openid="+o.openid; else var e = decodeURIComponent(o.url);
    console.log(e), this.setData({
      url: e
    });
  }
});