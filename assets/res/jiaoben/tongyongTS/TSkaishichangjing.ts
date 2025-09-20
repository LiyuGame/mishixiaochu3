import { _decorator, assetManager, Button, color, Component, director, EventTouch, find, instantiate, Label, log, Node, Sprite, Tween, tween, UIOpacity, v3 } from 'cc';
import { tongyongTS } from './tongyongTS';
import { weixinapi } from './weixinAIP';
import { SJTS } from '../../../jinruchangjing/SJTS';



const { ccclass, property } = _decorator;

@ccclass('TSkaishichangjing')
export class TSkaishichangjing extends Component {

    ty: tongyongTS

    readonly f分享加道具数 = 5

    ceshi() {
        localStorage.clear(); director.loadScene('jinruchangjing')
    }


    ceshi2() {
        let n = this.ty.find查找('Canvas/数据组/金币体力显示/金币数值文字')
        this.ty.d抖动(n)
    }

    ceshi3() {
        this.ty.t提示通用('需要成功风险')
    }

    protected onLoad(): void {
        this.ty = find('通用管理').getComponent(tongyongTS)
    }

    start() {
        this.g更新缓存()
        this.数据显示变化()

        this.判断是否当日执行()
        //背景动画
        this.d背景动画()
        this.y预加载场景()
        
        if(!SJTS.HC_MSXC_jiaoxue){
            this.ty.c创建banner(2)
        }
    }

    g更新缓存() {
        SJTS.HC_yinxiaokongzhi = this.ty.h获取缓存('HC_yinxiaokongzhi')
        SJTS.HC_yinyuekongzhi = this.ty.h获取缓存('HC_yinyuekongzhi')
        SJTS.HC_zhengdongkongzhi = this.ty.h获取缓存('HC_zhengdongkongzhi')
        SJTS.HC_qiandao_riqi = this.ty.h获取缓存('HC_qiandao_riqi')
        SJTS.HC_tilizhi = this.ty.h获取缓存('HC_tilizhi')
        SJTS.HC_qian = this.ty.h获取缓存('HC_qian')

        SJTS.HC_MSXC_jiaoxue = this.ty.h获取缓存('HC_MSXC_jiaoxue')
        SJTS.HC_MSXC_CGS = this.ty.h获取缓存('HC_MSXC_CGS')
    }

    d背景动画() {

    }


    y预加载场景() {
        this.ty.y预加载场景('mishixiaochu')
    }


    数据显示变化() {
        let n = this.ty.find查找('Canvas/按钮组/按钮_开始游戏/长圆/文字')
        let wz = '闯关数：' + SJTS.HC_MSXC_CGS
        this.ty.x修改文字(n, wz)

        n = this.ty.find查找('Canvas/数据组/金币体力显示/体力数值文字')
        if (SJTS.HC_wuxiantili) {
            wz = '无限体力'
        } else {
            wz = SJTS.HC_tilizhi + ''
        }
        this.ty.x修改文字(n, wz)

        n = this.ty.find查找('Canvas/弹出组/体力补充弹出/小组/园按钮3/标题-001')
        wz = SJTS.w无体力观看次数 + '/3'
        this.ty.x修改文字(n, wz)

        n = this.ty.find查找('Canvas/弹出组/体力补充弹出/小组/kuanhuawen2/标题')
        wz = SJTS.HC_tilizhi + ''
        this.ty.x修改文字(n, wz)

        n = find('Canvas/数据组/金币体力显示/金币数值文字')
        wz = SJTS.HC_qian + ''
        this.ty.x修改文字(n, wz)

    }

    判断是否当日执行() {
        let DA: Date = new Date
        let n = this.ty.find查找('Canvas/动画组/分享提示')
        if (SJTS.HC_qiandao_riqi != DA.getDate()) {     //变化分享提示图标
            n.setPosition(-250, 80)
            this.ty.c持续旋转(n, -8, 0.5)
        } else {
            n.setPosition(2000, 2000)
        }
    }

    AN_分享() {
        this.ty.bofangshenyin(1)
        let f = () => {
            let DA: Date = new Date
            if (SJTS.HC_qiandao_riqi != DA.getDate()) {
                SJTS.HC_tilizhi += SJTS.f分享补充体力数
                localStorage.setItem('HC_tilizhi', JSON.stringify(SJTS.HC_tilizhi))
                SJTS.HC_qiandao_riqi = DA.getDate()
                localStorage.setItem('HC_qiandao_riqi', JSON.stringify(SJTS.HC_qiandao_riqi));
                this.数据显示变化()
                let n = this.ty.find查找('Canvas/动画组/分享提示')
                n.setPosition(2000, 2000)
                Tween.stopAllByTarget(n)
            }
        }

        this.ty.f分享(f)


    }


