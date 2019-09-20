//引入接口
import APIS from '../../config/server'

Page({
  data: {
    allHero: [],
    heroNav: [],
    herolist: [],
    navIndex: 0,
  },
  onLoad() {
    //生命周期钩子
    this.fatchData()
  },
  fatchData() {
    let that = this;
    //发送一个请求
    wx.request({
      url: APIS.heroList,
      data: {},
      success: function (res) {
        if (res.data.success) {
          // console.log(res.data.data);
          //设置数据
          that.setData({
            heroNav: res.data.data.nav,
            herolist: res.data.data.heroList,
            allHero: res.data.data.heroList
          })
        }
      }
    })
  },
  selectAear(e) {
    //点击导航切换
    // console.log(e);
    const index = e.target.dataset.index;
    const slectItem = e.target.dataset.item;

    let allHero = this.data.allHero;

    if (slectItem.type === "all") {
      this.setData({
        navIndex: 0,
        herolist: allHero
      })
    } else {
      //其他分类
      let r = allHero.filter(item => item.camptype === slectItem.type);
      this.setData({
        navIndex: index,
        herolist: r
      })
    }
  },
  toDetail(e) {
    // 获取点击的数据
    let item = e.target.dataset.item
    // console.log(item.infourl)
    // //pvp.qq.com/webplat/info/news_version3/15592/27363/28440/m17324/201802/689981.shtml
    // 截取'?' 
    let urlArr = item.infourl.split('?')
    let parmas = {
      id: item.heroid,
      // 获取到？前面的字符串
      url: urlArr[0]
    }
    // 跳转方法
    wx.navigateTo({
      url: `/pages/heroInfo/heroInfo?parmas=` + JSON.stringify(parmas)
    })
  }
})