var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery");
Page({
  data:{
    bid: {},
    images: [],
    imgs: []
  },
  onLoad: function(options){
    this.setData({
      bid : options.bid,
    })
  },
  formSubmit: function (o) {
    // console.log(a);
    var ts = this;
    var images = ts.data.images;
    var ti = o.detail.value.title.length;
    var ce = o.detail.value.contents.length;
    if(ti>=3 && ti<=25){
      if(ce>=10 && ce<=1000){
        a.get("sns/board/publish", { 'values': o.detail.value,'images' : images}, function (a) {
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
    } else {
      wx.showToast({
        title: '标题字数不符合要求',
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