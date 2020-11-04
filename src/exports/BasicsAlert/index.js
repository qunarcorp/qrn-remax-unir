import * as React from 'react'
import { showModal } from '@remax/wechat'

// q-design BasicsAlert 实现
export class BasicsAlert {
    static alert = (title = '', content = '', buttons = []) => {

        const supportedProps = {
            showCancel:false,
            cancelText:'取消',// 取消按钮的文字，最多 4 个字符
            cancelColor:'#000000',
            confirmText:'确定',// 取消按钮的文字，最多 4 个字符
            confirmColor:'#576B95'
        }
        let onConfirm = ()=> null
        let onCancel = ()=> null

        const setCancelButton = (button)=>{
            supportedProps.showCancel = true;
            const { text, onPress } = button
            if(text){
                supportedProps.cancelText = text.substring(0,4);
            }
            if(onPress){
                onCancel = onPress;
            }
        }
        const setConfirmButton = (button)=>{
            const { text, onPress } = button
            if(text){
                supportedProps.confirmText = text.substring(0,4);
            }
            if(onPress){
                onConfirm = onPress;
            }
        }
        if(buttons.length === 1){
            setConfirmButton(buttons[0])
        } else if ( buttons.length >= 2 ){
            setCancelButton(buttons[0])
            setConfirmButton(buttons[1])
        }
        showModal({
            title,
            content,
            ...supportedProps,
            success:(res)=>{
                /**
                 * Android 6.7.2 以下版本，点击取消或蒙层时，回调 fail, errMsg 为 "fail cancel"；
                 Android 6.7.2 及以上版本 和 iOS 点击蒙层不会关闭模态弹窗，所以尽量避免使用「取消」分支中实现业务逻辑
                 */
                if(res.confirm){
                    onConfirm()
                }else if(res.cancel){
                    onCancel()
                }
            }
        })
    }
}
