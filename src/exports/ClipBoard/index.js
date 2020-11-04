/**
 * 粘贴板
 */
const clipBoard = {
    /**
     * Get content of string type, this method returns a Promise, so you can use following code to get clipboard content
     */
    getString: () => new Promise((resolve, reject) => {
        wx.getClipboardData({
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }),
    /**
     * Set content of string type. You can use following code to set clipboard content
     * ! 小程序目前只有异步方法，封装promise
    */
    setString: (data) => new Promise((resolve, reject) => {
        wx.setClipboardData({
            data,
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export default clipBoard;