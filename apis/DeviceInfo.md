## DeviceInfo  设备、App和系统信息

`DeviceInfo` 可以用来获取App的信息。

## 引入
```javascript
import {DeviceInfo} from 'qunar-react-native';
```

## API

<blockquote class="api">
<strong>DeviceInfo.getInfo</strong>
<span>(callback)</span>
</blockquote>

获取带有 `qp包` 信息 的 `APP` 信息

## 数据结构
### 直接通过 `DeviceInfo` 获取到的数据结构，不包含 `qp包` 信息
```typescript
DeviceInfo = {
	isNotRn: bool, // 是否端内react-native
	isWeb: bool, // 是否是web
	isMini: bool, // 是否是小程序
	isIOS: bool, //是否是iOS
	isAndroid: bool, //是否是android
	vid: string, //app vid  
	pid: string, //app pid
	cid: string, //渠道号
	uid: string, //设备唯一号
	sid: string, //服务器下发的标示
	gid: string, //服务器为每个设备下发的唯一编号
	mac: string, //mac地址，在iOS7之前用来替代UDID，iOS7后，该接口永远返回 02:00:00:00:00:00
	model: string, //设备信息，返回为iPhone 5s (GSM)、iPhone 6 Plus等，可以用来对特定的设备优化
	manufacturer: string, //制造商信息，返回apple、huawei等
	platform: string, //手机平台，返回iOS或者android，小程序端会返回weChat等平台名称
	osVersion: string, //手机系统版本号，比如9.3等
	scheme: string, //当前APP的Scheme跳转协议头，如qunariphone、qunaraphone等
	qrn_version: sting, //QRN 版本，四月底版本为v1.0.0-RC

	releaseType: string, //QRN lib类型，Android可能为dev、beta和release，iOS可能为beta和release

	isIphoneX: bool, // iphone X、iphone XR、iphone XS为true
    uuid: string,

    userId: string,    
    idfa: string,

	// 小程序平台无意义
	immersiveInfo:{}
   }
```

### 通过 `getInfo` 接口获取需要异步操作得到的数据结构
```typescript
//iOS:80011142 Android:60001180 新增API
DeviceInfo.getInfo = {
	isRn: bool, // 是否端内react-native
	isWeb: bool, // 是否是web
	isMini: bool, // 是否是小程序
	isIOS: bool, //是否是iOS
	isAndroid: bool, //是否是android
	vid: string, //app vid  
	pid: string, //app pid
	cid: string, //渠道号
	uid: string, //设备唯一号
	sid: string, //服务器下发的标示
	gid: string, //服务器为每个设备下发的唯一编号
	mac: string, //mac地址，在iOS7之前用来替代UDID，iOS7后，该接口永远返回 02:00:00:00:00:00
	model: string, //设备信息，返回为iPhone 5s (GSM)、iPhone 6 Plus等，可以用来对特定的设备优化
	manufacturer: string, //制造商信息，返回apple、huawei等
	platform: string, //手机平台，返回iOS或者android
	osVersion: string, //手机系统版本号，比如9.3等
	scheme: string, //当前APP的Scheme跳转协议头，如qunariphone、qunaraphone等
	qrn_version: sting, //QRN 版本，四月底版本为v1.0.0-RC

	//iOS:80011117 Android:60001134 新增API
	releaseType: string, //QRN lib类型，Android可能为dev、beta和release，iOS可能为beta和release

	//iOS:80011143 Android:60001185 新增API
	isIphoneX: boolean,
    uuid: string,

    //iOS:80011150 Android:60001203 新增API
    userId: string,    
    idfa: string,

	qpInfo:{
		'android_vid': string, //qp包适用的最低安卓vid
        'hybridid': string,    //qp包的hybridId
        'iOS_vid': string,     //qp包适用的最低iOSvid
        'pid': string,         //客户端的pid
        'platform': string,    //所在平台 iOS/Android
        'rnpackage': boolean,  //是否是rn的qp包
        'timestamp': number,   //qp包的时间戳
        'version': string,     //qp包的版本号
	}

	//Android:60001219 新增API
	notchInfo:{
		'notch': boolean,	//是不是挖孔屏
		'notchSize':{
			'width': number,	//挖孔屏宽度
			'height': number,	//挖孔屏高度
		}
	},

	//Android:60001224 新增API
	immersiveInfo:{
	}
}

```


