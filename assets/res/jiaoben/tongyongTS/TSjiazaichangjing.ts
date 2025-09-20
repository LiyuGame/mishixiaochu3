import { _decorator, assetManager, Canvas, Component, director, find, log, macro, Node, Tween, tween, Vec3, View, view } from 'cc';
import { weixinapi } from './weixinAIP';
import { SJTS } from '../../../jinruchangjing/SJTS';



const { ccclass, property } = _decorator;

@ccclass('TSjiazaichangjing')
export class TSjiazaichangjing extends Component {
    start() {
        weixinapi.k开启分享()
        weixinapi.c初始加载激励广告()
        weixinapi.c创建插屏广告()
        macro.ENABLE_MULTI_TOUCH = false      //禁止多指操作，系统默认为true，更改后切换场景也不会改变，一次设置所有后续都为该量
        console.log('开启禁止多指操作')
        this.c记录缓存()

        let n2 = find('Canvas/遮罩_进度条/进度条')
        tween(n2).to(10, { position: new Vec3(-100, 0, 0) }).start()
        //预加载场景
        let f = () => {
            Tween.stopAllByTarget(n2); n2.setPosition(0, 0, 0)
            director.loadScene('kaishichangjing')
        }
        let m = 'kaishichangjing'
        assetManager.loadBundle('fb', (err, a) => { a.loadScene(m, f); });

    }

    HC_yinxiaokongzhi = true
    HC_yinyuekongzhi = true
    HC_zhengdongkongzhi = true
    HC_qiandao_riqi = -1
    //其他缓存
    HC_MSXC_jiaoxue = true
    HC_tilizhi = 5
    HC_qian = 200
    HC_wuxiantili = false

    HC_MSXC_CGS = 0
    c记录缓存() {
        //判断用户数据不存在则存储为用户初始数据
        function jilu(lab: string, n) {
            let a = localStorage.getItem(lab)
            if (a == null || a == '') { localStorage.setItem(lab, JSON.stringify(n)); }
            //   console.log(lab + ':' + localStorage.getItem(lab))
        }

        //  jilu('', SJTS.)
        jilu('HC_yinxiaokongzhi', this.HC_yinxiaokongzhi)
        jilu('HC_yinyuekongzhi', this.HC_yinyuekongzhi)
        jilu('HC_zhengdongkongzhi', this.HC_zhengdongkongzhi)
        jilu('HC_qiandao_riqi', this.HC_qiandao_riqi)


        jilu('HC_tilizhi', this.HC_tilizhi)
        jilu('HC_qian', this.HC_qian)

        jilu('HC_MSXC_jiaoxue', this.HC_MSXC_jiaoxue)
        jilu('HC_MSXC_CGS', this.HC_MSXC_CGS)
    }


}


