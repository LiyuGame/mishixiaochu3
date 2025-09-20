import { _decorator, assert, AudioSource, CircleCollider2D, Component, director, easing, ERigidBody2DType, EventTouch, find, instantiate, log, Node, RigidBody2D, Skeleton, Tween, tween, UIOpacity, UITransform, v2, v3, Vec2, Vec3 } from 'cc';
import { tongyongTS } from '../tongyongTS/tongyongTS';
import { weixinapi } from '../tongyongTS/weixinAIP';
import { SJTS } from '../../../jinruchangjing/SJTS';
const { ccclass, property } = _decorator;

interface sxjk {
    h行号: number
    ,
    l列号: number
    ,
    d代号: number
    ,
    s数值: number
}


@ccclass('mishixiaochuTS')
export class mishixiaochuTS extends Component {
    ty: tongyongTS

    readonly j间隔距离 = 64
    readonly c初始x = -this.j间隔距离 * 5
    readonly c初始y = 32 - this.j间隔距离 * 10
    readonly z总行数 = 10
    readonly z总列数 = 11
    readonly z最大Y消除距离 = -860

    j教学开启 = true
    d抖动开启 = false
    d当前得分 = 0
    d当前时间 = 0

    //此变量可更改游戏难度
    z总时间 = 70
    s胜利得分 = 110
    s生成石头总数 = 200
    z最大种类数 = 3
    f方块排列难度 = 1      //范围限定 1-3
    s石头最小半径 = 6     //范围限定 1-10
    s石头最大半径 = 10     //范围限定 1-10
    s石头摩擦系数 = 0     //范围限定 0-1

    h黄金关 = false
    s属性: sxjk = {
        h行号: -1
        ,
        l列号: -1
        ,
        d代号: -1
        ,
        s数值: -1
    }
    s数据管理: number[] = []
    f方块物理管理: Node[] = []
    j节点管理: Node[] = []

    ceshi1() {
        this.s胜利执行()
    }

    ceshi2() {
        let f = () => { console.log('asd') }
        this.ty.c常驻定时器(5, f)
    }

    ceshi3() {
        this.z助力道具弹出()
    }

    protected onLoad(): void {
        this.ty = find('通用管理').getComponent(tongyongTS)
    }

    start() {
        this.ty.g关闭banner()
        this.ty.c创建插屏()
        this.ty.w设置物理步长(1/30)    
       
       

        console.log('当前关卡：' + this.ty.h获取缓存('HC_MSXC_CGS'))
        if (SJTS.HC_MSXC_CGS == 0) {
            this.y游戏难度设置(1)
        } else {
            this.y游戏难度设置(this.ty.Rand(2, 3))
        }


    

        let n = this.ty.find查找('Canvas/上方显示组/进度条/yuan20changkuang/Label')
        let wz = '剩余石头：' + this.s胜利得分
        this.ty.x修改文字(n, wz)

        this.s生成数据()
        this.s生成方块()
        this.s生产石头()

        this.教学()

    }

    g骨骼动画(num) {
        let n =this.ty.find查找('Canvas/主程序/墙主/7/人物动画')
       if(num==1){
        this.ty.g骨骼播放(n,'zhangli',true)
       }
       if(num==2){
        this.ty.g骨骼播放(n,'tuidong',true)
       }
       if(num==3){
        this.ty.g骨骼播放(n,'siwan',true)
       } 
    }


    y游戏难度设置(nd) {
        if (nd == 1) {      //新手关卡
            this.z总时间 = 70
            this.s生成石头总数 = 180
            this.z最大种类数 = 3
            this.f方块排列难度 = 1
            this.s石头最小半径 = 6
            this.s石头最大半径 = 8
            this.s石头摩擦系数 = 0
            this.s胜利得分 = 70
            let n = this.ty.find查找('Canvas/主程序/克隆主/石头')
            n.children[0].active = true
        }

        if (nd == 2) {      //普通关卡
            this.z总时间 = 70
            this.s胜利得分 = 110
            this.s生成石头总数 = 130
            this.z最大种类数 = 3
            this.f方块排列难度 = 1
            this.s石头最小半径 = 8
            this.s石头最大半径 = 10
            let gl = this.ty.Rand(0, 1) / 10
            this.s石头摩擦系数 = gl
            this.s胜利得分 = this.s生成石头总数 / 2 + Math.ceil(this.s生成石头总数 / 5)

            let n = this.ty.find查找('Canvas/主程序/克隆主/石头')
            n.children[0].active = true

        }

        if (nd == 3) {      //解压关卡
            this.z总时间 = 70
            this.s胜利得分 = 110
            this.s生成石头总数 = 180
            this.z最大种类数 = 3
            this.f方块排列难度 = 1
            this.s石头最小半径 = 6
            this.s石头最大半径 = 8
            let gl = this.ty.Rand(0, 1) / 10
            this.s石头摩擦系数 = gl
            this.s胜利得分 = this.s生成石头总数 / 2 + Math.ceil(this.s生成石头总数 / 5)
            let n = this.ty.find查找('Canvas/主程序/克隆主/石头')
            n.children[1].active = true
            this.t提示黄金关卡()
        }

        if (nd == 4) {      //基本不能过关
            this.z总时间 = 70
            this.s胜利得分 = 110
            this.s生成石头总数 = 110
            this.z最大种类数 = 3
            this.f方块排列难度 = 1
            this.s石头最小半径 = 10
            this.s石头最大半径 = 10
            this.s石头摩擦系数 = 0.5
            this.s胜利得分 = this.s生成石头总数 / 2 + Math.ceil(this.s生成石头总数 / 5)
            let n = this.ty.find查找('Canvas/主程序/克隆主/石头')
            n.children[0].active = true
        }
        console.log('游戏难度：' + nd)
        console.log('摩擦系数：' + this.s石头摩擦系数)
    }

