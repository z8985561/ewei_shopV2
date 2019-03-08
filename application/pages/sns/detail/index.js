var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery"), wxparse = t.requirejs("wxParse/wxParse");
Page({
  data: {
    posts: {},
    like : 0,
    replycount : 0,
    comment : {},
    manager : {},
    isadmin : false,
  },
  onLoad: function (options) {
    var ts = this;
    wx.showLoading({
      title: '加载中',
    })
    a.get("sns/board/detail", { 'id': options.id }, function (a) {
      console.log(a);
      wxparse.wxParse("content", "html", a.posts.post.content, ts, "5")
      ts.setData({
        posts : a.posts,
        like : a.like,
        replycount: a.replycount,
        comment: a.comment,
        manager: a.manager,
        isadmin : a.isadmin,
      })
      wx.hideLoading()
    })
  },
  changeLive: function(e){
    // console.log(1);
    a.get("sns/board/changelike", { 'id': e.currentTarget.dataset.pid, 'postid': e.currentTarget.dataset.postid},function(a){
      console.log(a)
      wx.redirectTo({
       url : "index?id=" + a.id,
      })
    })
  },
  btnDelete: function(e){
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          a.get("sns/board/btndelete", { 'id': e.currentTarget.dataset.postid }, function (a) {
            wx.redirectTo({
              url: "../topiclist/index?id=" + a.bid,
            })
          })
        }
      }
    }) 
  },
  btnBest: function(e){
    var status = e.currentTarget.dataset.status;
    wx.showModal({
      title: '提示',
      content: '确定取消精华！',
      success: function (res) {
        if (res.confirm) {
          a.get("sns/board/btnbest", { 'id': e.currentTarget.dataset.postid }, function (a) {
            console.log(a)
            wx.redirectTo({
              url: "index?id=" + a.id,
            })
          })
        }
      }
    })
  },
  btnTop: function(e){
    wx.showModal({
      title: '提示',
      content: '确定设置置顶！',
      success: function (res) {
        if (res.confirm) {
          a.get("sns/board/btntop", { 'id': e.currentTarget.dataset.postid }, function (a) {
            console.log(a)
            wx.redirectTo({
              url: "index?id=" + a.id,
            })
          })
        }
      }
    })
  },
  delcomment: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定删除回复吗？',
      success: function (res) {
        if (res.confirm) {
          a.get("sns/board/delcomment", { 'id': e.currentTarget.dataset.postid }, function (a) {
            wx.redirectTo({
              url: "index?id=" + a.id,
            })
          })
        }
      }
    })
  },
  btnallTop: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定设置全版置顶！',
      success: function (res) {
        if (res.confirm) {
          a.get("sns/board/btnalltop", { 'id': e.currentTarget.dataset.postid }, function (a) {
            console.log(a)
            wx.redirectTo({
              url: "index?id=" + a.id,
            })
          })
        }
      }
    })
  },
  btnallBest: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定设置全版精华！',
      success: function (res) {
        if (res.confirm) {
          a.get("sns/board/btnallbest", { 'id': e.currentTarget.dataset.postid }, function (a) {
            console.log(a)
            wx.redirectTo({
              url: "index?id=" + a.id,
            })
          })
        }
      }
    })
  },
  onShareAppMessage: function () {

  }
})