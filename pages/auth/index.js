// pages/auth/index.js
Page({
  hanleGetUserInfo(e){
    console.log(e);
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 这里需要和后台配合
    wx.login({
      success: function(res){
        const { code } = res;
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  }
})