    教学() {
        if (this.ty.h获取缓存('HC_MSXC_jiaoxue')) {
            this.j教学开启 = true
            this.ty.find查找('Canvas/教学组').active = true

            let n1 = this.ty.find查找('Canvas/教学组/duihuakuanQ')
            this.ty.c持续旋转(n1, 6, 1)

            let n2: Node = this.ty.find查找('Canvas/教学组/shouzhi1')
            let t = tween(n2).by(0.8, { position: v3(0, 60) }).by(0.8, { position: v3(0, -60) })
            tween(n2).repeatForever(t).start()
        } else {
            this.j教学开启 = false
            this.ty.find查找('Canvas/教学组').active = false
        }
    }

    t提示黄金关卡() {
        this.h黄金关 = true
        let n = this.ty.find查找('Canvas/弹出组/提示弹出')
        this.ty.t弹出通用(n)

        let n2 = this.ty.find查找('Canvas/弹出组/提示弹出/小组/文字-002')
        this.ty.c持续逐显(n2)
    }

    g关闭提示黄金() {
        let n = this.ty.find查找('Canvas/弹出组/提示弹出')
        this.ty.g关闭通用(n)
    }

    s生产石头() {
        let jg = 0.02
        let sl = 0
        let f = () => {
            sl++
            let n = instantiate(this.ty.find查找('Canvas/主程序/克隆主/石头'))
            let dx = this.ty.Rand(this.s石头最小半径, this.s石头最大半径) / 10       //设置大小
            n.setScale(v3(dx, dx))
            n.setParent(this.ty.find查找('Canvas/主程序/石头主'))
            let x = this.ty.Rand(-250, -200)
            let y = this.ty.Rand(400, 450)
            n.setPosition(x, y)
            let cir = n.getComponent(CircleCollider2D)
            cir.friction = this.s石头摩擦系数
            let wuzj: RigidBody2D = n.getComponent(RigidBody2D)
            wuzj.type = ERigidBody2DType.Dynamic
            let vv = v2(30, 0)
            wuzj.applyLinearImpulseToCenter(vv, true)

            // tween(n).to(0.1, { scale: v3(dx, dx) }).start()


            if (sl == this.s生成石头总数) {
                this.k开启倒计时()
            }
        }
        this.schedule(f, jg, this.s生成石头总数)

    }

    s生成数据() {
        for (let hh = 0; hh < this.z总行数; hh++) {
            for (let lh = 0; lh < this.z总列数; lh++) {
                this.s数据管理.push(this.ty.Rand(0, this.z最大种类数 - 1))
            }
        }

        let fSDSZ = () => {
            //手动设置某点数值
            let d1dh = this.z转代号(this.z总行数 - 1, this.z总列数 - 2)
            let d2dh = this.z转代号(this.z总行数 - 1, this.z总列数 - 1)
            let d3dh = this.z转代号(this.z总行数 - 2, this.z总列数 - 1)
            let d4dh = this.z转代号(this.z总行数 - 2, this.z总列数 - 2)
            let d5dh = this.z转代号(this.z总行数 - 3, this.z总列数 - 1)
            let d6dh = this.z转代号(this.z总行数 - 4, this.z总列数 - 1)

            if (this.ty.h获取缓存('HC_MSXC_jiaoxue')) {
                this.s数据管理[d1dh] = 1
                this.s数据管理[d2dh] = 1
                this.s数据管理[d3dh] = 1
                this.s数据管理[d4dh] = 1
                this.s数据管理[d5dh] = 2
                this.s数据管理[d6dh] = 1
            }

        }

        fSDSZ()

        let dh = 0
        let xh = 1

        let cishu = 0
        let fkscs = 0
        while (xh == 1) {
            xh = 0
            cishu++ //判断循环多少次
            if (cishu > 1000) { //防卡死全随机
                cishu = 0
                this.s数据管理.forEach((e, indx) => {
                    this.s数据管理[indx] = this.ty.Rand(0, this.z最大种类数 - 1)
                })
                fSDSZ()
                console.log('防卡死全随机')
                fkscs++
                if (fkscs > 100) {  //防卡死停止
                    console.log('防卡死停止难度3')
                    this.f方块排列难度 = 1
                }
            }

            for (let k = 0; k < this.s数据管理.length; k++) {
                dh = k
                let hlh = this.z转行列号(dh)
                let n难度 = this.f方块排列难度   //此处 可设置难度 1为： 随机生成同行同列不超过3个  2为： 随机生成同行不超过3个同列不超过2个 3为： 随机生成同行同列不超过2个
                //  n难度 = this.ty.Rand(1, 3)
                if (n难度 == 1) {
                    //上方向判定
                    if (hlh.h + 2 < this.z总行数) {
                        let dh1 = this.z转代号(hlh.h + 1, hlh.l)
                        let dh2 = this.z转代号(hlh.h + 2, hlh.l)
                        if (this.s数据管理[dh] == this.s数据管理[dh1] && this.s数据管理[dh] == this.s数据管理[dh2]) {
                            this.s数据管理[dh] = this.ty.Rand(0, this.z最大种类数 - 1)
                            xh = 1
                            break;
                        }
                    }
                    //右方向判定
                    if (hlh.l + 2 < this.z总列数) {
                        let dh1 = this.z转代号(hlh.h, hlh.l + 1)
                        let dh2 = this.z转代号(hlh.h, hlh.l + 2)
                        if (this.s数据管理[dh] == this.s数据管理[dh1] && this.s数据管理[dh] == this.s数据管理[dh2]) {
                            this.s数据管理[dh] = this.ty.Rand(0, this.z最大种类数 - 1)
                            xh = 1
                            break;
                        }
                    }
                }

                if (n难度 == 2) {
                    //上方向判定
                    if (hlh.h + 1 < this.z总行数) {
                        let dh1 = this.z转代号(hlh.h + 1, hlh.l)
                        if (this.s数据管理[dh] == this.s数据管理[dh1]) {
                            this.s数据管理[dh] = this.ty.Rand(0, this.z最大种类数 - 1)
                            xh = 1
                            break;
                        }
                    }
                    //右方向判定
                    if (hlh.l + 2 < this.z总列数) {
                        let dh1 = this.z转代号(hlh.h, hlh.l + 1)
                        let dh2 = this.z转代号(hlh.h, hlh.l + 2)
                        if (this.s数据管理[dh] == this.s数据管理[dh1] && this.s数据管理[dh] == this.s数据管理[dh2]) {
                            this.s数据管理[dh] = this.ty.Rand(0, this.z最大种类数 - 1)
                            xh = 1
                            break;
                        }
                    }
                }

                if (n难度 == 3) {
                    //上方向判定
                    if (hlh.h + 2 < this.z总行数) {
                        let dh1 = this.z转代号(hlh.h + 1, hlh.l)
                        if (this.s数据管理[dh] == this.s数据管理[dh1]) {
                            this.s数据管理[dh] = this.ty.Rand(0, this.z最大种类数 - 1)
                            this.s数据管理[dh1] = this.ty.Rand(0, this.z最大种类数 - 1)
                            xh = 1
                            break;
                        }
                    }
                    //右方向判定
                    if (hlh.l + 2 < this.z总列数) {
                        let dh1 = this.z转代号(hlh.h, hlh.l + 1)
                        if (this.s数据管理[dh] == this.s数据管理[dh1]) {
                            this.s数据管理[dh] = this.ty.Rand(0, this.z最大种类数 - 1)
                            this.s数据管理[dh1] = this.ty.Rand(0, this.z最大种类数 - 1)
                            xh = 1
                            break;
                        }
                    }
                }


            }

        }
    }

