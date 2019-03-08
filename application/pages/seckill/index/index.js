var t = getApp(), e = t.requirejs("core"), i = t.requirejs("foxui"),timeFormat= t.requirejs("util");
Page({
  data: {
    icons: t.requirejs("icons"),
    now: 0,
    show: 1,
    list: [],
    page: 1,
    times:[],
    timeid:'',
    taskid:'',
    roomid:''
  },

  onLoad: function (options) {
    var t = this;
    var ee = e;
    console.log(options);
    e.get("seckill/index/main",options, function (e) {
      console.log(e);
      if(e.error==0){
        t.setData({
          rooms: e.rooms,
          times: e.times,
          taskid: e.taskid,
          roomid: e.roomid,
          timeid: e.timeid,
          timeindex:e.timeindex
        });
        t.get_goods();
      }else{
        ee.alert(e.status, "loading")
      }
      
    });
      // t.setData({
      //   options: options
      // })  
  },
  get_goods: function (options) {
    var t = this;
    var lasttime='';
    var now = parseInt(Date.now() / 1e3)
    var taskid = options ? options.taskid : t.data.taskid,
        roomid = options ? options.roomid : t.data.roomid,
        timeid = options ? options.timeid : t.data.timeid;
    e.get("seckill/index/get_goods",{taskid:taskid,roomid:roomid,timeid:timeid}, function (e) {

      t.setData({
        list: e.result,
        time: e.result.time
      })
      console.log(now);
      
      if (1 == e.status){
        if (e.result.time.status == 0) {
          lasttime = e.result.time.endtime - now
        } else {
          lasttime = e.result.time.starttime - now
        }
        clearInterval(t.data.timer)
        var r = setInterval(function () {
          lasttime -= 1;
          if(lasttime>0){
            t.formatSeconds(lasttime)
          }
        }, 1e3)
        t.setData({
          timer:r
        })
      }else{
        ee.toast("出错了", "loading")
      }
    })
  },
  topBarItemClick:function(e){
    var t=this;
    console.log(e);
    console.log(e.currentTarget.dataset);
    var taskid=e.currentTarget.dataset.taskid,
        timeid=e.currentTarget.dataset.timeid,
        roomid=e.currentTarget.dataset.roomid,
        options=e.currentTarget.dataset;
    t.setData({
      timeindex:e.currentTarget.dataset.index
    })
    t.get_goods(options);

  },
  formatSeconds:function(value) {
    var t=this;
    var theTime = parseInt(value);
    var theTime1 = 0;
    var theTime2 = 0;
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60)
      }
    }

    t.setData({
        hour: theTime2 < 10 ? '0' + theTime2 : theTime2,
        min: theTime1 < 10 ? '0' + theTime1 : theTime1,
        sec: theTime < 10 ? '0' + theTime : theTime
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})