import APIS from '../../config/server'

const mainTitleImag = {
  '482175': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin5_hover.jpg',
  '482168': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin4_hover.jpg',
  '482154': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin3_hover.jpg',
  '482143': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin2_hover.jpg',
  '482129': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin1_hover.jpg'
}


Page({
  data:{
    navTitle: 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin5_hover.jpg',
    mainNav: {},
    subNav: [],
    constent: {},
    navIndex: -1
  },
  onLoad(option)
  {
    this.fatchNav(option.id);
    this.setData({
      navTitle: mainTitleImag[option.id]
    })
  },
  fatchNav(id)
  {
    //导航数据
    var that = this;

    wx.request({
      url: APIS.wordNav,
      data:{id},
      success:function(res)
      {
        if(res.data.success)
        {
          let r = res.data.data;
          let main = r.shift()  //取到结果集里面的第一个元素
          that.setData({
            mainNav: main,
            subNav: r
          })

          //直接获取第一个默认显示的数据
          that.fatchDetail(main.InfoId, main.infourl);
        }
      }
    })
  },
  fatchDetail(id,url)
  {
    var that = this;
    wx.request({
      url: APIS.wordDetail,
      method:"POST",
      data: { id, url },
      success:function(res)
      {
        if(res.data.success)
        {
          console.log(res.data.data)
          that.setData({
            constent:res.data.data
          })
        }
      }

    })
  },
  tapMain()
  {
    let id = this.data.mainNav.InfoId
    let url = this.data.mainNav.infourl
    

    this.setData({
      navIndex:-1
    })

    this.fatchDetail(id, url)
  },
  tapSub(e)
  {
    let index = e.target.dataset.index
    let id = this.data.subNav[index].InfoId
    let infourl = this.data.subNav[index].infourl

    this.setData({
      navIndex: index
    })

    this.fatchDetail(id,infourl);
  }
})

