var e = getApp(),
  t = e.requirejs("core"), o = e.requirejs("biz/diyform"), a = (e.requirejs("icons"), e.requirejs("foxui")),n = e.requirejs("jquery");
Page({
  data: {
    diyform: {},
    postData: {},
    showPicker: !1,
    pvalOld: [0, 0, 0],
    pval: [0, 0, 0],
    areas: [],
    noArea: !0,
  },
  onLoad: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        areas: e.getCache("cacheset").areas
      });
    }, 3e3);
  },
  onShow: function () {
    this.getData()
  },
  onChange: function (options) {
    var a = options.detail.value,
      i = t.pdata(options).type,
      r = this.data.postData;
      console.log(a,i)
    r[i] = n.trim(a), this.setData({
      postData: r
    })
  },
  getData: function () {
    var e = this;
    t.get("commission/register", {}, function (t) {
      console.log(t);
      if (70003 == t.error) return void wx.redirectTo({
        url: "/pages/commission/index"
      });
      t.show = !0, wx.setNavigationBarTitle({
        title: "申请成为" + t.set.texts.agent || "申请"
      }), e.setData(t)

      t.fields && e.setData({
        diyform: {
          fields: t.fields,
          f_data: t.f_data
        }
      })
    })
  },
  inputChange: function (e) {
    "realname" == e.target.id ? this.setData({
      "member.realname": e.detail.value
    }) : "mobile" == e.target.id ? this.setData({
      "member.mobile": e.detail.value
    }) : "weixin" == e.target.id && this.setData({
      "member.weixin": e.detail.value
    })
  },
  submit: function (e) {
    if (0 == this.data.template_flag) {
      if (!this.data.member.realname) return void t.alert("请填写,真实姓名!");
      if (!this.data.member.mobile) return void t.alert("请填写,手机号!");
      r = {
        realname: this.data.member.realname,
        mobile: this.data.member.mobile
      };
      
    } else if (1 == this.data.template_flag){
      r = this.data.postData
    } else {
      var a = this.data.diyform;
      o.verify(this, a) || t.alert("请检查必填项是否填写");
      var r = {
        memberdata: this.data.diyform.f_data,
        agentid: this.data.mid,
        icode: this.data.member.icode,
        weixin: this.data.member.weixin
      };
    }
    t.post("commission/register", r, function (e) {
      0 != e.error ? t.alert(e.message) : wx.redirectTo({
        url: 1 == e.check ? "/pages/commission/index" : "/pages/commission/register/index"
      });
    });
  },

  DiyFormHandler: function (t) {
    return o.DiyFormHandler(this, t)
  },
  selectArea: function (t) {
    return o.selectArea(this, t)
  },
  bindChange: function (t) {
    return o.bindChange(this, t)
  },
  onCancel: function (t) {
    return o.onCancel(this, t)
  },
  onConfirm: function (t) {
    if (this.data.template_flag==1000){
      return o.onConfirm(this, t);
    } else if (this.data.template_flag==1){
      var e = this.data.pval,
        a = this.data.areas,
        n = this.data.postData;
      n.city = a[e[0]].name + " " + a[e[0]].city[e[1]].name,
      console.log(n.city); 
      this.setData({
        postData: n,
        showPicker: !1
      })
    }
  },
  getIndex: function (t, e) {
    return o.getIndex(t, e)
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
  getCode: function (options) {
    var s = this;
    if (!(s.data.endtime > 0)) {
      var o = s.data.postData.mobile;
      if (!n.isMobile(o))
        return void a.toast(s, "请填写正确的手机号");
      t.get("sms/changemobie", {
        mobile: o
      }, function (res) {
        if (0 != res.error)
          return void a.toast(s, res.message);
        a.toast(s, "短信发送成功"),
          s.setData({
            endtime: 60
          }),
          s.endTime()
      }, !0, !0, !0)
    }
  },
})