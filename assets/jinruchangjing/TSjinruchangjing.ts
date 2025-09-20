import { _decorator, assetManager, Component, director, Node } from 'cc';
import { weixinapi } from '../res/jiaoben/tongyongTS/weixinAIP';
const { ccclass, property } = _decorator;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
@ccclass('TSjinruchangjing')
export class TSjinruchangjing extends Component {

    start() {

                
                //预加载场景
                let m = 'jiazaichangjing'
                let f = () => { director.loadScene(m) }
                assetManager.loadBundle(m, (err, a) => { a.loadScene(m, f); });


    }

}


