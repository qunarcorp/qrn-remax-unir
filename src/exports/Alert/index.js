import * as React from 'react'
import { showModal } from '@remax/wechat'


/**
 * Alert.alert('Alert Title', 'My Alert Msg', [
 {
    text: 'Ask me later',
    onPress: () => console.log('Ask me later pressed')
  },
 {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel'
  },
 { text: 'OK', onPress: () => console.log('OK Pressed') },
 {
    // cancelable and onDismiss only work on Android.
    cancelable: true,
    onDismiss: () =>
      console.log(
        'This alert was dismissed by tapping outside of the alert dialog.'
      )
  }
 ]);
 */

export default class Alert {
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
        if(buttons.length === 1){
            const { text, onPress } = buttons[0]
            if(text){
                supportedProps.confirmText = text.substring(0,4);
            }
            if(onPress){
                onConfirm = onPress;
            }
        }else if ( buttons.length >= 2 ){
            supportedProps.showCancel = true;
            const { text, onPress } = buttons[1]
            if(text){
                supportedProps.cancelText = text.substring(0,4);
            }
            if(onPress){
                onCancel = onPress;
            }
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
