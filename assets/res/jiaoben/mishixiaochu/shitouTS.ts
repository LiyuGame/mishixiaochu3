import { _decorator, Component, find, log, Node, tween, Vec3 } from 'cc';
import { tongyongTS } from '../tongyongTS/tongyongTS';
import { mishixiaochuTS } from './mishixiaochuTS';
const { ccclass, property } = _decorator;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
@ccclass('shitouTS')
export class shitouTS extends Component {
    ty: tongyongTS
    msxcTS: mishixiaochuTS

    protected onLoad(): void {
        this.ty = find('通用管理').getComponent(tongyongTS)
        this.msxcTS = find('Canvas').getComponent(mishixiaochuTS)
    }


    k开启检查 = true
    update(dt: number) {
        if (this.k开启检查) {
            if (this.node.position.y < this.msxcTS.z最大Y消除距离) {
                this.msxcTS.d得分执行()
                this.node.destroy()
            }

            

        }
    }

}


