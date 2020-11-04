import AsyncStorage from '../AsyncStorage';
import Const from './const'

/**
 * Cookie数据结构
 * Cookie = {
    key: string, //cookie的key值
    value: string, //cookie对应该key的value值
    domain:string, //cookie的Domain值
    path:string, //cookie的Path值
    expires:string, //cookie的Expires值
    secure:string, //是否使用secure的bool值
    httpOnly:string, //是否httpOnly的bool值
}
 */


const handleDomain = (cookie, url) => {
    return cookie;
}

const CookieManager = {};

CookieManager.getCookieForKey = (key, url, callback, errorCallback) => {
    const _key = `${Const.prefixCookie}${key}${url}`;
    let _cookie = ''
    try {
        _cookie = AsyncStorage.getItemSync(_key)
    } catch (error) {
        errorCallback(error)
        return;
    }
    const retCookie = handleDomain(_cookie, url)
    callback && callback(retCookie ? JSON.parse(retCookie) : '')
}

CookieManager.setCookie = async(cookie, callback) => {
    const _key = `${Const.prefixCookie}${cookie.key}${cookie.domain}`
    const _data = JSON.stringify(cookie)
    try {
        await AsyncStorage.setItem(_key, _data)
    } catch (error) {
        throw new Error('Set Cookie failed')
    }
    callback && callback()
}

CookieManager.removeCookieForKey = (key, url, callback) => {
    CookieManager.getCookieForKey(key, url, (retCookie)=>{
        if(retCookie){
            AsyncStorage.removeItem(`${Const.prefixCookie}${retCookie.key}${retCookie.domain}`, (res) => {
                callback(null, res)
            })
        }else{
            callback('the cookie is not exist')
        }
    })
}

CookieManager.removeCookie = (cookie, callback) => {
    CookieManager.getCookieForKey(cookie.key, cookie.domain, (retCookie)=>{
        if(retCookie && retCookie.path === cookie.path){
            AsyncStorage.removeItem(`${Const.prefixCookie}${retCookie.key}${retCookie.domain}`, (res) => {
                callback(null, res)
            })
        }else{
            callback('the cookie is not exist')
        }
    })
}


export default CookieManager;
