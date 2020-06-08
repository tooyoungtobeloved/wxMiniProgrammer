// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true,
      },
      {
        id: 0,
        value: "商品、商家投诉",
        isActive: false,
      }
    ],
    chooseImgs: []
  },
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
  handleChooseImage() {
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (res) =>{
        // success
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths]
        })
      }
    })
  },
  deleteImg(e){
    const { src } = e.detail
    let { chooseImgs } = this.data;
    const index = chooseImgs.findIndex(i => i.tempFilePaths === src)
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  }
})