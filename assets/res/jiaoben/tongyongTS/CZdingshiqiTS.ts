import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
@ccclass('CZdingshiqiTS')
export class CZdingshiqiTS extends Component {

    d定时time0=0
    d定时:number
    z执行函数 = () => {

    }
    d定时开始 = false
    update(dt: number) {
        if (this.d定时开始) {
            this.d定时time0 += 1 * dt
            if (this.d定时time0 >= this.d定时) {
                this.d定时开始 =false
                this.z执行函数()
                this.node.destroy()
            }
        }
    }
}


