var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery");
Page({
  data:({
    id : {},
    title : {},
    bid : {},
    nicaname : {},
    rpid : {},
    images: [],
    imgs: []
  }),
  onLoad : function (options){
    console.log(options);
    var ti = options.title ? options.title :'' ;
    var ni = options.nickname ? options.nickname :'';
    var rp = options.rpid ? options.rpid : '';
    this.setData({
      title : ti,
      nickname : ni,
      id : options.id,
      bid : options.bid,
      rpid : rp,
    })
  },
  formSubmit: function (o) {
    var ts = this;
    var images = ts.data.images;
    var c = o.detail.value.contents.length;
    if(c >= 10 && c<=1000){
      a.get("sns/board/comment", { 'values': o.detail.value , 'images' : images}, function (a) {
        if (a.res == 1) {
          wx.navigateTo({
            url: 'index?id=' + a.bid,
          })
        }
      })
    } else {
      wx.showToast({
        title: '内容字数不符合要求',
        icon: 'none',
        duration: 2000
      })
    }
  },
  upload: function (t) {
    var e = this,
      i = a.data(t),
      s = i.type,
      n = e.data.images,
      o = e.data.imgs,
      r = i.index;
    "image" == s ? a.upload(function (t) {
      n.push(t.filename), o.push(t.url), e.setData({
        images: n,
        imgs: o
      })
    }) : "image-remove" == s ? (n.splice(r, 1), o.splice(r, 1), e.setData({
      images: n,
      imgs: o
    })) : "image-preview" == s && wx.previewImage({
      current: o[r],
      urls: o
    })
  }
})