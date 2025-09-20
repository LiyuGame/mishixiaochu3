import { _decorator, Component, Node, AudioSource, AudioClip, resources, director, tween, Vec3, find, assetManager, Label, ProgressBar, v3, MotionStreak, UIOpacity, Tween, log, Sprite, color, ParticleSystem2D, Vec2, UITransform, EventTouch, Button, Material, Prefab, instantiate, sp, PhysicsSystem2D } from 'cc';
import { weixinapi } from './weixinAIP';
import { SJTS } from '../../../jinruchangjing/SJTS';
import { CZdingshiqiTS } from './CZdingshiqiTS';


//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
const { ccclass, property } = _decorator;

@ccclass('tongyongTS')
export class tongyongTS extends Component {

    @property(Node) TSnode: Node = null;
    yinpin: AudioSource


    bundle

    readonly banner最长停留时间 = 20



    onLoad() {
        this.yinpin = this.node.getComponent(AudioSource)

        this.bundle = assetManager.getBundle('fb')
        if (!this.bundle) {
            assetManager.loadBundle('fb', (err, a) => {
                this.bundle = assetManager.getBundle('fb')
            })
        }

    }

    //声音

    bofangshenyin(a: Number, daxiao?: number) {
        //使用中：
        let wz = ''
        switch (a) {
            case 1: wz = 'dongtaijiazai/yy/1djkeai'; break;      //点击可爱
            case 2: wz = 'dongtaijiazai/yy/2jinru'; break;       //进入
            case 3: wz = 'dongtaijiazai/yy/3dj_da'; break;      //点击da
            case 4: wz = 'dongtaijiazai/yy/4djshixiao'; break;   //点击失效

            case 5: wz = 'dongtaijiazai/yy1/dianliu'; break;     //点击电流
            case 6: wz = 'dongtaijiazai/yy/dingdeng'; break;    //叮蹬
            case 7: wz = 'dongtaijiazai/yy1/ding'; break;        //叮
            case 8: wz = 'dongtaijiazai/yy1/keai'; break;        //可爱
            case 9: wz = 'dongtaijiazai/yy/dinglinglianxu'; break; //连续叮铃
            case 10: wz = 'dongtaijiazai/yy/10feichu'; break;     //飞出
            case 11: wz = 'dongtaijiazai/yy1/baozha'; break;     //爆炸
            case 17: wz = 'dongtaijiazai/yy/zhua'; break;    //抓
            case 18: wz = 'dongtaijiazai/yy/shibaichang'; break;    //失败2
            case 19: wz = 'dongtaijiazai/yy/guanmeng'; break;    //关门
            case 20: wz = 'dongtaijiazai/yy/chudong'; break;    //出动
            case 21: wz = 'dongtaijiazai/yy/21xintiao'; break;    //心跳
            case 22: wz = 'dongtaijiazai/yy/luodidong'; break;    //落地东
            case 23: wz = 'dongtaijiazai/yy/diaoluozhong'; break;    //掉落中
            case 25: wz = 'dongtaijiazai/yy/bangzi1'; break;    //棒子1
            case 26: wz = 'dongtaijiazai/yy/bangzi2'; break;    //棒子2
            case 27: wz = 'dongtaijiazai/yy/bingdong'; break;    //冰冻
            case 13: wz = 'dongtaijiazai/yy1/jinbidiaoluo'; break;//金币掉落

            case 12: wz = 'dongtaijiazai/yy1/shibai'; break;     //失败
            case 15: wz = 'dongtaijiazai/yy1/buda'; break;//boda
            case 24: wz = 'dongtaijiazai/yy1/xiu'; break;    //秀
            case 14: wz = 'dongtaijiazai/yy/14shengli'; break;    //胜利
            case 16: wz = 'dongtaijiazai/yy1/duan'; break;    //duan
            case 28: wz = 'dongtaijiazai/yy1/pa'; break;    //麻将触碰
            case 29: wz = 'dongtaijiazai/yy1/peng'; break;    //p碰
            case 30: wz = 'dongtaijiazai/yy1/gang'; break;    //杠
            case 31: wz = 'dongtaijiazai/yy1/chi'; break;    //吃
            case 32: wz = 'dongtaijiazai/yy1/hule'; break;    //胡了
            case 33: wz = 'dongtaijiazai/yy/33bolinlin'; break;    //波零零
            case 34: wz = 'dongtaijiazai/yy1/daluan'; break;    //麻将

            case 35: wz = 'dongtaijiazai/yy/35cuowu'; break;    //错误
            case 36: wz = 'dongtaijiazai/yy/36xiaochu'; break;    //消除
            case 37: wz = 'dongtaijiazai/yy/37shibai2'; break;     //失败2

            default: console.log('chucuole')
        };

        let yl = 1
        if (daxiao) {
            yl = daxiao
        }

        if (JSON.parse(localStorage.getItem('HC_yinxiaokongzhi'))) {
            this.bundle.load(wz, AudioClip, (er, au) => {
                if (er) {
                    console.log(er)
                } else {
                    if (this.yinpin) {
                        this.yinpin.playOneShot(au, yl)

                    }

                }
            })
        }

    }

