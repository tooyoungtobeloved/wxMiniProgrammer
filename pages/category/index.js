// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightMenuList: [],
    // 被点击的初始菜单
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cates = wx.getStorageSync("cates");
    // 判断本地是否有缓存数据
    if(!cates){
      this.getCateList();
    }else{
      // 判断是否过期
      // console.log(Date.now() - cates.time);
      if(Date.now() - cates.time > 1000 * 10){
        this.getCateList();
      }
      else{
        this.Cates = cates.data;
        let leftMenuList = this.Cates.map(i => i.cat_name);
        let rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
    
  },
  getCateList(){
    let that = this;
    wx.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
      success: function(res){
        that.Cates = res.data.message;
        wx.setStorageSync('cates', {"time":Date.now(),data:that.Cates})

        let leftMenuList = that.Cates.map(i => i.cat_name);
        let rightMenuList = that.Cates[0].children;
        that.setData({
          leftMenuList,
          rightMenuList
        })
      },
    })
  },
  handleItemTap(e){
    const { index } = e.target.dataset
    let rightMenuList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightMenuList,
      scrollTop: 0
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})