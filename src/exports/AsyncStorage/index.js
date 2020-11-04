
const AsyncStorage = {}

/**
 * 获取storage数据
 * @param {string} key key值
 */
AsyncStorage.getItemSync = (key) => {
    return wx?.getStorageSync?.(key)
}
/**
 * 向storage写入数据
 * @param {string} key key值
 * @param {string} value 具体值
 */
AsyncStorage.setItemSync = (key, value) => {
    return wx?.setStorageSync?.(key, value)
}
/**
 * 
 * @param {string} key 
 */
AsyncStorage.removeItemSync = (key) => {
    return wx?.removeStorageSync?.(key)
}
AsyncStorage.getAllKeysSync = () => {
    return wx?.getStorageInfoSync?.()?.keys
}

/**
 * 获取storage数据
 * @param {string} key key值
 */
AsyncStorage.getItem = (key, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        wx?.getStorage?.({
            key,
            success (res) {
                callback(null, res.data)
                resolve(res.data)
            },
            fail () {
                callback(null)
                resolve(null)
            }
        })
    })
}
/**
 * 向storage写入数据
 * @param {string} key key值
 * @param {string} value 具体值
 */
AsyncStorage.setItem = (key, data) => {
    return new Promise((resolve, reject) => {
        wx?.setStorage?.({
            key,
            data
        })
        resolve()
    })
}
/**
 * 
 * @param {string} key 
 */
AsyncStorage.removeItem = (key, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        wx?.removeStorage?.({
            key,
            success (res) {
                callback(null, res)
                resolve(res)
            }
        })
    })
}
AsyncStorage.getAllKeys = (callback = () => {}) => {
    return new Promise((resolve, reject) => {
        wx?.getStorageInfo?.({
            success (res) {
                callback(null, res.keys)
                resolve(res.keys)
            },
            fail () {
                callback([])
                reject([])
            }
        })
    })
}

export default AsyncStorage;