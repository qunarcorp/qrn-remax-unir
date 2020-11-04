import AsyncStorage from "../AsyncStorage";
import Const from "./const";

let systemInfo = {}
let miniPlatform = Const.weChat
// 微信小程序逻辑
if(!!wx){
    try {
        miniPlatform = Const.weChat
        systemInfo = wx.getSystemInfoSync()
    } catch (e) {
        console.error('获取系统信息失败', e)
    }
}

export default class DeviceBaseInfo {
    /**
     * 是否端内react-native
     */
    isNotRn = true;

    /**
     * 是否web
     */
    isWeb = false;

    /**
     * 是否小程序
     */
    isMini = true;

    /**
     * 是否是iOS
     */
    isIOS = systemInfo.system ? systemInfo.system.split(' ')[0].toUpperCase() === 'IOS' : false;

    /**
     * 是否是android
     */
    isAndroid = systemInfo.system ? systemInfo.system.split(' ')[0].toUpperCase() === 'ANDROID' : false;;

    /**
     *  app vid
     */
    vid = "";

    /**
     * app pid
     */
    pid = "";

    /**
     * 渠道号
     */
    cid = "";

    /**
     * 设备唯一号
     */
    uid = AsyncStorage.getItemSync(Const.prefixCookie + "QN48" + ".qunar.com")
        ? JSON.parse(
              AsyncStorage.getItemSync(
                  Const.prefixCookie + "QN48" + ".qunar.com"
              )
          ).value
        : "";

    /**
     * 服务器下发的标示
     */
    sid = ""; // 服务器下发的标示

    /**
     * 服务器为每个设备下发的唯一编号
     */
    gid = "";

    /**
     *  mac地址，在iOS7之前用来替代UDID，iOS7后，该接口永远返回 02:00:00:00:00:00
     */
    mac = "02:00:00:00:00:00";

    /**
     * 设备信息，返回为iPhone 5s (GSM)、iPhone 6 Plus等，可以用来对特定的设备优化
     */
    model = systemInfo.model;

    /**
     * 制造商信息，返回apple、huawei等
     */
    manufacturer = systemInfo.brand;

    /**
     * 手机平台，返回iOS或者android, 调试器是"devtools"
     */
    platform = miniPlatform;

    /**
     * 手机系统版本号，比如9.3等
     */
    osVersion = systemInfo.version || '';

    /**
     * 当前APP的Scheme跳转协议头，如qunariphone、qunaraphone等
     */
    scheme = "";

    /**
     * QRN 版本，四月底版本为v1.0.0-RC
     */
    // eslint-disable-next-line camelcase
    qrn_version = "";

    /**
     * iOS:80011117 Android:60001134 新增API
     * QRN lib类型，Android可能为dev、beta和release，iOS可能为beta和release
     */
    releaseType = "";

    /**
     * iOS:80011143 Android:60001185 新增API
     */
    isIphoneX = systemInfo.model.toUpperCase().indexOf(Const.iphoneX) !== -1;

    /**
     * uuid
     */
    uuid = AsyncStorage.getItemSync(Const.prefixCookie + "_s" + ".qunar.com")
        ? JSON.parse(
              AsyncStorage.getItemSync(Const.prefixCookie + "_s" + ".qunar.com")
          ).value
        : "";

    /**
     * iOS:80011150 Android:60001203 新增API
     */
    userId = "";

    /**
     * 广告标识符
     */
    idfa = "";

    /**
     *
     */
    notchInfo = {};

    // 小程序端默认为true
    immersiveInfo = {
        immersive:true,
        immersiveOffset:systemInfo.statusBarHeight
    };
}