    //动画
    doudongZXZ = []
    d抖动(nd: Node, time?, fudu?) {  //(nd：节点，0.3：时间，10：幅度)
        let fu = 10
        let shijian = 0.3

        if (time) {
            shijian = time
        }
        if (fudu) {
            fu = fudu
        }
        if (this.doudongZXZ.indexOf(nd) == -1) {
            this.doudongZXZ.push(nd)
            tween(nd)
                .by(shijian / 8, { position: new Vec3(fu, fu, 0) })
                .by(shijian / 8, { position: new Vec3(- fu, - fu, 0) })
                .by(shijian / 8, { position: new Vec3(-fu, fu, 0) })
                .by(shijian / 8, { position: new Vec3(fu, - fu, 0) })
                .by(shijian / 8, { position: new Vec3(-fu, -fu, 0) })
                .by(shijian / 8, { position: new Vec3(fu, fu, 0) })
                .by(shijian / 8, { position: new Vec3(fu, -fu, 0) })
                .by(shijian / 8, { position: new Vec3(-fu, fu, 0) })
                .call(() => {
                    let dhs = this.doudongZXZ.indexOf(nd)
                    this.doudongZXZ.splice(dhs, 1)
                })
                .start()
        }
    }

    XZzhong = []

    f反转(nd: Node, 时间?, 次数?, _1左右翻转2上下?) {
        if (this.XZzhong.indexOf(nd) == -1) {
            this.XZzhong.push(nd)

            let sj = 0.2
            let cs = 2

            if (时间) {
                sj = 时间
            }
            if (次数) {
                cs = 次数
            }
            if (_1左右翻转2上下) {
                if (_1左右翻转2上下 == 1) {
                    let t = tween(nd).to(sj, { scale: v3(-1, 1, 1) }).to(sj, { scale: v3(1, 1, 1) })
                    tween(nd).repeat(cs, t).call(() => {
                        let dhs = this.XZzhong.indexOf(nd)
                        this.XZzhong.splice(dhs, 1)
                    })
                        .start()
                } else {
                    let t = tween(nd).to(sj, { scale: v3(1, -1, 1) }).to(sj, { scale: v3(1, 1, 1) })
                    tween(nd).repeat(cs, t).call(() => {
                        let dhs = this.XZzhong.indexOf(nd)
                        this.XZzhong.splice(dhs, 1)
                    })
                        .start()
                }

            } else {
                let t = tween(nd).to(sj, { scale: v3(-1, 1, 1) }).to(sj, { scale: v3(1, 1, 1) })

                tween(nd).repeat(cs, t).call(() => {
                    let dhs = this.XZzhong.indexOf(nd)
                    this.XZzhong.splice(dhs, 1)
                })
                    .start()
            }

        }
    }

