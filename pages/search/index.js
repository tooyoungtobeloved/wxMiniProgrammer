// pages/search/index.js
import { promisifyAll, promisify } from "../../request/wx-promise-pro.js"
// promisify all wx's api
promisifyAll()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    inputValue: ""
  },
  Timer: -1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  handleInput(e) {
    const { value } = e.detail;
    if(!value.trim()) {
      this.setData({
        isFocus: false,
        goods: []
      })
      clearTimeout(this.Timer)
      return
    };
    this.setData({
      isFocus:true
    })
    clearTimeout(this.Timer)
    this.Timer = setTimeout(() => {
      this.query(value)
    }, 1000);
  },
  query(value){
    wx.pro.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",
      data: { "query": value }
    }).then(res => {
      const { message } = res.data;
      if(message.length === 0){
        wx.showToast({
          title: "没有查到数据",
          icon: "success",
          mask: true
        })
      }
      this.setData({
        goods:message
      })
    })
  },
  // 点击取消按钮
  handleCancel() {
    this.setData({
      inputValue: "",
      goods: [],
      isFocus: false
    })
    clearTimeout(this.Timer);
  }
})