    z转行列号(代号) {
        let hlh = {
            h: 0,
            l: 0,
        }
        let shuzhi = 0
        let hanghao = 0
        let liehao = 0
        for (let i = 0; i < 代号; i++) {
            liehao++
            if (liehao == this.z总列数) {
                liehao = 0
                hanghao++
            }
            shuzhi++
        }
        hlh.h = hanghao
        hlh.l = liehao
        return hlh
    }

    z转代号(hh, lh) {
        let num = lh + hh * this.z总列数
        return num
    }

    f返回位置(n: Node): Vec3 {
        if (n) {
            let nam: sxjk = JSON.parse(n.name)
            let hh = nam.h行号
            let lh = nam.l列号

            let x = this.c初始x + lh * this.j间隔距离
            let y = this.c初始y + hh * this.j间隔距离
            let v = v3(x, y)

            return v
        } else {
            return null
        }
    }

    s生成方块() {
        let z = this.ty.find查找('Canvas/主程序/克隆主/方块')

        for (let hh = 0; hh < this.z总行数; hh++) {
            for (let lh = 0; lh < this.z总列数; lh++) {
                let n = instantiate(z)
                n.setParent(this.ty.find查找('Canvas/主程序/方块主'))
                this.s属性.h行号 = hh
                this.s属性.l列号 = lh
                this.s属性.d代号 = this.z转代号(hh, lh)
                this.s属性.s数值 = this.s数据管理[this.z转代号(hh, lh)]
                let nam = JSON.stringify(this.s属性)
                n.name = nam

                this.s按钮监控设置(n, 1)

                let fkwn = instantiate(this.ty.find查找('Canvas/主程序/克隆主/方块物理'))
                fkwn.setParent(this.ty.find查找('Canvas/主程序/方块物理主'))
                //设置数据组
                this.j节点管理.push(n)
                this.f方块物理管理.push(fkwn)
                //设置位置
                let v = this.ty.s设置位置(lh, hh, this.c初始x, this.c初始y, this.j间隔距离, this.j间隔距离)
                n.setPosition(v)
                fkwn.setPosition(v)

                //更新造型
                n.children[1].children[this.s属性.s数值].active = true


            }

        }
    }

    s按钮监控设置(n: Node, _1开启2_关闭) {
        if (_1开启2_关闭 == 1) {
            n.on(Node.EventType.TOUCH_START, this.按下执行, this)
            n.on(Node.EventType.TOUCH_MOVE, this.滑动执行, this)
            n.on(Node.EventType.TOUCH_END, this.放开执行, this)
            n.on(Node.EventType.TOUCH_CANCEL, this.放开执行, this)
        } else {
            n.off(Node.EventType.TOUCH_START, this.按下执行, this)
            n.off(Node.EventType.TOUCH_MOVE, this.滑动执行, this)
            n.off(Node.EventType.TOUCH_END, this.放开执行, this)
            n.off(Node.EventType.TOUCH_CANCEL, this.放开执行, this)
        }
    }

    lizin: Node = null
    l粒子按下出现(v: Vec3) {
        if (!this.lizin) {
            this.lizin = this.ty.find查找('Canvas/动画组/lanseDJ')
        }
        this.lizin.setPosition(v)

        this.ty.b播放粒子(this.lizin)
    }

    l粒子滑动执行(v) {
        if (this.lizin) {
            this.lizin.setPosition(v)
        }
    }

    l粒子放开消失() {
        if (this.lizin) {
            this.ty.t停止播放粒子(this.lizin)
        }
    }

    l临时节点: Node[] = [null, null, null, null, null]
    l临时节点坐标: Vec3[] = [null, null, null, null, null]
    f方向 = 0
    按下执行(e: EventTouch) {
        this.ty.bofangshenyin(3)
        this.l粒子按下出现(this.ty.a按下监控获取位置(e))

        this.f方向 = 0
        this.l临时节点 = [null, null, null, null, null]
        this.l临时节点坐标 = [null, null, null, null, null]

        let n: Node = e.target

        this.l临时节点[0] = n
        this.ty.X修改子节点位置(n, 1)
        n.getChildByName('选择框')
        this.ty.x修改透明度(n.getChildByName('选择框'), 255)

        let nam: sxjk = JSON.parse(n.name)
        let hh = nam.h行号
        let lh = nam.l列号

        //找到上下左右
        //上
        if (hh + 1 < this.z总行数) {
            let dh = this.ty.z转代号(hh + 1, lh, this.z总列数)
            if (this.j节点管理[dh]) {
                this.l临时节点[1] = this.j节点管理[dh]
            }
        }

        if (hh - 1 >= 0) {
            let dh = this.ty.z转代号(hh - 1, lh, this.z总列数)
            if (this.j节点管理[dh]) {
                this.l临时节点[2] = this.j节点管理[dh]
            }
        }
        if (lh - 1 >= 0) {
            let dh = this.ty.z转代号(hh, lh - 1, this.z总列数)
            if (this.j节点管理[dh]) {
                this.l临时节点[3] = this.j节点管理[dh]
            }
        }
        if (lh + 1 < this.z总列数) {
            let dh = this.ty.z转代号(hh, lh + 1, this.z总列数)
            if (this.j节点管理[dh]) {
                this.l临时节点[4] = this.j节点管理[dh]
            }
        }

        for (let i = 0; i < 5; i++) {
            if (this.l临时节点[i]) {
                this.l临时节点坐标[i] = this.f返回位置(this.l临时节点[i]).clone()
            }
        }
    }

