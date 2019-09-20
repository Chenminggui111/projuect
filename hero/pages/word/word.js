let world = require('../../store/word.js')


Page({
  data:{
    world: world
  },
  toWord(e)
  {
    var isto = e.target.dataset.to

    if(isto)
    {
      //弹出框
      wx.showModal({
        content: "敬请期待",
        confirmText: "确定",
        cancelText: "取消"
      })
    }else{
      wx.navigateTo({
        url: '../wordDetail/wordDetail'
      })
    }
  }
})