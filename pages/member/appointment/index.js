// pages/member/appointment/index.js
var a = getApp(), e = a.requirejs("core"), i = a.requirejs("foxui"), s = a.requirejs("biz/diyform"), a = a.requirejs("jquery");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    diypages: {},
    diyform: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log(this);
    var mobile = options.mobile;
    var that = this;
    that.diyform();
    that.setData({
      mobile: mobile
    })
  },
  diyform: function (){
    var a = this;
    e.get('appointment/index',a,function(c){
      console.log(c);
      if (c.error == 0){        
        a.setData({
          diyform: {
            f_data: c.f_data,
            fields: c.fields,                      
          },
          openbind: c.openbind,
        })
      }
    })
  },
  DiyFormHandler: function (t) {
    return s.DiyFormHandler(this, t);
  },
  
  submit: function(){
    console.log(this);
    var i = this;
    console.log(i.data.mobile);
    var o={
      diydata:i.data.diyform.f_data,
      mobile:i.data.mobile,
    }
    wx.showModal({
      title: '提示',
      content: '确认提交吗？',
      success(res) {
        if (res.confirm) {
          e.post('appointment/submit', o, function (c) {
            console.log(c);
            if (c.error == 0) {
              wx.redirectTo({
                url: '/pages/member/index/index',
              })
            } else {
              e.alert(c.result.message);
            }
          })
        } else if (res.cancel) {
          diydata: i.data.diyform.f_data;
        }
      }
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