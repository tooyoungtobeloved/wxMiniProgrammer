// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  handleGetUserInfo(e){
    const { userInfo } = e.detail;
    console.log(userInfo);
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})