## 使用说明
### 直接通过 `DeviceInfo` 获取，不包含 `qp包` 信息
```javascript
import { DeviceInfo } from 'qunar-react-native';

//app平台是否是iOS或者android，返回true或者false
var isIOS = DeviceInfo.isIOS;
var isAndroid = DeviecInfo.isAndroid;


var vid = DeviceInfo.vid;	//app vid
var pid = DeviecInfo.pid;	//app pid
var cid = DeviceInfo.cid;	//渠道号
var uid = DeviceInfo.uid;	//设备唯一号
var sid = DeviceInfo.sid;	//服务器下发的标示
var gid = DeviceInfo.gid;	//服务器为每个设备下发的唯一编号

//mac地址，在iOS7之前用来替代UDID，iOS7后，该接口永远返回 02:00:00:00:00:00
var mac = DeviceInfo.mac;

//设备信息，返回为iPhone 5s (GSM)、iPhone 6 Plus等，可以用来对特定的设备优化
var model = DeviceInfo.model;

var manufacturer = DeviceInfo.manufacturer;	//制造商信息，返回apple、huawei等
var platform = DeviceInfo.platform;			//手机平台，返回iOS或者android
var osVersion = DeviceInfo.osVersion; 		//手机系统版本号，比如9.3等

var scheme = DeviceInfo.scheme;	// 当前APP的Scheme跳转协议头，如qunariphone、qunaraphone等

var qrn_version = DeviceInfo.qrn_version; 	//QRN 版本，四月底版本为v1.0.0-RC

var releaseType = DeviceInfo.releaseType; //QRN Lib版本 线上为release

var uuid = DeviceInfo.uuid; //登录用户的uuid

var isIphoneX = DeviceInfo.isIphoneX; //是否是isIphoneX

var userId = DeviceInfo.userId;	//用户Qunar唯一标识

var idfa = DeviceInfo.idfa; //机器的identifierForVendor：系统根据应用的bunld id前两个域生产的唯一标示,仅iOS有

var immersiveInfo =	DeviceInfo.immersiveInfo  //Android:60001224 新增API
```

### 通过 `getInfo` 接口获取
```javascript
import { DeviceInfo } from 'qunar-react-native';

DeviceInfo.getInfo((DeviceInfoData) => {
    var vid = DeviceInfoData.vid;	//app vid
    var pid = DeviceInfoData.pid;	//app pid
    var cid = DeviceInfoData.cid;	//渠道号
    var uid = DeviceInfoData.uid;	//设备唯一号
    var sid = DeviceInfoData.sid;	//服务器下发的标示
    var gid = DeviceInfoData.gid;	//服务器为每个设备下发的唯一编号

    //mac地址，在iOS7之前用来替代UDID，iOS7后，该接口永远返回 02:00:00:00:00:00
    var mac = DeviceInfoData.mac;

    //设备信息，返回为iPhone 5s (GSM)、iPhone 6 Plus等，可以用来对特定的设备优化
    var model = DeviceInfoData.model;

    var manufacturer = DeviceInfoData.manufacturer;	//制造商信息，返回apple、huawei等
    var platform = DeviceInfoData.platform;			//手机平台，返回iOS或者android
    var osVersion = DeviceInfoData.osVersion; 		//手机系统版本号，比如9.3等

    var scheme = DeviceInfoData.scheme;	// 当前APP的Scheme跳转协议头，如qunariphone、qunaraphone等

    var qrn_version = DeviceInfoData.qrn_version; 	//QRN 版本，四月底版本为v1.0.0-RC

    var releaseType = DeviceInfoData.releaseType; //QRN Lib版本 线上为release

    var uuid = DeviceInfoData.uuid; //登录用户的uuid

    var isIphoneX = DeviceInfoData.isIphoneX; //是否是isIphoneX

    var userId = DeviceInfoData.userId;	//用户Qunar唯一标识

    var idfa = DeviceInfoData.idfa; //机器的identifierForVendor：系统根据应用的bunld id前两个域生产的唯一标示,仅 iOS 有    

    if(DeviceInfoData.qpInfo)
    {
        var android_vid = DeviceInfoData.qpInfo.android_vid; //qp包适用的最低安卓vid
        var hybridid = DeviceInfoData.qpInfo.hybridid;       //qp包的hybridId
        var iOS_vid = DeviceInfoData.qpInfo.iOS_vid;         //qp包适用的最低iOSvid
        var pid = DeviceInfoData.qpInfo.pid;                 //客户端的pid
        var platform = DeviceInfoData.qpInfo.platform;       //所在平台 iOS/Android
        var rnpackage = DeviceInfoData.qpInfo.rnpackage;     //是否是rn的qp包
        var timestamp = DeviceInfoData.qpInfo.timestamp;     //qp包的时间戳
        var version = DeviceInfoData.qpInfo.version;         //qp包的版本号
    }

    if(DeviceInfoData.notchInfo) {
        var notch = DeviceInfoData.notchInfo.notch;
        var notchSize = DeviceInfoData.notchInfo.notchSize;
    }
    
    if(DeviceInfoData.immersiveInfo) {
        var immersive = DeviceInfoData.immersiveInfo.immersive //是否需要沉浸式适配
        var immersiveOffset = DeviceInfoData.immersiveInfo.immersiveOffset //获取沉浸式偏移高度
    }
  });


```
