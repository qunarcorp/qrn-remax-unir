import { loadFontFace } from '@remax/wechat'

export default class FontLoader {
    static loadFontSet(fontSet) {
        Object.keys(fontSet).forEach((fontName) => {
            const url = fontSet[fontName]
            loadFontFace({
                global: true,
                family: fontName,
                source: `url(${url})`,
            })
        })
    }
}