    滑动执行(e: EventTouch) {

        //获取点击位置V
        let vv = new Vec2
        e.getUILocation(vv)
        let vvv = new Vec3(vv.x, vv.y, 0)
        let v = new Vec3(0, 0, 0)
        let ckn = find('Canvas')
        ckn.getComponent(UITransform).convertToNodeSpaceAR(vvv, v)     //转换坐标
        this.l粒子滑动执行(v)
        //判断 1上 2下 3左 4右  
        let cv = this.l临时节点坐标[0].clone()
        let ydx = v.x - cv.x
        let ydy = v.y - cv.y

        for (let i = 0; i < 5; i++) {
            if (this.l临时节点[i]) {
                this.l临时节点[i].setPosition(this.l临时节点坐标[i])
                this.ty.x修改透明度(this.l临时节点[i], 255)
            }
        }

        let n0 = this.l临时节点[0]
        let vv0 = this.l临时节点坐标[0].clone()
        if (Math.abs(ydy) > Math.abs(ydx)) {   //判断为上下移动
            let yd = Math.abs(ydy)
            if (ydy > 0) {  //判断为上移动
                let n1 = this.l临时节点[1]
                if (n1) {
                    if (yd > this.j间隔距离 / 2) {
                        this.f方向 = 1
                    } else {
                        this.f方向 = 0
                    }

                    if (yd < 0) {
                        yd = 0
                    }
                    if (yd > this.j间隔距离) {
                        yd = this.j间隔距离
                    }


                    let vv1 = this.l临时节点坐标[1].clone()
                    n0.setPosition(vv0.x, vv0.y + yd)
                    n1.setPosition(vv1.x, vv1.y - yd)
                    this.ty.x修改透明度(n1, 180)
                }

            } else {  //判断为下移动
                let n1 = this.l临时节点[2]
                if (n1) {
                    if (yd > this.j间隔距离 / 2) {
                        this.f方向 = 2
                    } else {
                        this.f方向 = 0
                    }

                    if (yd < 0) {
                        yd = 0
                    }
                    if (yd > this.j间隔距离) {
                        yd = this.j间隔距离
                    }

                    let vv1 = this.l临时节点坐标[2].clone()
                    n0.setPosition(vv0.x, vv0.y - yd)
                    n1.setPosition(vv1.x, vv1.y + yd)
                    this.ty.x修改透明度(n1, 180)
                }
            }
        } else {  //判断为左右移动
            let yd = Math.abs(ydx)
            if (ydx < 0) {    //判断为左移动
                let n1 = this.l临时节点[3]
                if (n1) {
                    if (yd > this.j间隔距离 / 2) {
                        this.f方向 = 3
                    } else {
                        this.f方向 = 0
                    }
                    if (yd < 0) {
                        yd = 0
                    }
                    if (yd > this.j间隔距离) {
                        yd = this.j间隔距离
                    }


                    let vv1 = this.l临时节点坐标[3].clone()
                    n0.setPosition(vv0.x - yd, vv0.y)
                    n1.setPosition(vv1.x + yd, vv1.y)
                    this.ty.x修改透明度(n1, 180)
                }
            } else {  //判断为右移动
                let n1 = this.l临时节点[4]
                if (n1) {
                    if (yd > this.j间隔距离 / 2) {
                        this.f方向 = 4
                    } else {
                        this.f方向 = 0
                    }

                    if (yd < 0) {
                        yd = 0
                    }
                    if (yd > this.j间隔距离) {
                        yd = this.j间隔距离
                    }


                    let vv1 = this.l临时节点坐标[4].clone()
                    n0.setPosition(vv0.x + yd, vv0.y)
                    n1.setPosition(vv1.x - yd, vv1.y)
                    this.ty.x修改透明度(n1, 180)
                }
            }



        }

    }


    放开执行(e: EventTouch) {
        this.l粒子放开消失()
        this.ty.x修改透明度(this.l临时节点[0].getChildByName('选择框'), 0)
        this.n能消除的代号 = []

        let f还原 = () => {
            for (let i = 0; i < 5; i++) {
                if (this.l临时节点[i]) {
                    this.ty.x修改透明度(this.l临时节点[i], 255)
                    tween(this.l临时节点[i]).to(0.1, { position: this.f返回位置(this.l临时节点[i]) }).start()
                }
            }
        }
        //  log(this.f方向)
        if (this.f方向 == 0) {
            f还原()
        }
        for (let i = 1; i < 5; i++) {
            if (this.f方向 == i) {
                let shuju: number[] = this.ty.K克隆数据(this.s数据管理)
                let namsx: sxjk = JSON.parse(this.l临时节点[0].name)
                let namsxx: sxjk = JSON.parse(this.l临时节点[i].name)  //此处为方向节点
                let dh = namsx.d代号
                let dhh = namsxx.d代号

                this.j交换数组数据(shuju, dh, dhh)

                if (this.p判断是否能消除(shuju)) {
                    let sj = this.ty.K克隆数据(shuju)
                    this.s数据管理 = sj

                    this.j交换节点属性(this.j节点管理[dh], this.j节点管理[dhh])

                    this.jj交节点组数据(this.j节点管理, dh, dhh)
                    this.jj交节点组数据(this.f方块物理管理, dh, dhh)
                    this.f方块物理管理[dh].setPosition(this.f返回位置(this.j节点管理[dh]))
                    this.f方块物理管理[dhh].setPosition(this.f返回位置(this.j节点管理[dhh]))
                }
                f还原()
            }
        }

        this.s删除执行()



    }

