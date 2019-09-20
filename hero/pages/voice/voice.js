import APIS from '../../config/server'

Page({
  data: {
    heroNav: [],
    navIndex: 0,
    detail: {},


    poster: '',
    name: '王者荣耀语音',
    author: ' naice',
    src: '',

  },
  onLoad() {
    this.fatchNav();
  },
  onReady(e) {
    //创建一个语音播放的对象 creatAudioContext(id)
    this.audioCtx = wx.createAudioContext('myAudio');
  },
  fatchNav() {
    //获取人物导航
    var that = this;
    wx.request({
      url: APIS.voiceNav,
      data: {},
      success: function (res) {
        if (res.data.success) {
          that.setData({
            heroNav: res.data.data.dhty_e9
          })

          //获取第一个人的id值
          let id = res.data.data.dhty_e9[0].yxid_a7;
          that.fatchDetail(id);
        }
      }
    })
  },
  fatchDetail(id) {
    var that = this;
    wx.request({
      url: APIS.voiceDetail,
      data: { id },
      success: function (res) {
        if (res.data.success) {
          //将获取到结果转化为字符串
          let type = Object.prototype.toString.call(res.data.data.yxpfyy_fe)

          //判断是否为undefined
          if (/undefined/gi.test(type)) {
            that.setData({
              detail: res.data.data || {}
            })
            return;
          }


          //如果有配音的情况下
          if (/Object/.test(type)) {
            let arr = []
            arr.push(res.data.data.yxpfyy_fe)
            res.data.data.yxpfyy_fe = arr
          }

          let r = res.data.data;

          //将获取到的结果循环
          r.yxpfyy_fe.map((item) => {

            //判断地址是否是https
            if (!/^http/.test(item.pfbanner_ed)) {
              item.pfbanner_ed = 'https:' + item.pfbanner_ed
            }

            return item
          })

          that.setData({
            detail: r
          })
        }
      }
    })
  },
  play(e) {
    var that = this;
    let url = e.target.dataset.url
    if (!/^http/.test(url)) {
      url = 'https:' + url
    }

    this.setData({
      src: url
    })

    setTimeout(() => {
      that.audioCtx.play()
    }, 10);
  },
  selectAear(e) {
    const index = e.target.dataset.index
    const id = e.target.dataset.id

    this.setData({
      navIndex: index
    })

    this.fatchDetail(id);
  }
})