    c持续逐显(n: Node, time?: number, opa1?: number) {
        if (!n.getComponent(UIOpacity)) {
            console.log('没有UIOpacity组件')
            return
        }
        Tween.stopAllByTarget(n.getComponent(UIOpacity))
        let tm = 1
        if (time) {
            tm = time
        }
        let opa = 180
        if (opa1) {
            opa = opa1
        }
        let t = tween(n.getComponent(UIOpacity))
            .to(tm, { opacity: opa }).start()
            .to(tm, { opacity: 255 }).start()
        tween(n.getComponent(UIOpacity)).repeatForever(t).start()
    }

    c持续旋转(n: Node, j角度, s时间) {
        Tween.stopAllByTarget(n)
        n.angle = j角度
        let t = tween(n).to(s时间, { angle: -j角度 }).to(s时间, { angle: j角度 })
        tween(n).repeatForever(t).start()
    }

    //文字
    tszhong = []

    t提示通用(str: string) {
        let t = find('Canvas/通用提示')
        if (!t) {
            let n = instantiate(this.TSnode)
            n.setParent(find('Canvas'))
        }
        let tns = this.find查找('Canvas/通用提示')

        let wzn = tns.getChildByName('Label')
        let wz = str
        this.x修改文字(wzn, wz)

        let f = () => {
            tns.setPosition(0, -20)
            let wznuiSZ = wzn.getComponent(UITransform).contentSize
            let fknui = tns.getChildByName('fangkuai').getComponent(UITransform)
            fknui.setContentSize(wznuiSZ.width + 30, wznuiSZ.height)

            this.x修改透明度(tns, 180)
            Tween.stopAllByTarget(tns.getComponent(UIOpacity))
            Tween.stopAllByTarget(tns)
            tween(tns.getComponent(UIOpacity)).to(0.2, { opacity: 255 }).delay(0.8).to(0.2, { opacity: 0 }).start()
            tween(tns).to(0.2, { position: v3(0, 0) }).delay(1).set({ position: v3(2000, 2000) }).start()
        }
        this.scheduleOnce(f, 0.01)
    }

    z秒转换为分钟(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        let fz: string = minutes + ''
        let mz: string = remainingSeconds + ''
        if (minutes < 10) {
            fz = '0' + minutes
        }
        if (remainingSeconds < 10) {
            mz = '0' + remainingSeconds
        }
        let wz = fz + ':' + mz
        return wz;
    }

    //功能

    find查找(a: string): Node {
        let n = find(a)
        if (n) {
            return n
        } else {
            console.log('路径错误：' + a)
        }
    }

    X修改子节点位置(n: Node, _1为最上显示0为最下) {
        if (_1为最上显示0为最下 == 1) {
            n.setSiblingIndex(n.parent.children.length + 1)
        } else {
            n.setSiblingIndex(0)
        }
    }

    b播放粒子(n: Node) {
        if (n.getComponent(ParticleSystem2D)) {
            n.getComponent(ParticleSystem2D).resetSystem()
        } else {
            console.log('没找到组件ParticleSystem2D')
        }

    }

    t停止播放粒子(n: Node) {
        if (n.getComponent(ParticleSystem2D)) {
            n.getComponent(ParticleSystem2D).stopSystem()
        } else {
            console.log('没找到组件ParticleSystem2D')
        }

    }

    y预加载场景(场景名: string, 分包名?: string) {
        let fb = 'fb'
        if (分包名) {
            fb = 分包名
        }
        assetManager.loadBundle(fb, (err, a) => { a.loadScene(场景名, (err, a) => { console.log(场景名 + '场景预加载完成') }) })
    }

    g骨骼播放(nod: Node, srt: string, 循环: boolean) {
        let n = nod
        let zj = n.getComponent(sp.Skeleton)
        if (zj) {
            zj.setAnimation(0, srt, 循环)    //播放某个动画
        } else {
            console.log('没有找到组件sp.Skeleton')
        }
    }

    
    //常驻定时器
    c常驻定时器(时间, 回调) {

        let cznd = new Node('changzhuzhixin');
        cznd.setParent(this.node.parent);
        cznd.setPosition(2000, 2000);
        director.addPersistRootNode(cznd)
        cznd.addComponent('CZdingshiqiTS')
        cznd.getComponent(CZdingshiqiTS).d定时 = 时间
        cznd.getComponent(CZdingshiqiTS).z执行函数 = 回调
        cznd.getComponent(CZdingshiqiTS).d定时开始 = true

    }

