
// 鉴赏页

// 获取全局应用
const app = getApp();


Page({
  // 跳转方法
  toGo(e) {
    const str = e.target.dataset.url;

    if (str == "") {
      // 弹框提醒
      wx.showModal({
        content: "敬请期待",
        confirmText: '确认',
        cancelText: '取消'
      })
    } else {
      wx.navigateTo({
        url: `/pages/${str}/${str}`
      })
    }
  }
})