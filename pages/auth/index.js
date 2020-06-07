// pages/auth/index.js
Page({
  hanleGetUserInfo(e){
    console.log(e);
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 这里需要和后台配合
    wx.login({
      success: function(res){
        const { code } = res;
        wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
      }
    })
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  }
})