    s删除执行() {
        let sz: number[] = this.ty.K克隆数据(this.n能消除的代号)
        if (this.j教学开启 && sz.length > 1) {
            this.j教学开启 = false
            this.ty.g更新缓存('HC_MSXC_jiaoxue', this.j教学开启)

            this.ty.find查找('Canvas/教学组').active = false

        }

        sz.forEach((e, indx) => {
            let n = this.j节点管理[e]
            this.ty.X修改子节点位置(n, 1)
            this.s按钮监控设置(n, 2)

            this.s数据管理[e] = -1
            this.j节点管理[e] = null

            let time1 = 0.3
            let v = v3(0, 20)

            tween(n)
                .delay(time1)     //此处修改为动画1
                .call(() => {
                    this.f方块物理管理[e].destroy()
                    this.f方块物理管理[e] = null
                })
                .by(1.5, { position: v3(0, -1000) })
                .call(() => {
                    n.destroy()
                })
                .start()

            tween(n.children[1]).by(time1, { position: v }).start()
            tween(n.children[1]).by(time1, { angle: 360 })
                .call(() => {
                    n.children[1].destroy()
                })
                .start()
        })

        if (sz.length > 1) {
            this.ty.bofangshenyin(36)
            this.ty.z震动执行()
            if (this.d抖动开启) {
                this.d抖动执行()
            }
        } else {
            this.ty.bofangshenyin(35)
        }

    }

    j交换数组数据(数组, 代号1, 代号2) {
        let sz = this.ty.K克隆数据(数组)
        let dh1 = 代号1
        let dh2 = 代号2
        let num1 = sz[dh1]
        let num2 = sz[dh2]
        数组[dh1] = num2
        数组[dh2] = num1
    }

    jj交节点组数据(数组, 代号1, 代号2) {
        let a = 数组[代号1]
        let b = 数组[代号2]
        数组[代号1] = b
        数组[代号2] = a
    }

    j交换节点属性(nod1: Node, nod2: Node) {
        let nam1: sxjk = JSON.parse(nod1.name)
        let nam2: sxjk = JSON.parse(nod2.name)

        this.s属性 = this.ty.K克隆数据(nam1)
        nod2.name = JSON.stringify(this.s属性)

        this.s属性 = this.ty.K克隆数据(nam2)
        nod1.name = JSON.stringify(this.s属性)

    }
    n能消除的代号: number[] = []
    p判断是否能消除(sz: number[]) {
        this.n能消除的代号 = []
        let nxc = false
        for (let k = 0; k < sz.length; k++) {
            let dh = k
            let hlh = this.z转行列号(dh)
            //上方向判定
            if (hlh.h + 2 < this.z总行数) {
                let dh1 = this.z转代号(hlh.h + 1, hlh.l)
                let dh2 = this.z转代号(hlh.h + 2, hlh.l)
                if (sz[dh] == sz[dh1] && sz[dh] == sz[dh2] && sz[dh1] != -1 && sz[dh2] != -1) {
                    nxc = true
                    let numdh = dh
                    if (this.n能消除的代号.indexOf(numdh) < 0) {
                        this.n能消除的代号.push(numdh)
                    }
                    numdh = dh1
                    if (this.n能消除的代号.indexOf(numdh) < 0) {
                        this.n能消除的代号.push(numdh)
                    }
                    numdh = dh2
                    if (this.n能消除的代号.indexOf(numdh) < 0) {
                        this.n能消除的代号.push(numdh)
                    }

                }
            }
            //右方向判定
            if (hlh.l + 2 < this.z总列数) {
                let dh1 = this.z转代号(hlh.h, hlh.l + 1)
                let dh2 = this.z转代号(hlh.h, hlh.l + 2)
                if (sz[dh] == sz[dh1] && sz[dh] == sz[dh2] && sz[dh1] != -1 && sz[dh2] != -1) {
                    nxc = true
                    let numdh = dh
                    if (this.n能消除的代号.indexOf(numdh) < 0) {
                        this.n能消除的代号.push(numdh)
                    }
                    numdh = dh1
                    if (this.n能消除的代号.indexOf(numdh) < 0) {
                        this.n能消除的代号.push(numdh)
                    }
                    numdh = dh2
                    if (this.n能消除的代号.indexOf(numdh) < 0) {
                        this.n能消除的代号.push(numdh)
                    }
                }
            }
        }

        return nxc
    }

    x需暂停obj节点 = []
    k开启倒计时() {
        this.g骨骼动画(2)
        //时间缓动
        let n = this.ty.find查找('Canvas/上方显示组/倒计时')
        this.x需暂停obj节点.push(n)
        let t = tween(n).call(() => {
            this.d当前时间++

            let tm = this.z总时间 - this.d当前时间
            let wzn = this.ty.find查找('Canvas/上方显示组/倒计时/Label')
            let wz = this.ty.z秒转换为分钟(tm)
            this.ty.x修改文字(wzn, wz)


            if (tm <= 15) {
                if (this.k可显示红光) {
                    this.x显示红光()
                }
            }

            if (tm <= 0) {
                this.s失败执行()
            }
        })
            .delay(1)
        tween(n).repeatForever(t).start()

        //上方墙缓动
        let nq = this.ty.find查找('Canvas/主程序/墙主/Mask/8')
        this.x需暂停obj节点.push(nq)
        tween(nq).by(this.z总时间, { position: v3(488, 0) }).start()

        //下方墙缓动
        let nqx = this.ty.find查找('Canvas/主程序/墙主/7')
        this.x需暂停obj节点.push(nqx)
        tween(nqx).by(this.z总时间, { position: v3(-310, 0) }).start() //此处需根据角色大小修改

        if (SJTS.s失败次数 >= 2) {
            SJTS.s失败次数 = 0
            this.z助力道具弹出()
        }
    }

