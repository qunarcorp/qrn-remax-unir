/**
 * Created by guhaikuan on 2020/7/9
 */
import { showToast } from '@remax/wechat'
export default class Toast {
    static show = (msg,duration = 1500,offset)=>{
        showToast({
            title:msg,
            icon:'none',
            duration
        })
    }
}
