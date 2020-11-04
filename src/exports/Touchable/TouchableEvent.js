/**
 * Created by guhaikuan on 2020/7/7
 */
const createTouchableEvent = (event = {})=>{
    const { originalEvent: { detail: { x, y } = {}, changedTouches = [], timeStamp = 0} = {} } = event;
    return {
        nativeEvent: {
            changedTouches,
            pageX: x,
            pageY: y,
            timestamp:timeStamp
        }
    }
}

export default createTouchableEvent
