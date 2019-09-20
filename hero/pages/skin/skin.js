// 皮肤鉴赏页

import APIS from '../../config/server'

Page({
  data: {
    skin: []
  },
  onLoad() {
    this.fatchData()
  },
  fatchData() {
    var that = this;
    wx.request({
      url: APIS.skin,
      data: {},
      success: function (res) {
        if (res.data.success) {
          that.setData({
            skin: res.data.data
          })
        }
      }
    })
  },
  skinInfo(e) {
    let item = e.target.dataset.item;

    wx.navigateTo({
      url: `/pages/skinInfo/skinInfo?parmas=${item.url}`
    })
  }
})
