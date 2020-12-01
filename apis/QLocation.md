## QLocation 定位信息


`QLocation` 用来获取用户当前的定位信息


## 引入

```javascript
import { QLocation } from 'qunar-react-native';
```

## API

### ``QLocation.getCacheLocation(handler: function)``
添加一个 callback，用于获取最后一次缓存的定位信息

### ``QLocation.requestCurrentLocation(optoins: Options, handler: function): string``
返回一个请求 id,请求当前的位置

```javascript
optoins = {
  accuracy: QLocation.ACCURACY_HIGH_LEVEL,
  timeout: 1000
}
```
``accuracy`` 控制返回值精度，当且仅当定位结果满足精度要求时返回，可选值为 *微信基础库>=2.9.0及以上支持*
```javascript
QLocation.ACCURACY_IGNORE_LEVEL // 无视精度要求，只要有定位值直接返回（默认值）
QLocation.ACCURACY_HIGH_LEVEL // 高精度，当精度范围在 0 - 100m 时返回结果
QLocation.ACCURACY_NORMAL_LEVEL // 中等精度，当精度范围在 0 - 1000m 时返回结果
QLocation.ACCURACY_LOW_LEVEL // 低精度， 当精度范围在 0 - 3000m 时返回结果
```
``timeout`` 控制超时时间，默认值为 -1（无超时），当该值大于 0 时生效 *微信基础库>=2.9.0及以上支持*

``purpose`` 返回值，用于标识当前发起的请求，可用于后续进行暂停请求

### ``QLocation.requestCurrentLocation(purpose: String, options: Options, handler: function)``
以给定的 ``purpose`` 发起一次定位请求，``Options`` 参数同上

### ``QLocation.stopRequestByPurpose(purpose: String)``
取消给定的 purpose 对应的定位请求

### ``QLocation.requestCurrentCity(success:function, error:function)``
请求用户当前所在的城市，回调数据结构见文末

### ``QLocation.requestCityInfoWithLocation(location: Location, success:function, error:function)``
按照给定的经纬度请求目标地址对应的城市，回调数据结构见文末
```javascript
Location = {
  coordinates: {
    latitude: 37.78825,
    longitude: 122.4324
  },
  coordinateType: 'BD09' // 'BD09' 'WGS84' 'GCJ02'
}
```
``coordinate`` 包含经纬度
``coordinateType`` 声明经纬度对应的坐标系


## 使用说明
```javascript
import { QLocation } from "qunar-react-native";

// 获取最近的一个定位结果
QLocation.getCacheLocation(
  (position) => {
      if (!position.error) {
        var cachePosition = JSON.stringify(position);
        this.setState({cachePosition});   
      }
  }
);

// 发起一次当前的定位请求，返回一个请求 id，
let callbackid = QLocation.requestCurrentLocation(
                {accuracy: QLocaiton.ACCURACY_IGNORE_LEVEL, timeout: 1000}, 
                (result) => {
                    this.setState(
                        {
                          currentRequestResult : JSON.stringify(result),
                        });
                });

// 自定义请求 id 发起一次定位请求, 请求 options 为空, 取默认值
QLocation.requestCurrentLocationByPurpose("aaa-bbb-ccc" , {} , (result) => { this.setState({currentRequestResult : JSON.stringify(result)});})

// 根据请求 id 终止一次请求
QLocation.stopRequestByPurpose("aaa-bbb-ccc")

// 获取用户当前所在城市信息
QLocation.requestCurrentCity(data => lert(JSON.stringify(data)),error => alert(JSON.stringify(error)));

// 获取给定的坐标所在的城市
QLocation.requestCityInfoWithLocation(
  {
    coordinates: {
      latitude: 37.78825,
      longitude: 122.4324
    },
  coordinateType: 'BD09'}, data => lert(JSON.stringify(data)),error => alert(JSON.stringify(error)));
```

## 返回结果

```javascript
// 请求定位成功
let locaiton = {
	"time": "1566477724690",
	"coordinate": {
		"longitude": 116.3123,
		"latitude": 39.983462
	},
	"msg": "Request success!",
	"coordinateType": "BD09",
  "error": false,
  // 仅 requestCurrentLocation/requestCurrentLocationByPurpose 存在该属性
  "purpose": "aaa-bbb-ccc" 
}

// 请求定位失败
let location = {
  "msg": "Request Fail, please try again!",
  error: true
}

// 请求城市信息成功
let cityRequestResponse = {
  "bstatus": {
    "des": "定位成功",
    "code": 0
  },
  "data": {
    "business": "",
    "addrDetail": {
      "city": "武汉市",
      "cityName": "武汉",
      "province": "湖北省",
      "parentCityUrl": "wuhan",
      "parentCityName": "武汉",
      "district": "武昌区",
      "street": "东湖路",
      "cityUrl": "wuhan",
      "streetNumber": "",
      "cityCode": 0,
      "country": ""
    },
    "address": "武汉市武昌区东湖路"
  }
}

// 请求城市位置失败
let cityRequestResponse = {
  "bstatus": {
    "code": -1
    "des": "定位失败，请稍候重试！"
  }
}
```