    z暂停倒计时() {
        this.x需暂停obj节点.forEach((e) => {
            Tween.pauseAllByTarget(e)
        })
    }

    h恢复倒计时() {
        this.x需暂停obj节点.forEach((e) => {
            Tween.resumeAllByTarget(e)
        })
    }

    k可显示红光 = true
    x显示红光() {
        if (this.k可显示红光) {
            this.ty.bofangshenyin(21)
            this.k可显示红光 = false
            let n = this.ty.find查找('Canvas/动画组/红光')
            n.setPosition(0, 0)

            let t = tween(n.getComponent(UIOpacity))
                .to(1, { opacity: 0 }).start()
                .to(1, { opacity: 150 }).start()
            tween(n.getComponent(UIOpacity)).repeatForever(t).start()
        }
    }

    d得分执行() {
        if (this.k可胜利执行) {
            this.d当前得分++
            let wnz = this.ty.find查找('Canvas/上方显示组/进度条/yuan20changkuang/Label')
            let wz = '剩余石头：' + (this.s胜利得分 - this.d当前得分)
            this.ty.x修改文字(wnz, wz)

            //修改上方进度条显示
            let zchangdu = -60 + 380
            let wn = this.ty.find查找('Canvas/上方显示组/进度条/yuan20changkuang/Mask/yuan20changkuang')
            let vx = -380 + (this.d当前得分 / this.s胜利得分) * zchangdu
            wn.setPosition(vx, 0)

            if (this.d当前得分 >= this.s胜利得分) {
                this.s胜利执行()
            }

            if (this.h黄金关) {
                SJTS.HC_qian++
            }
        }
    }


    s失败执行() {
        this.k可胜利执行=false
        this.ty.c创建banner(2)
        this.g骨骼动画(3)
        this.ty.node.getComponent(AudioSource).pause()
        this.ty.bofangshenyin(37)
        this.tx体力显示()
        SJTS.s失败次数++
        this.z暂停倒计时()
        let n = this.ty.find查找('Canvas/弹出组/失败弹出')
        n.setPosition(0, 0)
        let xz = this.ty.find查找("Canvas/弹出组/失败弹出/小组")
        xz.setPosition(2000, 2000)

        let ttn = this.ty.find查找('Canvas/弹出组/失败弹出/shenglist')
        ttn.setPosition(0, 0)
        tween(ttn).by(0.3, { position: v3(0, 350) }).call(() => {
            xz.setPosition(0, 0)
        }).start()
    }

    k可胜利执行 = true
    s胜利执行() {
        if (this.k可胜利执行) {
            this.ty.c创建banner(2)
            this.ty.bofangshenyin(14)
            this.ty.node.getComponent(AudioSource).pause()
            SJTS.s失败次数 = 0
            this.k可胜利执行 = false
            this.z暂停倒计时()

            SJTS.HC_MSXC_CGS = this.ty.h获取缓存('HC_MSXC_CGS') + 1
            this.ty.g更新缓存('HC_MSXC_CGS', SJTS.HC_MSXC_CGS)

            let n = this.ty.find查找('Canvas/弹出组/胜利弹出')
            n.setPosition(0, 0)
            let xz = this.ty.find查找("Canvas/弹出组/胜利弹出/小组")
            xz.setPosition(2000, 2000)

            let ttn = this.ty.find查找('Canvas/弹出组/胜利弹出/shenglist')
            ttn.setPosition(0, 0)
            tween(ttn).by(0.3, { position: v3(0, 350) }).call(() => {
                xz.setPosition(0, 0)
                let gh = this.ty.find查找('Canvas/弹出组/胜利弹出/小组/guangquan3')
                this.ty.c持续旋转(gh, 360, 10)
            }).start()
        }
    }

    d抖动执行() {
        let n = find('Canvas/主程序')
        this.ty.d抖动(n, 0.3, 10)
        n = find('Canvas/主程序/石头主')
        this.ty.d抖动(n, 0.3, 10)

    }

    s刷新执行() {
        this.ty.bofangshenyin(33)
        this.s数据管理.forEach((e, indx) => {
            if (e != -1) {
                this.s数据管理[indx] = this.ty.Rand(0, this.z最大种类数 - 1)
            }
        })

        let dh = 0
        let xh = 1
        let cishu = 0
        while (xh == 1) {
            xh = 0
            cishu++ //判断循环多少次
            if (cishu > 1000) { //卡死判断
                cishu = 0
                this.s数据管理.forEach((e, indx) => {
                    if (e != -1) {
                        this.s数据管理[indx] = this.ty.Rand(0, this.z最大种类数 - 1)
                    }
                })
            }

            for (let k = 0; k < this.s数据管理.length; k++) {
                dh = k
                let hlh = this.z转行列号(dh)

                //上方向判定
                if (hlh.h + 2 < this.z总行数) {
                    let dh1 = this.z转代号(hlh.h + 1, hlh.l)
                    let dh2 = this.z转代号(hlh.h + 2, hlh.l)
                    if (this.s数据管理[dh] == this.s数据管理[dh1] && this.s数据管理[dh] == this.s数据管理[dh2] && this.s数据管理[dh] != -1) {
                        this.s数据管理[dh] = this.ty.Rand(0, this.z最大种类数 - 1)
                        xh = 1
                        break;
                    }
                }
                //右方向判定
                if (hlh.l + 2 < this.z总列数) {
                    let dh1 = this.z转代号(hlh.h, hlh.l + 1)
                    let dh2 = this.z转代号(hlh.h, hlh.l + 2)
                    if (this.s数据管理[dh] == this.s数据管理[dh1] && this.s数据管理[dh] == this.s数据管理[dh2] && this.s数据管理[dh] != -1) {
                        this.s数据管理[dh] = this.ty.Rand(0, this.z最大种类数 - 1)
                        xh = 1
                        break;
                    }
                }
            }
        }


        //更新方块造型
        let dh2 = -1
        this.s数据管理.forEach((e) => {
            dh2++
            if (e != -1) {
                let n: Node = this.j节点管理[dh2]
                let hlh = this.z转行列号(dh2)
                this.s属性.h行号 = hlh.h
                this.s属性.l列号 = hlh.l
                this.s属性.d代号 = dh2
                this.s属性.s数值 = e
                let nam = JSON.stringify(this.s属性)
                n.name = nam

                //更新造型
                n.children[1].children.forEach((e) => {
                    e.active = false
                })
                n.children[1].children[this.s属性.s数值].active = true
                this.ty.f反转(n, null, 2, this.ty.Rand(1, 2))
            }
        })

    }

