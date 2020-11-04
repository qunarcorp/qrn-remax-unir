function emptyRealizeLastArgumentErrCallback() {
    if(process.env.NODE_ENV !== "production" && arguments && arguments.length > 0){
        arguments[arguments.length - 1]?.('小程序平台暂不支持通过StatusBar进行导航栏配置')
    }
}

export default class {
    static setHidden = emptyRealizeLastArgumentErrCallback
    static setStyle = emptyRealizeLastArgumentErrCallback
    static setColor = emptyRealizeLastArgumentErrCallback
    static setTranslucent = emptyRealizeLastArgumentErrCallback
}
