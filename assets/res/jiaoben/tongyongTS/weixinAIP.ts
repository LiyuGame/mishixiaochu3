import { SJTS } from "../../../jinruchangjing/SJTS"
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
export class weixinapi {
  //分享接口``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
  static k开启分享() {
    if (SJTS.是否上架微信) {
      let obj = {
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline'],
        success: (res) => {
          console.log('开启上方分享按钮')
        }
      }
      wx.showShareMenu(obj)
    }
  }

  static f分享() {
    if (SJTS.是否上架微信) {
      wx.shareAppMessage({
        title: '每一关都是一次思维的冒险'   //string		否	转发标题，不传则默认使用当前小游戏的昵称
      })
    }
  }


  static starttime = null
  static F_fxcg = () => { }
  static F_fxsb = () => { }
  static onshowzx() {
    if (SJTS.是否上架微信) {
      let ff = (res: any) => {
        let onShowTime = new Date().getTime();
        let timeDiff = onShowTime - this.starttime;
        if (this.starttime == null || timeDiff <= 3000) {
          console.log("分享失败:时间不足" + res);
          this.F_fxsb()
        } else {
          //分享成功
          console.log("分享成功" + res);
          this.F_fxcg()
        }
        wx.offShow(ff)
      }

      wx.onShow(ff)
    } else {
      this.F_fxcg()
    }
  }
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html

  static windowInfo
  static h获取屏幕大小() {
    if (SJTS.是否上架微信) {
      this.windowInfo = wx.getWindowInfo()
      console.log('设备像素比:' + this.windowInfo.pixelRatio)
      console.log('屏幕宽度:' + this.windowInfo.screenWidth)
      console.log('屏幕高度:' + this.windowInfo.screenHeight)
      console.log('可使用窗口宽度:' + this.windowInfo.windowWidth)
      console.log('可使用窗口高度:' + this.windowInfo.windowHeight)
      console.log('状态栏的高度:' + this.windowInfo.statusBarHeight)
      console.log('在竖屏正方向下的安全区域。部分机型没有:' + this.windowInfo.safeArea)
      console.log('窗口上边缘的y值:' + this.windowInfo.screenTop)
      return this.windowInfo
    }
  }



  //格子广告``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

  static geziAD = null
  static z展示格子广告() {
    if (SJTS.是否上架微信) {
      if (this.geziAD) {
        this.geziAD.show()
      } else {
        this.新建格子广告()
        this.geziAD.show()
      }

    }
  }

  static 新建格子广告() {
    if (this.geziAD) {
      this.geziAD.destroy()
    }

    if (!this.windowInfo) {
      this.h获取屏幕大小()
    }

    this.geziAD = wx.createCustomAd({
      adUnitId: SJTS.y原始广告格子滑动_id,
      style: {
        left: this.windowInfo.screenWidth / 2 - 150,
        top: this.windowInfo.screenHeight - 90,
        adIntervals: 30,              //忽略
      }
    })

    this.geziAD.onError(err => {
      console.log('banner广告创建失败:' + err)
      this.geziAD.destroy()
      this.geziAD = null
    })
  }

  static g关闭格子() {
    if (SJTS.是否上架微信) {
      if (this.geziAD) {
        this.新建格子广告()
      }
    }
  }

  //banner广告``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

  static bannerAD = null
  static z展示banner广告() {
    if (SJTS.是否上架微信) {
      if (this.bannerAD) {
        this.bannerAD.show()
      } else {
        this.新建banner广告()
        this.bannerAD.show()
      }

    }
  }

  static 新建banner广告() {
    if (this.bannerAD) {
      this.bannerAD.destroy()
    }

    if (!this.windowInfo) {
      this.h获取屏幕大小()
    }

    this.bannerAD = wx.createCustomAd({
      adUnitId: SJTS.y原始广告banner_id,
      style: {
        left: 0,
        top: this.windowInfo.screenHeight - 126,
        adIntervals: 30,              //忽略            //忽略
      }
    })

    this.bannerAD.onError(err => {
      console.log('banner广告创建失败:' + err)
      this.bannerAD.destroy()
      this.bannerAD = null
    })

  }

  static g关闭banner() {
    if (SJTS.是否上架微信) {
      if (this.bannerAD) {
        this.新建banner广告()
      }
    }
  }
  //插屏广告

  static interstitialAd = null
  static c展示插屏广告() {
    if (SJTS.是否上架微信) {
      this.g关闭格子()
      this.g关闭banner()
      if (this.interstitialAd) {
        this.interstitialAd.show().catch((err) => { console.error(err) })
      } else {
        this.c创建插屏广告()
        this.interstitialAd.show().catch((err) => { console.error(err) })
      }

    }
  }

  static c创建插屏广告() {
    if (SJTS.是否上架微信) {
      if (this.interstitialAd) {
        this.interstitialAd.destroy()
      }
      console.log('c创建或展示插屏广告')
      this.interstitialAd = wx.createInterstitialAd({ adUnitId: SJTS.c插屏广告id })
      this.interstitialAd.onLoad(() => { console.log('插屏广告加载成功') })
      this.interstitialAd.onError(err => { console.log('插屏广告加载失败：' + err) })

    }
  }
  //激励广告
  static rewardedVideoAd = null

  static fuc = () => { }

  static z展示激励广告(f) {
    if (SJTS.是否上架微信) {
      this.fuc = f
      if (this.rewardedVideoAd) {
        this.显示激励广告()
      } else {
        this.c初始加载激励广告()
        this.显示激励广告()
      }
    } else {
      f()
      console.log('激励广告展示')
    }
  }

  static c初始加载激励广告() {
    if (SJTS.是否上架微信) {
      this.rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: SJTS.j激励广告id })
      this.rewardedVideoAd.onLoad(() => { console.log('初始激励视频 广告加载成功') })
      this.rewardedVideoAd.onError(err => { console.log('初始激励视频 广告加载失败' + err) })
    }
  }
  
  static j监听 = false
  static 显示激励广告() {
    this.rewardedVideoAd.show()
      .catch((err) => {
        console.log('激励广告展示失败：' + err)
        console.log(err)
        this.rewardedVideoAd.load().then(() => this.rewardedVideoAd.show())
      })
    if (!this.j监听) {
      this.j监听 = true
      let listener = (res) => {
        // 用户点击了【关闭广告】按钮
        // 小于 2.1.0 的基础库版本，res 是一个 undefined
        if (res && res.isEnded || res === undefined) {
          console.log('完整看完了视频')
          this.fuc()

        }
        else {
          // 播放中途退出，不下发游戏奖励
          console.log('没完整完视频')
        }
        this.rewardedVideoAd.offClose(listener)
        this.j监听 = false
      }
      this.rewardedVideoAd.onClose(listener)
    }
  }

}