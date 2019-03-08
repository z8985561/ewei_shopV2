var t = getApp(), e = t.requirejs("core"), i = t.requirejs("foxui"), a = t.requirejs("jquery");
Page({
  data: {
    member: {},
    binded: !1,
    endtime: 0,
    postData: {},
    submit: !1,
    subtext: "立即验证",
    is_app: 0,
  },
  onLoad: function (i) {
    t.url(i),
      this.getInfo()
  },
  getInfo: function () {
    var t,
      i = this;
    e.get("member/bind", {}, function (e) {
      console.log(e);
      if (e.error) {
        wx.showModal({
          title: '提示',
          content: e.message,
          success() {
            wx.navigateTo({
              url: "/pages/member/appointment/index"
            });
          }
        })
      } else {
        var a = {
          member: e.member,
          binded: e.binded,
          endtime: e.endtime,
          show: !0
        };
        a.postData = {
          mobile: "",
          code: "",
          is_app:1,
        },
          i.setData(a),
          e.endtime > 0 && i.endTime(),
          t = e.binded ? "更换验证手机号" : "验证手机号",
          wx.setNavigationBarTitle({
            title: t
          })
      }
    }, !0, !0, !0)
  },
  endTime: function () {
    var t = this,
      e = t.data.endtime;
    if (e > 0) {
      t.setData({
        endtime: e - 1
      });
      setTimeout(function () {
        t.endTime()
      }, 1e3)
    }
  },
  inputChange: function (t) {
    var i = this.data.postData,
      s = e.pdata(t).type,
      o = t.detail.value;
    i[s] = a.trim(o),
      this.setData({
        postData: i
      })
  },
  getCode: function (t) {
    var s = this;
    console.log(s);
    if (!(s.data.endtime > 0)) {
      var o = s.data.postData.mobile;
      if (!a.isMobile(o))
        return void i.toast(s, "请填写正确的手机号");
      e.get("sms/changemobie", {
        mobile: o
      }, function (t) {
        if (0 != t.error)
          return void i.toast(s, t.message);
        i.toast(s, "短信发送成功"),
          s.setData({
            endtime: 60
          }),
          s.endTime()
      }, !0, !0, !0)
    }
  },
  submit: function (t) {
    var mobile = this.data.postData.mobile;
    if (!this.data.submit) {
      var s = this,
        o = this.data.postData;
        console.log(o);
      if (!a.isMobile(o.mobile))
        return void i.toast(this, "请填写正确的手机号");
      if (5 != o.code.length)
        return void i.toast(this, "请填写5位短信验证码");     
      this.setData({
        submit: !0,
        subtext: "正在验证..."
      }),
        e.post("member/bind/submit", o, function (t) {
          console.log(t);
          return 92001 == t.error || 92002 == t.error ? void e.confirm(t.message, function () {
            o.confirm = 1,
              e.post("member/bind/submit", o, function (t) {
                console.log(t);
                t.error > 0 ? (i.toast(s, t.message), s.setData({
                  submit: !1,
                  subtext: "立即验证",
                  "postData.confirm": 0
                })) : wx.navigateBack()
              }, !0, !0, !0)
          }) :  t.error==90000 ? (i.toast(s, t.message), void s.setData({
            submit: !1,
            subtext: "立即验证"
          })) : (wx.showModal({
            title: '提示',
            content: '验证成功',
            complete: function () {
              wx.redirectTo({
                url: '/pages/member/appointment/index?mobile=' + mobile,
              })
            }
          }))
        }, !0, !0, !0)
    }
  }
})
