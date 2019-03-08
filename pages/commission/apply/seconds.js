var a = getApp(), t = a.requirejs("core"), e = a.requirejs("jquery"), n = a.requirejs("foxui");
Page({
  data: { last_data: [] },
  onShow: function () {
    this.getData()
  },
  getData: function () {
    var a = this;
    t.get("commission/apply2", {}, function (n) {
      console.log(n);
      e.isEmptyObject(n.type_array) ? (t.alert(n.message || "没有提现方式!"), setTimeout(function () {
        70001 == n.error ? wx.navigateTo({
          url: "/pages/member/info/index"
        }) : wx.navigateBack()
      }, 2e3)) : (n.show = !0, n.last_data && (n.last_data.alipay1 = n.last_data.alipay, n.last_data.bankcard1 = n.last_data.bankcard), n.bankIndex = n.bankIndex || 0,  a.setData(n))
    }, !1, !0)
  },
  typeChange: function (a) {
    var t = a.detail.value,
      e = this.data.type_array[t].type;
      console.log(t,e)
    this.setData({
      applytype: e,
      applyIndex: t
    })
  },
  bankChange: function (a) {
    var t = a.detail.value;
    console.log(t)
    this.setData({
      bankIndex: t
    })
  },
  inputChange: function (a) {
    var v = this.data.last_data,
      n = a.currentTarget.dataset.type,
      i = e.trim(a.detail.value);
    v[n] = i; //console.log(v);
    this.setData({
      last_data: v
    });

  },
  submit: function (a) {
    var e,
      i = this,
      s = this.data,
      ismultiple = this.data.ismultiple,
      withdrawtype = this.data.withdrawtype,
      input=this.data.input,
      deductionmoney = this.data.deductionmoney,
      input_deductionmoney = parseFloat(input) + parseFloat(deductionmoney),
      commission_ok = this.data.commission_ok;
    if(input){
      if (input_deductionmoney>commission_ok){
        wx.showModal({
          title: '提示',
          content: '输入金额与手续费金额之和大于可提现金额，请检查！',
          showCancel: false,
          success(res) {
            if (res.confirm) {
            }
          }
        })
        return false
      }
      if (ismultiple == 1 && (input%withdrawtype)!=0){
        wx.showModal({
          title: '提示',
          content: '请输入'+withdrawtype+'的整数倍！',
          showCancel: false,
          success(res) {
            if (res.confirm) {
            }
          }
        })
        return false
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入要提现的金额！',
        showCancel:false,
        success(res) {
          if (res.confirm) {
          } 
        }
      })
     return false
    }
    if (!s.isSubmit) {
      var r = '',
        l = {
          type: s.applytype,
          input:input
        };
      for (var ii = 0; ii < s.type_array.length; ii++) {
        if (s.type_array[ii].type == s.applytype) {
          r = s.type_array[ii].title;
          break;
        }
      }
      //console.log(r);return false;
      if (2 == s.applytype) {
        if (!s.last_data.realname)
          return void n.toast(i, "请填写姓名");
        if (!s.last_data.alipay)
          return void n.toast(i, "请填写支付宝帐号");
        if (!s.last_data.alipay1)
          return void n.toast(i, "请确认支付宝帐号");
        if (s.last_data.alipay != s.last_data.alipay1)
          return void n.toast(i, "两次填写的支付宝不一致");
        r += "？姓名:" + s.last_data.realname + " 支付宝帐号:" + s.last_data.alipay,
          l.realname = s.last_data.realname,
          l.alipay = s.last_data.alipay,
          l.alipay1 = s.last_data.alipay1
      } else if (3 == s.applytype) {
        if (!s.banklist[s.bankIndex].bankname)
          return void n.toast(i, "请选择提现银行");
        if (!s.last_data.realname)
          return void n.toast(i, "请填写姓名");
        if (!s.last_data.bankcard)
          return void n.toast(i, "请填写银行卡号");
        if (!s.last_data.bankcard1)
          return void n.toast(i, "请确认银行卡号");
        if (s.last_data.bankcard != s.last_data.bankcard1)
          return void n.toast(i, "两次填写的银行卡号不一致");
        r += "？姓名:" + s.last_data.realname + " 银行:" + s.banklist[s.bankIndex].bankname + " 卡号:" + s.last_data.bankcard,
          l.realname = s.last_data.realname,
          l.bankname = s.banklist[s.bankIndex].bankname,
          l.bankcard = s.last_data.bankcard,
          l.bankcard1 = s.last_data.bankcard1
      }
      e = s.applytype < 2 ? "确认要" + r + "？" : "确认要" + r,
        s.set_array.charge > 0 && (e += " 扣除手续费 " + s.deductionmoney + " 元,实际到账金额 " + s.realmoney + " 元"),
        t.confirm(e, function () {
          i.setData({
            isSubmit: !0
          }),
            t.post("commission/apply2", l, function (a) {
              if (a.error)
                return n.toast(i, a.message), void i.setData({
                  isSubmit: !1
                });
              n.toast(i, "提现申请成功，请等待审核"),
                setTimeout(function () {
                  wx.navigateBack()
                }, 500)
            }, !0, !0)
        })
    }
  },
  inputcommission:function(e){
    var t=this,
    charge=t.data.set_array.charge,    
    input=e.detail.value,
    realmoney=input,
    deductionmoney=0;
    if (charge){
      deductionmoney = input * charge * 0.01;
      deductionmoney = deductionmoney.toFixed(2);
    }       
    t.setData({
      input:input,
      deductionmoney: deductionmoney,
      realmoney: realmoney
    })
  }
})
