var t = getApp(), a = t.requirejs("core"), e = t.requirejs("jquery"), wxparse = t.requirejs("wxParse/wxParse"), o = t.requirejs("icons");
Page({
  data: {
    root:'',
    post:{},
    board: {},
    follow : {},
    boardtop : {},
  },
  onLoad: function (options) {
    var ts = this;
    wx.showLoading({
      title: '加载中',
    })
    a.get("sns/board/index",{'id':options.id},function(a){
      console.log(a);
      // var replyArr = a.post;
      // for (let i = 0; i < a.post.length; i++) {
      //   var content = 'content';
      //   var id = 'id';
      //   wxparse.wxParse('reply'+ i, 'html', replyArr[i].content, ts);
      //   wxparse.wxParse('replyid'+ i, 'html', replyArr[i].id, ts);
      //   if (i === replyArr.length - 1) {
      //     wxparse.wxParseTemArray("contents", 'reply', replyArr.length, ts)
      //     wxparse.wxParseTemArray("postid", 'replyid', replyArr.length, ts)
      //   }
      // }
      ts.setData({
        board: a.board,
        post: a.post,
        follow : a.follow,
        boardtop : a.boardtop,
      })
      wx.hideLoading()
    })
  },
  changeLike: function (e) {
    a.get("sns/board/changelike", { 'id': e.currentTarget.dataset.pid }, function (a) {
      wx.navigateTo({
        url: "index?id=" + a.bid,
      })
    })
  },
  changeFollow: function(e){
    a.get("sns/board/changefollow", { 'id': e.currentTarget.dataset.bid }, function (a) {
      wx.navigateTo({
        url: "index?id=" + a.id,
      })
    })
  },
  onShareAppMessage: function () {

  }
})