import { _decorator, Component, UIOpacity, Node, find, AudioSource, director, Prefab, instantiate, log, Button, } from 'cc';
import { tongyongTS } from './tongyongTS';
const { ccclass, property } = _decorator;

@ccclass('shengyinTS')
export class shengyinTS extends Component {
    //变量
    HC_yinxiaokongzhi: boolean
    HC_yinyuekongzhi: boolean
    HC_zhengdongkongzhi: boolean

    ty: tongyongTS

    y音效组: Node
    y音乐组: Node
    z震动组: Node
    onLoad() {
        this.ty = find('通用管理').getComponent(tongyongTS)
        this.f赋缓存()

        this.y音效组 = this.node.getChildByName('音效控制组')
        this.y音乐组 = this.node.getChildByName('音乐控制组')
        this.z震动组 = this.node.getChildByName('震动控制组')

    }

    f赋缓存() {
        this.HC_yinxiaokongzhi = JSON.parse(localStorage.getItem('HC_yinxiaokongzhi'))
        this.HC_yinyuekongzhi = JSON.parse(localStorage.getItem('HC_yinyuekongzhi'))
        this.HC_zhengdongkongzhi = JSON.parse(localStorage.getItem('HC_zhengdongkongzhi'))
    }

    protected start(): void {
        //刷新造型
        if (this.HC_yinxiaokongzhi) {
            this.y音效组.children[1].getComponent(UIOpacity).opacity = 0
        } else {
            this.y音效组.children[1].getComponent(UIOpacity).opacity = 240
        }

        if (this.HC_yinyuekongzhi) {
            this.y音乐组.children[1].getComponent(UIOpacity).opacity = 0
        } else {
            this.y音乐组.children[1].getComponent(UIOpacity).opacity = 240
        }

        if (this.HC_zhengdongkongzhi) {
            this.z震动组.children[1].getComponent(UIOpacity).opacity = 0
        } else {
            this.z震动组.children[1].getComponent(UIOpacity).opacity = 240
        }



         //播放音乐
        if (JSON.parse(localStorage.getItem('HC_yinyuekongzhi'))) {
            if(this.ty.node.getComponent(AudioSource)){
                this.ty.node.getComponent(AudioSource).play()
            }
        }


        //设置触发
        this.y音效组.on(Button.EventType.CLICK, this.音效开关, this);
        this.y音乐组.on(Button.EventType.CLICK, this.音乐开关, this);
    }

    音效开关() {
        if (this.HC_yinxiaokongzhi) {
            this.HC_yinxiaokongzhi = false;
            localStorage.setItem('HC_yinxiaokongzhi', JSON.stringify(this.HC_yinxiaokongzhi))
        } else {
            this.HC_yinxiaokongzhi = true;
            localStorage.setItem('HC_yinxiaokongzhi', JSON.stringify(this.HC_yinxiaokongzhi))
            this.ty.bofangshenyin(1)
        }

        if (this.HC_yinxiaokongzhi) {
            this.y音效组.children[1].getComponent(UIOpacity).opacity = 0
        } else {
            this.y音效组.children[1].getComponent(UIOpacity).opacity = 240
        }
    }


    音乐开关() {
        this.ty.bofangshenyin(1)
        if (this.HC_yinyuekongzhi) {
            this.HC_yinyuekongzhi = false;
            localStorage.setItem('HC_yinyuekongzhi', JSON.stringify(this.HC_yinyuekongzhi))
        } else {
            this.HC_yinyuekongzhi = true;
            localStorage.setItem('HC_yinyuekongzhi', JSON.stringify(this.HC_yinyuekongzhi))

        }

        if (this.HC_yinyuekongzhi) {
            this.ty.node.getComponent(AudioSource).play()
            this.y音乐组.children[1].getComponent(UIOpacity).opacity = 0
        } else {
            this.ty.node.getComponent(AudioSource).pause()
            this.y音乐组.children[1].getComponent(UIOpacity).opacity = 240
        }

    }


    震动开关() {
        this.ty.bofangshenyin(1)
        if (this.HC_zhengdongkongzhi) {
            this.HC_zhengdongkongzhi = false;
            localStorage.setItem('HC_zhengdongkongzhi', JSON.stringify(this.HC_zhengdongkongzhi))
        } else {
            this.HC_zhengdongkongzhi = true;
            localStorage.setItem('HC_zhengdongkongzhi', JSON.stringify(this.HC_zhengdongkongzhi))
        }

        if (this.HC_zhengdongkongzhi) {
            this.z震动组.children[1].getComponent(UIOpacity).opacity = 0
        } else {
            this.z震动组.children[1].getComponent(UIOpacity).opacity = 240
        }

    }

}


