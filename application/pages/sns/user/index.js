var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery");
Page({
  data:{
    root:'',
    icons: t.requirejs("icons"),
    member : {},
    userinfo : {},
    count : {},
    posts : {},
    boards : {},
    replys : {},
    level : {},
    ihidden : true,
    placeinput : '请输入内容',
  },

  onLoad: function(options) {
    var ts = this;
    wx.showLoading({
      title: '加载中',
    })
    a.get("sns/user/main",{'id': options.id},function(a){
      console.log(a)
      ts.setData ({
        root: 'userinfo',
        member : a.member,
        userinfo : a.userinfo,
        count : a.count,
        posts : a.posts,
        boards : a.boards,
        replys : a.replys,
        level : a.level,
      })
      wx.hideLoading();
    })
  },
  changeSign: function(e){
    this.setData({
      ihidden: !this.data.ihidden,
      placeinput : e.currentTarget.dataset.value,
    })
  },
  cancel: function () {
    this.setData({
      ihidden: true
    });
  },
  confirm: function (e) {
    var ts = this;
    console.log(e.currentTarget.dataset.sign);
    a.get("sns/user/sign", { 'sval':e.currentTarget.dataset.sign},function(a){
      // console.log(e.currentTarget.dataset.sign);
      ts.setData({
        ihidden: true,
      })
      wx.navigateTo({
      url: 'index'
      })
    })
    
  },
  getSign: function(e){
    var sval = e.detail.value;
    this.setData({
      vsign : sval,
    })
  }
})