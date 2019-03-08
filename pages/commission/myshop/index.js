var t = getApp(), a = t.requirejs("core");
Page({
  data: {
    list: [],
    page: 1,
    total: 0,
  },

  onLoad: function (options) {
    var t =this;
    this.getShop();
    this.getGood(options);
    t.setData({
      options:options
    })
  },

  onReady: function () {
  
  },

  getShop: function(options){
      var t=this;
      a.get('commission/myshop/get_shop',options,function(e){
          if(e.error==0){
            t.setData({
              member: e.member,
              shop: e.shop,
              goodscount: e.goodscount
            })
          }else{
            a.alert(e.message)
          }
         
      })
  },
  getGood: function(options){
    var t= this;
    var options = this.data.options ? this.data.options : options;
    var page = t.data.page;
    console.log(options);
    a.get("commission/myshop/get_goods",{mid:options.mid,page:page},function(e){
      console.log(e);
        if(e.error==0){
          var a = {
            total: e.total
          };
          e.list || (e.list = []),
            e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list), a.list.length < e.pagesize ),
            console.log(t);
            t.setData(a)
        }

    })
  },

  mcodeTap:function(){
    var t=this;
    console.log(t.data);
    wx.navigateTo({
      url: '/pages/commission/poster/index',
    })
  },
  codeTap:function(){
    wx.navigateTo({
      url: '/pages/commission/poster/index',
    })
  },
  
  onShow: function () {
  
  },
  onHide: function () {
  
  },

  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
    var t=this;
    var options={
      mid:t.data.options.mid,
      page:t.data.page
    };
    this.getGood(options);
  },
  onShareAppMessage: function () {
  
  }
})