// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    goodsTotal: 0,
    goods_num: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow:function (param) {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    let goodsTotal = 0;
    let goods_num = 0;
    cart = cart.filter(i => i.check)
    cart.map(i => {
      goodsTotal += i.goods_price * i.num;
      goods_num++;
   })
    this.setData({
      address,
      cart,
      goodsTotal,
      goods_num
    })
  },
  handleOrderPay(){
    const token = wx.getStorageSync("token");
    if(!token) 
      return wx.navigateTo({
        url: '/pages/auth/index'
      })
  }
})