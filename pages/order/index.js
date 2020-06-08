// pages/order/index.js
import { promisifyAll, promisify } from "../../request/wx-promise-pro.js"
// promisify all wx‘s api
promisifyAll()
// promisify single api
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true,
      },
      {
        id: 0,
        value: "待付款",
        isActive: false,
      },
      {
        id: 0,
        value: "待发货",
        isActive: false,
      },
      {
        id: 0,
        value: "退货/退款",
        isActive: false,
      }
    ],
    orders: []
  },
  
  onShow: function () {
    
    let pagesArr =  getCurrentPages();
    const token = wx.getStorageSync("token")
    if(!token) {
      return wx.navigateTo({
        url: "/pages/auth/index"
      })
    }
    // let currentPage = pagesArr[pagesArr.length-1];
    let { type } = pagesArr.pop().options;
    this.changeItemByIndex(type - 1);
    this.getOrders(type);
  },
  getOrders(type){
    // 此处无token无法实现
    const token = wx.getStorageSync("token")
    wx.pro.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all",
      data: {type},
      method: 'GET',
      header: {"Authorization": token}
    }).then(res => {
      const {orders} = res.data.message;
      this.setData({
        orders
      })
    })
  },
  itemTabChange(e) {
    const { index } = e.detail;
    this.changeItemByIndex(index);
    this.getOrders(index+1);
  },
  changeItemByIndex(index){
    let { tabs } = this.data;
    tabs.map((item, i) => { i === index ? item.       isActive = true: item.isActive = false;
    })
    this.setData({
      tabs
    })
  },
 
})