    AN_游戏大全() {
        //自己设计要跳转的APP
    }

    AN_设置打开() {
        this.ty.bofangshenyin(1)
        let n = this.ty.find查找('Canvas/弹出组/设置弹出')
        n.setPosition(-1000, 0)
        tween(n).to(0.3, { position: v3(0, 0) }).start()
    }

    AN_设置关闭() {
        this.ty.bofangshenyin(1)
        let n = this.ty.find查找('Canvas/弹出组/设置弹出')
        tween(n).to(0.3, { position: v3(-1000, 0) }).start()
    }

    AN_排行榜打开() {
        this.ty.c创建插屏()
        this.ty.bofangshenyin(1)
        let n = this.ty.find查找('Canvas/弹出组/弹出_排行版')
        n.setPosition(-1000, 0)
        tween(n).to(0.3, { position: v3(0, 0) }).start()
    }

    AN_排行榜关闭() {
        this.ty.bofangshenyin(1)
        let n = this.ty.find查找('Canvas/弹出组/弹出_排行版')
        tween(n).to(0.3, { position: v3(-1000, 0) }).start()
    }

    k可点击 = true
    j进入迷失消除() {
        if (this.k可点击) {
            if (SJTS.HC_tilizhi > 0 || SJTS.HC_wuxiantili) {
                this.ty.bofangshenyin(2)
                this.k可点击 = false
                if (!SJTS.HC_wuxiantili) {
                    let n = find('Canvas/动画组/体力消失')
                    let ann = this.ty.find查找('Canvas/按钮组/按钮_开始游戏')
                    let p = v3(ann.position.x + 135, ann.position.y + 20)
                    n.setPosition(p)
                    tween(n).by(0.6, { position: v3(0, 50, 0) })
                        .call(() => {
                            SJTS.HC_tilizhi -= 1
                            localStorage.setItem('HC_tilizhi', JSON.stringify(SJTS.HC_tilizhi))
                            this.数据显示变化()
                            n.setPosition(1000, 0)
                            this.j进入动画('mishixiaochu')
                        })
                        .start()
                } else {
                    this.j进入动画('mishixiaochu')
                }
            } else {
                this.t体力不足弹出()
            }
        }
    }

    j进入动画(scename: string) {
        let n = find('Canvas/tongyongnode/加载')
        n.setPosition(800, 0)
        tween(n).to(0.4, { position: v3(0, 0, 0) }).call(() => {
            director.loadScene(scename)
        }).start()
    }

    t体力不足弹出() {
        this.ty.bofangshenyin(4)
        let n = find('Canvas/弹出组/体力补充弹出')
        this.ty.t弹出通用(n)

        n = find('Canvas/弹出组/体力补充弹出/小组/kuanhuawen2/tilixin')
        this.ty.c持续旋转(n, 8, 0.3)
    }

    AN_体力关闭() {
        this.ty.bofangshenyin(1)
        let n = find('Canvas/弹出组/体力补充弹出')
        n.setPosition(2000, 0)
    }

    AN_体力补充() {
        let f = () => {
            SJTS.HC_tilizhi += SJTS.g观看恢复体力数
            localStorage.setItem('HC_tilizhi', JSON.stringify(SJTS.HC_tilizhi))
            this.数据显示变化()
            this.AN_体力关闭()
        }
        weixinapi.z展示激励广告(f)
    }

    AN_体力金币补充() {
        if (SJTS.HC_qian >= 200) {
            this.ty.bofangshenyin(1)
            SJTS.HC_qian -= 200
            SJTS.HC_tilizhi += 1
            localStorage.setItem('HC_tilizhi', JSON.stringify(SJTS.HC_tilizhi))
            localStorage.setItem('HC_qian', JSON.stringify(SJTS.HC_qian))
            this.数据显示变化()
        } else {
            this.ty.bofangshenyin(4)
            let n = this.ty.find查找('Canvas/数据组/金币体力显示/金币数值文字')
            this.ty.d抖动(n)
        }

    }

    AN_无限体力补充() {
        if (!SJTS.HC_wuxiantili) {
            let f = () => {
                SJTS.w无体力观看次数++
                let n = this.ty.find查找('Canvas/弹出组/体力补充弹出/小组/园按钮3/标题-001')


                if (SJTS.w无体力观看次数 >= 3) {
                    SJTS.w无体力观看次数 = 0
                    SJTS.HC_wuxiantili = true
                    let f = () => {
                        SJTS.HC_wuxiantili = false
                    }

                    this.ty.c常驻定时器(60 * 15, f)

                    this.AN_体力关闭()
                }
                this.数据显示变化()
            }
            weixinapi.z展示激励广告(f)
        }

    }
}
