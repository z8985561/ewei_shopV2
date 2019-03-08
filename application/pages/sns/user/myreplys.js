var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery");
Page({
  data:{
    replys : {},
  },
  onLoad : function (){
    var ts = this;
    a.get("sns/user/myreplys",{},function(a){
      console.log(a);
      ts.setData({
        replys : a.replys,
      })
    })
  },

  goBoard : function (e){
    // console.log(e.currentTarget.dataset.pid);
    wx.navigateTo({
      url: '/application/pages/sns/detail/index?id=' + e.currentTarget.dataset.pid
    })
  },

  deleteComment: function(e){
    a.get("sns/user/delcomment", { 'id': e.currentTarget.dataset.delid }, function (a) {
      wx.navigateTo({
        url: "myreplys",
      })
    })
  }
})