    //物理
    w设置物理步长(num) {
        const system = PhysicsSystem2D.instance
        system.fixedTimeStep = num;    // 物理步长，默认 fixedTimeStep 是 1/60
    }


    //缓存
    h获取缓存(h缓存名字: string) {
        let a = JSON.parse(localStorage.getItem(h缓存名字))
        return a
    }

    g更新缓存(h缓存名字: string, sj) {
        let a = JSON.stringify(sj)
        localStorage.setItem(h缓存名字, a)
    }


    //数据数组

    Rand = (a, b) => { return Math.floor(Math.random() * (b - a + 1)) + a }

    s随机打乱(arr) { arr.sort(() => { return Math.random() > 0.5 ? -1 : 1 }) }

    K克隆数据(n) {
        let a = JSON.stringify(n)
        return JSON.parse(a)
    }

    //格式

    z转代号(hh, lh, z总列数) {
        let num = lh + hh * z总列数
        return num
    }

    s设置位置(列号, 行号, 初始x, 初始y, 间隔距离x, 间隔距离y, nod?: Node,) {
        let x = 初始x + 列号 * 间隔距离x
        let y = 初始y + 行号 * 间隔距离y
        let v = v3(x, y)
        if (nod) {
            nod.setPosition(v)
        } else {
            return v
        }

    }


    //修改属性
    x修改文字(node: Node, str: string) {
        if (!node) {
            console.log('没有找找到节点')
        }
        node.getComponent(Label).string = str
    }

    x修改透明度(node: Node, num: number) {
        let op = node.getComponent(UIOpacity)
        if (op) {
            op.opacity = num
        } else (
            console.log('找不到透明主键' + node)
        )

    }

    //修改button
    x修改botton_EventData(n: Node, str: string) {
        let bot = n.getComponent(Button)
        if (bot) {
            bot.clickEvents[0].customEventData = str
        } else {
            console.log('没有找到button组件')
        }
    }


    a按下监控获取位置(e: EventTouch) {
        let vv = new Vec2
        e.getUILocation(vv)
        let vvv = new Vec3(vv.x, vv.y, 0)
        let v = new Vec3(0, 0, 0)
        let ckn = find('Canvas')
        ckn.getComponent(UITransform).convertToNodeSpaceAR(vvv, v)

        return v
    }

    //ui通用
    t弹出通用(n: Node) {
        n.setPosition(0, 0)
        let nz = n.getChildByName('小组')
        nz.setScale(0.1, 0.1, 1)
        tween(nz).to(0.2, { scale: v3(1.1, 1.1, 1) }).to(0.1, { scale: v3(1, 1, 1) }).start()
    }

    g关闭通用(n: Node) {
        n.setPosition(2000, 5000)
    }


    //微信api

    z震动执行() {
        if (JSON.parse(localStorage.getItem('HC_yinxiaokongzhi'))) {
            console.log('震动')
        }
    }

    c创建插屏() {
        if (SJTS.q其他广告开启) {
            weixinapi.c展示插屏广告()
        }
    }

    c创建banner(_1格子2banner) {
        if (SJTS.q其他广告开启) {
            if(_1格子2banner==1){
                weixinapi.z展示格子广告()
            }
            if(_1格子2banner==2){
                weixinapi.z展示banner广告()
            }
            /* 
            let f=()=>{
                this.g关闭banner()
            }
            this.c常驻定时器(this.banner最长停留时间,f)
             */
        }

    }

    g关闭banner() {
        if (SJTS.q其他广告开启) {
            weixinapi.g关闭banner()
            weixinapi.g关闭格子()
        }
    }

    f分享(f) {
        let fsb = () => {
            this.bofangshenyin(4)
            this.t提示通用('分享失败')
        }

        weixinapi.starttime = new Date().getTime();
        weixinapi.F_fxcg = f
        weixinapi.F_fxsb = fsb
        weixinapi.onshowzx()

        weixinapi.f分享()

    }


}