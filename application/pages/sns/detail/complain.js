var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery");
Page({
  data:({
    id : {},
    cates : {},
    nickanme : {},
    pid : {},
  }),
  onLoad : function (options) {
    var ts = this;
    a.get("sns/board/complain",{},function(a){
      
      ts.setData({
        id : options.id,
        nickname : options.nickname,
        pid : options.pid,
        cates : a.cates,
      })
    })
  },
  formSubmits: function (o) {
   
    var ts= this;
    var cont = o.detail.value.content.length;
    var cate = o.detail.value.complaincate.length;
    if (cont>=10 && cont<=1000){
      if(cate){
        a.get("sns/board/subcomplain", { 'values': o.detail.value }, function (a) {   

          if (a.res == 1) {
            wx.navigateTo({
              url: 'index?id=' + a.id,
            })
          } else {
            wx.showToast({
              title: '提交投诉失败，请重试！',
              icon: 'none',
              duration: 2000
            })
          }
        })
      } else {
        wx.showToast({
          title: '请选择分类',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '内容字数不对',
        icon: 'none',
        duration: 2000
      })
    }
  }
})