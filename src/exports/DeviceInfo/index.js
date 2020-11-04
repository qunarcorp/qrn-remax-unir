// eslint-disable-next-line camelcase,max-classes-per-file
import AsyncStorage from '../AsyncStorage';
import CookieManager from '../CookieManager'
import DeviceBaseInfo from './DeviceBaseInfo';
import Const from './const';

class DeviceInfo extends DeviceBaseInfo {

    /**
     * 获取信息
     * @param callback
     */
    getInfo = (callback ,hybridId)=>{
        const deviceInfo = new DeviceBaseInfo();
        const systemInfo = wx.getSystemInfoSync()
        let info = Object.assign(deviceInfo, systemInfo)
        info.immersiveInfo = {
            immersive:true,
            immersiveOffset:systemInfo.statusBarHeight
        };
        callback(info);
    }
}
export default new DeviceInfo();

/**
 * 通过cookie获取uuid、uid等信息
 * @param callback 回调方法返回信息
 */
const getInfoFromCookie = (callback) => {
    const ret = {};
    CookieManager.getCookieForKey('QN48', '.qunar.com', (uid) => {
        ret.uid = uid;
        CookieManager.getCookieForKey('_s', '.qunar.com', (uuid) => {
            ret.uuid = uuid;
        })
    })
    callback(ret);
}
