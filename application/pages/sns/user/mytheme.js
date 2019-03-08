var t = getApp(), a = t.requirejs("core"), e = t.requirejs
Page({
  data : {
    post : {},
  },
  onLoad : function(options){
    var ts = this;
    a.get("sns/user/mytheme",{},function(a){
      console.log(a);
      ts.setData({
        post : a.post,
      })
    })
  },
})