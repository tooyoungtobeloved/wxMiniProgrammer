// pages/goods_list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 0,
        value: "销量",
        isActive: false,
      },
      {
        id: 0,
        value: "价格",
        isActive: false,
      },
    ],
    goodsList: [],
  },
  queryInfo: {
    query: "",
    cid: 0,
    pagenum: 1,
    pagesize: 10,
  },
  // 总页数
  totalPages: 1,
  itemTabChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.map((item, i) => {
      i === index ? (item.isActive = true) : (item.isActive = false);
    });
    this.setData({
      tabs,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryInfo.cid = options.cid;
    this.getGoodsList();
  },
  getGoodsList() {
    wx.showLoading({
      title: "加载中",
    })
    var that = this;
    wx.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
      data: {
        data: this.queryInfo,
      },
      success: function (res) {
        const { message: data } = res.data;
        console.log(data);
        const {total}  = data;
        // 计算页数
        that.totalPages = Math.ceil(total/that.queryInfo.pagesize);
        that.setData({
          goodsList: [...data.goods,...that.data.goodsList]
        });
      },
    });
    wx.hideLoading();
    wx.stopPullDownRefresh()
  },
  onReachBottom(){
    // 页面触底加载下一页数据
    // 没有下一页数据
    if(this.queryInfo.pagenum >= this.totalPages){
      wx.showToast({
        title: "刷新成功",
        icon: "success",
        duration: 1000
      })
    }else{
      this.queryInfo.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉触顶事件
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    });
    this.queryInfo.pagenum = 1;
    this.getGoodsList();
    wx.showToast({
      title: "刷新成功",
      icon: "success",
      duration: 1000
    })
  }
});