    f飞镖执行() {
        this.ty.bofangshenyin(10)
        this.k开遮挡()
        let sz = []
        this.s数据管理.forEach((e, indx) => {
            if (e != -1) {
                sz.push(indx)
            }
        })

        this.ty.s随机打乱(sz)

        let nf = instantiate(this.ty.find查找('Canvas/动画组/飞镖'))
        nf.setParent(this.ty.find查找('Canvas/动画组'))
        nf.setWorldPosition(this.ty.find查找('Canvas/下方显示组/djk2').worldPosition)
        let dh = sz[0]
        let vv = this.j节点管理[dh].worldPosition
        tween(nf).to(0.6, { worldPosition: vv })
            .call(() => {
                this.ty.bofangshenyin(3)
                let nk = this.j节点管理[dh]
                this.s按钮监控设置(nk, 2)

                this.s数据管理[dh] = -1
                this.j节点管理[dh] = null

                let time1 = 0.3
                let v = v3(0, 20)
                tween(nk)
                    .delay(time1)     //此处修改为动画1
                    .call(() => {
                        this.f方块物理管理[dh].destroy()
                        this.f方块物理管理[dh] = null
                    })
                    .by(1.5, { position: v3(0, -1000) })
                    .call(() => {
                        nk.destroy()
                    })
                    .start()

                tween(nk.children[1]).by(time1, { position: v }).start()
                tween(nk.children[1]).by(time1, { angle: 360 })
                    .call(() => {
                        nk.children[1].destroy()
                    })
                    .start()
                this.g关遮挡()
                nf.destroy()
            })
            .start()

        tween(nf).to(0.6, { angle: 700 }).start()
    }


    k开遮挡() {
        let zdn = this.ty.find查找('Canvas/弹出组/全屏遮挡')
        zdn.setPosition(0, 0)
    }

    g关遮挡() {
        let zdn = this.ty.find查找('Canvas/弹出组/全屏遮挡')
        zdn.setPosition(5000, 5000)
    }
    //UI
    tx体力显示() {
        let n = this.ty.find查找('Canvas/弹出组/体力弹出')
        n.setPosition(0, 0)
        this.g更新体力显示()
    }

    g更新体力显示() {
        let n = this.ty.find查找('Canvas/弹出组/体力弹出/显示组/体力数值文字')
        let wz = SJTS.HC_tilizhi + ""
        if (SJTS.HC_wuxiantili) {
            wz = '无限体力'
        } else {
            wz = SJTS.HC_tilizhi + ''
        }
        this.ty.x修改文字(n, wz)

        n = this.ty.find查找('Canvas/弹出组/体力弹出/显示组/金币数值文字')
        wz = SJTS.HC_qian + ""
        this.ty.x修改文字(n, wz)

        n = this.ty.find查找('Canvas/弹出组/体力补充弹出/小组/园按钮3/标题-001')
        wz = SJTS.w无体力观看次数 + '/3'
        this.ty.x修改文字(n, wz)

        n = this.ty.find查找('Canvas/弹出组/体力补充弹出/小组/kuanhuawen2/标题')
        wz = SJTS.HC_tilizhi + ''
        this.ty.x修改文字(n, wz)
    }

    tg体力关闭() {
        let n = this.ty.find查找('Canvas/弹出组/体力弹出')
        n.setPosition(5000, 0)
    }

    AN设置() {
        this.ty.c创建banner(2)
        this.ty.bofangshenyin(1)
        let n = this.ty.find查找("Canvas/弹出组/设置弹出")
        this.ty.t弹出通用(n)

        this.tx体力显示()
        this.z暂停倒计时()
    }

    AN设置关闭() {
        this.ty.g关闭banner()
        this.ty.bofangshenyin(1)
        let n = this.ty.find查找("Canvas/弹出组/设置弹出")
        this.ty.g关闭通用(n)

        this.tg体力关闭()
        this.h恢复倒计时()
    }

    AN退出() {
        this.ty.g更新缓存('HC_qian', SJTS.HC_qian)

        this.ty.bofangshenyin(1)
        Tween.stopAll()
        director.loadScene('kaishichangjing')
    }

    k可点击 = true
    AN重开() {
        this.ty.g更新缓存('HC_qian', SJTS.HC_qian)

        let f = () => {
            SJTS.s失败次数++
            Tween.stopAll()
            director.loadScene('mishixiaochu')
        }

        if (this.k可点击) {
            if (SJTS.HC_tilizhi > 0 || SJTS.HC_wuxiantili) {
                this.ty.bofangshenyin(2)
                this.k可点击 = false
                if (!SJTS.HC_wuxiantili) {
                    let n = find('Canvas/弹出组/体力消失')
                    let p = v3(220, -165)
                    n.setPosition(p)
                    tween(n).by(0.6, { position: v3(0, 50, 0) })
                        .call(() => {
                            SJTS.HC_tilizhi -= 1
                            localStorage.setItem('HC_tilizhi', JSON.stringify(SJTS.HC_tilizhi))
                            n.setPosition(1000, 0)

                            f()
                        })
                        .start()
                } else {
                    f()
                }
            } else {
                this.t体力不足弹出()
            }
        }
    }


