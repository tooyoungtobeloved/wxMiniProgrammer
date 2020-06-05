// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allCheck: false,
    goodsNum: 0,
    goodsTotal: 0,
  },
  chooseAddress() {
    wx.getSetting({
      success: (result)=>{
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress || scopeAddress === undefined) {
          wx.chooseAddress({
            success:(result1) => {
              wx.setStorageSync("address", result1);
            }
          })
        }else {
          wx.openSetting({
            success: (result2) => {
              wx.chooseAddress({
                success: (result3)=>{
                   wx.setStorageSync("address", result3);
                },
              });
            },
          });
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow:function (param) {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")
    this.computeCart(cart)
    this.setData({
      address,
    })
  },
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    const index =cart.findIndex(i => i.goods_id === goods_id)
    cart[index].check = !cart[index].check;
    this.computeCart(cart);
  },
  computeCart(cart){
    if(!cart) return;
    wx.setStorageSync("cart", cart);
    let allCheck = true;
    let goodsNum = 0;
    let goodsTotal = 0;
    cart.map(i => {
       if(i.check){
         goodsNum ++;
         goodsTotal += i.goods_price * i.num
       }else {
         allCheck = false;
       }
    })
    // 排除数组长度为空但是全选为true的情况
    cart.length ? allCheck : allCheck = false;
    this.setData({
      cart,
      allCheck,
      goodsNum,
      goodsTotal
    })
  },
  // 全选和反选事件
  handleAllCheck() {
    let { cart,allCheck } = this.data;
    if(!cart) return;
    allCheck = !allCheck;
    cart.map(i => {
      i.check = allCheck;
    })
    this.computeCart(cart);
  },
  // 商品减少
  sub(e) {
    const {id} = e.currentTarget.dataset;
    const {cart} = this.data;
    const index = cart.findIndex(i => i.goods_id === id);
    if(cart[index].num > 1){
      cart[index].num--;
      this.computeCart(cart);
    }
    else{
      wx.showModal({
        title: '提示',
        content: "是否删除该商品",
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.computeCart(cart);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    }
    
  },
  add(e) {
    const {id} = e.currentTarget.dataset;
    const {cart} = this.data;
    const index = cart.findIndex(i => i.goods_id === id);
    cart[index].num++;
    this.computeCart(cart);
  },
  handlePay(){
    if(!this.data.cart.length){
      wx.showToast({
        title: "请先选择商品",
        icon: "success",
        duration: 1500
      })
      return 
    }
    if(!this.data.address){
      wx.showToast({
        title: "请选择收货地址",
        icon: 'success',
        duration: 1500
      })
      return 
    }
    wx.navigateTo({
      url: "/pages/pay/index",
    })
  }
})