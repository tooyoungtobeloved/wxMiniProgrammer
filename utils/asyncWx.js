export const showModal = ({ content }) => {
  new Promise((resolve, reject) => {
    wx.showModal({
      title: "提示",
      content,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err)
      }
    });
  });
};
