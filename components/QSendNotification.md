## QSendNotification ==通知组件==
发送通知组件

## 使用说明
### **基本用法**
注册监听，在发送触发处调用发送通知方法

```js
import { QSendNotification } from 'qunar-react-native';

class Example extends React.Component{
    componentDidMount() {
        QSendNotification.addNotification({
          name: 'hotel-ota-studentauthentic',
          subscriptionCallback: subscription => {
            this.authenticListener = subscription;
          },
          dataCallback: () => {
            this.props.refreshPriceInfo({});
          },
          errorCallback: err => {
            console.log('机票学生认证失败', err);
          }
        });
      }
    componentWillUnmount() {
        this.authenticListener && QSendNotification.removeNotification({
          name: 'hotel-ota-studentauthentic',
          subscription: this.authenticListener,
          errorCallback: () => {}
        });
        this.bookTimer && clearTimeout(this.bookTimer);
    }
    goHere(){
        const data = this.props.operatePopupInfo;
                // ! testWeb
                QSendNotification.sendNotification({
                  name: 'hotel-ota-studentauthentic',
                  data
        });
    }  
    //... 省略
}

```
### 基本方法
QSendNotification.addNotification({name, subscriptionCallback, dataCallback, errorCallback})
---
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
name|string|xx-xx-xx|是|必须是 部门-业务-功能 这种格式的，例如：flight-booking-detail|
subscriptionCallback|Function|-|是|回调出去的subscription，用于移除相应的subscription监听使用|
dataCallback|Function|-|是|数据回调|
errorCallback|Function|-|是|当name不符合格式时给出的错误提示|
---

QSendNotification.sendNotification({name, data, errorCallback})
---
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
name|string|xx-xx-xx|是|必须是 部门-业务-功能 这种格式的，例如：flight-booking-detail|
data|object|-|是|发送的广播数据|
errorCallback|Function|-|是|当name不符合格式时给出的错误提示|

QSendNotification.removeNotification({name, subscription, errorCallback})
---
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
name|string|xx-xx-xx|是|必须是 部门-业务-功能 这种格式的，例如：flight-booking-detail|
subscription|Function|-|是|从addNotification接口里拿到的subscription，用来正确移除这个监听|
errorCallback|Function|-|是|当name不符合格式时给出的错误提示|
