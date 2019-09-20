import APIS from '../../config/server'

Page({
  data:{
    world:[]
  },
  onLoad()
  {
    this.fatchData();
  },
  fatchData()
  {
    var that = this;

    wx.request({
      url: APIS.word,
      data:{},
      success:function(res)
      {
        if(res.data.success)
        {
          that.setData({
            world:res.data.data
          })
        }
      }
    })
  },
  toWord(e)
  {
    let id = e.target.dataset.id
    wx.navigateTo({
      url:`/pages/wordItem/wordItem?id=${id}`
    })
  }
})