    //体力
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
            this.g更新体力显示()
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
            this.g更新体力显示()
        } else {
            this.ty.bofangshenyin(4)
            let n = this.ty.find查找('Canvas/弹出组/体力弹出/显示组/金币数值文字')
            this.ty.d抖动(n)
        }

    }

    AN_无限体力补充() {
        if (!SJTS.HC_wuxiantili) {
            let f = () => {
                SJTS.w无体力观看次数++
                if (SJTS.w无体力观看次数 >= 3) {
                    SJTS.w无体力观看次数 = 0
                    SJTS.HC_wuxiantili = true
                    let f = () => {
                        SJTS.HC_wuxiantili = false
                    }

                    this.ty.c常驻定时器(60 * 15, f)

                    this.AN_体力关闭()
                }
                this.g更新体力显示()
            }
            weixinapi.z展示激励广告(f)
        }

    }

    z助力道具弹出() {
        this.ty.c创建banner(2)
        this.z暂停倒计时()
        let n = this.ty.find查找('Canvas/弹出组/助力道具弹出')
        this.ty.t弹出通用(n)
        let gq = this.ty.find查找('Canvas/弹出组/助力道具弹出/小组/guangquan4')
        this.ty.c持续旋转(gq, 360, 10)
    }

    z助力道具领取() {
        if (SJTS.z助力免费领取次数 >= 1) {
            SJTS.z助力免费领取次数--
            this.z助力弹出关闭()
            this.d抖动开启 = true
        } else {
            let f = () => {
                this.z助力弹出关闭()
                this.d抖动开启 = true
            }
            weixinapi.z展示激励广告(f)
        }

    }

    z助力弹出关闭() {
        this.ty.g关闭banner()
        this.h恢复倒计时()
        this.ty.bofangshenyin(1)
        let n = this.ty.find查找('Canvas/弹出组/助力道具弹出')
        this.ty.g关闭通用(n)
    }

    s刷新道具数量 = 0
    f飞镖道具数量 = 0
    //道具
    g更换显示道具数据(a?) {
        if (a == 1 || !a) {
            let zhuN = this.ty.find查找('Canvas/下方显示组/djk1/主')
            this.ty.x修改透明度(zhuN.children[0], 0)
            this.ty.x修改透明度(zhuN.children[1], 0)
            if (this.s刷新道具数量 > 0) {
                this.ty.x修改透明度(zhuN.children[1], 0)
                this.ty.x修改透明度(zhuN.children[0], 255)
                this.ty.x修改文字(zhuN.children[0], this.s刷新道具数量 + "")
            } else {
                this.ty.x修改透明度(zhuN.children[0], 0)
                this.ty.x修改透明度(zhuN.children[1], 255)
            }
        }

        if (a == 2 || !a) {
            let zhuN = this.ty.find查找('Canvas/下方显示组/djk2/主')
            this.ty.x修改透明度(zhuN.children[0], 0)
            this.ty.x修改透明度(zhuN.children[1], 0)
            if (this.f飞镖道具数量 > 0) {
                this.ty.x修改透明度(zhuN.children[1], 0)
                this.ty.x修改透明度(zhuN.children[0], 255)
                this.ty.x修改文字(zhuN.children[0], this.f飞镖道具数量 + "")
            } else {
                this.ty.x修改透明度(zhuN.children[0], 0)
                this.ty.x修改透明度(zhuN.children[1], 255)
            }
        }
    }

    d道具刷新点击() {
        if (this.s刷新道具数量 > 0) {
            this.s刷新道具数量--
            this.g更换显示道具数据(1)
            this.s刷新执行()
        } else {
            this.t弹出广告提示(1)
        }
    }

    d道具飞镖点击() {
        if (this.f飞镖道具数量 > 0) {
            this.f飞镖道具数量--
            this.g更换显示道具数据(2)
            this.f飞镖执行()
        } else {
            this.t弹出广告提示(2)
        }
    }

    t弹出广告提示(a) {
        this.z暂停倒计时()
        this.ty.bofangshenyin(1)
        let gts = this.ty.find查找('Canvas/弹出组/道具补充弹出')
        this.ty.t弹出通用(gts)

        let wzn1 = this.ty.find查找('Canvas/弹出组/道具补充弹出/小组/kuanhuawen2/Label')
        let wzn2 = this.ty.find查找("Canvas/弹出组/道具补充弹出/小组/10neiyingyin-001/标题-001")
        let dxzn = find('Canvas/弹出组/道具补充弹出/小组/道具显示组')

        let gkn = this.ty.find查找('Canvas/弹出组/道具补充弹出/小组/园按钮观看')
        if (a == 1) {
            let wz = '刷新：重置所有方块'
            this.ty.x修改文字(wzn1, wz)

            wz = 'X2'
            this.ty.x修改文字(wzn2, wz)

            this.ty.x修改透明度(dxzn.children[0], 255)
            this.ty.x修改透明度(dxzn.children[1], 0)

            this.ty.x修改botton_EventData(gkn, 1 + '')
        }

        if (a == 2) {
            let wz = '飞镖：随机摧毁方块'
            this.ty.x修改文字(wzn1, wz)

            wz = 'X3'
            this.ty.x修改文字(wzn2, wz)

            this.ty.x修改透明度(dxzn.children[1], 255)
            this.ty.x修改透明度(dxzn.children[0], 0)

            this.ty.x修改botton_EventData(gkn, 2 + '')
        }
    }

    g关闭广告提示() {
        this.h恢复倒计时()
        this.ty.bofangshenyin(1)
        this.ty.g关闭通用(this.ty.find查找('Canvas/弹出组/道具补充弹出'))
    }

    g观看执行(e, evn) {
        if (evn == '1') {
            let f = () => {
                this.h恢复倒计时()
                this.g关闭广告提示()
                this.s刷新道具数量 += 2
                this.g更换显示道具数据(1)
            }
            weixinapi.z展示激励广告(f)
        }

        if (evn == '2') {
            let f = () => {
                this.h恢复倒计时()
                this.g关闭广告提示()
                this.f飞镖道具数量 += 5
                this.g更换显示道具数据(2)
            }
            weixinapi.z展示激励广告(f)
        }
    }
}
