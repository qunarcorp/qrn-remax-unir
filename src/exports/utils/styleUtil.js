/**
 * Created by guhaikuan on 2020/6/30
 */

// @ts-ignore
export const flatStyle = (style = {}) => {
    const result = {}
    if (!Array.isArray(style)) {
        return Object.assign(result, style)
    }
    return style.reduce((pre, next) => Object.assign(pre, flatStyle(next)), result)
}
