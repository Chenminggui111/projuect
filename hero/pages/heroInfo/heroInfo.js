// 英雄详细页


import APIS from '../../config/server'

Page({
  data: {
    hero: {}
  },
  //页面加载完成是 加载数据
  onLoad(option) {
    // 获取数据
    let parmas = JSON.parse(option.parmas);

    this.fatchData(parmas.id, parmas.url);

  },
  fatchData(id, url) {
    var that = this;
    wx.request({
      url: APIS.heroDetail,
      method: "POST",
      data: { id, url },
      success: function (res) {
        if (res.data.success) {

          that.setData({
            hero: res.data.data
          })
        }
      }
    })
  },
  showHistory() {
    var that = this;

    wx.showModal({
      title: that.data.hero.historyTitle,
      content: that.data.hero.historyContent.trim()
    })
  },
  showImg(e) {
    let item = e.target.dataset.item;

    var urls = [];

    let data = this.data.hero.heroDetail;

    for (var key in data) {
      if (data[key].type == "img") {
        urls.push(`${data[key].text}`);
      }
    }


    // 预览图片的接口
    wx.previewImage({
      current: item.text,
      urls: urls,
    })
  }
})