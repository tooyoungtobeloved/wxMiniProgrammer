// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id)
  },
  getGoodsDetail(goods_id){
    let that = this
    wx.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      data: {
        goods_id
      },
      success: function(res){
        const { message } = res.data;
        that.goodsInfo = message;
        that.setData({
          goodsObj:{
            goods_name:message.goods_name,
            goods_price:message.goods_price,
            goods_introduce:message.goods_introduce.replace(/\.webp/g,'.jpg'),
            pics:message.pics
          }
        })
      }
    })
  },
  hanlePreviewImg(e){
    const urls = this.goodsInfo.pics.map(i=>i.pics_mid)
    const current =  e.currentTarget.dataset.url;
    wx.previewImage({
      current, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls
    })
  },
  handleCartAdd(){
    // 获取本地存储的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id===this.goodsInfo.goods_id);
    if(index === -1) {
      this.goodsInfo.num = 1;
      cart.push(this.goodsInfo)
    }else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: "加入成功",
      icon: "success",
      mask: true
    })
  }
})