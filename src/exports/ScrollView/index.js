/**
 * @author jiafengf.wang
 * @date 2020.07
 */
import * as React from 'react'
import { ScrollView as RScrollView, View } from '@remax/wechat'
import StyleSheet from '../StyleSheet'

class ScrollView extends React.Component {
    static defaultProps = {
        'wx-height': 0,
        style: {},
        horizontal: false,
        scrollEnabled: true,
        onEndReached: () => null,
        onEndReachedThreshold:50,
        // (default: false) iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
        scrollsToTop:false,
        scrollIntoView:'',
        refreshControl:null,
    }

    constructor() {
        super()
        this.rScrollViewRef = null
        this.state = {
            scrollTop: 0,
            scrollLeft: 0,
            refreshing:false,
        }
    }

    handleOnScroll = (e) => {
        /**
         * {"type":"scroll","timeStamp":3589,"target":{"id":"","offsetLeft":20,"offsetTop":0,"dataset":{}},"currentTarget":{"id":"","offsetLeft":20,"offsetTop":0,"dataset":{}},"mark":{},"detail":{"scrollLeft":0,"scrollTop":60,"scrollHeight":879,"scrollWidth":348,"deltaX":0,"deltaY":-3},"mut":false,"_userTap":false}
         */
        /**↑↑↑↑↑↑↑mapping↓↓↓↓↓↓↓**/
        /**
         * {
                nativeEvent: {
                    contentInset: {bottom, left, right, top},
                    contentOffset: {x, y},
                    contentSize: {height, width},
                    layoutMeasurement: {height, width},
                    zoomScale
                }
            }
         */
        const { detail = {} } = e
        const nativeEvent = {}
        nativeEvent.contentOffset = {
            x: detail.scrollLeft || 0,
            y: detail.scrollTop || 0
        }
        nativeEvent.contentSize = {
            height: detail.scrollHeight || 0,
            width: detail.scrollWidth || 0
        }
        return ({ nativeEvent })
    }

    handleApi = () => {
        const {
            onScroll
        } = this.props
        const supportedApi = {}
        if (onScroll) {
            if (typeof onScroll === 'function') {
                supportedApi.onScroll = (e) => {
                    onScroll(this.handleOnScroll(e))
                }
            } else {
                console.warn('onScroll 的类型必须是一个方法！')
            }
        }
        return supportedApi
    }
    /**
     * rn api
     * @param offset
     */
    scrollTo = (options) => {
        // 区分方向
        const orientation = this.props.horizontal ? 'scrollLeft' : 'scrollTop'
        const optionsParams = this.props.horizontal ? 'x' : 'y'
        this.setState({
            [orientation]: options[optionsParams] + Math.random() * 0.1 // fix me
        })
        // todo 测试下拉刷新
        // this.setState({refreshing:true})
    }

    supplementStyle = () => {
        const {
            horizontal = false
        } = this.props
        const styles = {
            display: 'flex',
            width: '100%', // 兼容横向
            boxSizing:'border-box'
        }
        const wxHeight = this.props['wx-height'];
        if(wxHeight){
            styles.maxHeight = wxHeight
        }
        if (horizontal) {
            styles.flexDirection = 'row'
        } else {
            styles.flexDirection = 'column'
        }
        return styles
    }

    render() {
        const {
            style,
            horizontal,
            scrollEnabled,
            onEndReached,
            onEndReachedThreshold,
            scrollsToTop,
            scrollIntoView,
            refreshControl
        } = this.props
        let {
            children
        } = this.props;
        const {
            scrollTop,
            scrollLeft,
        } = this.state
        if(horizontal && !wx.canIUse('scroll-view.enable-flex')){
            children = <View style={{display: 'flex', flex: 1, width: '100%', height: '100%', flexDirection: 'row'}}>{children}</View>
        }
        return <RScrollView
            ref={o => this.rScrollViewRef = o}
            children={children}
            scrollY={scrollEnabled && !horizontal}
            scrollX={scrollEnabled && horizontal}
            enableFlex={true}
            style={StyleSheet.flatten([
                {height: '100vh'},
                style,
                this.supplementStyle()
            ])}
            scrollTop={scrollTop}
            scrollLeft={scrollLeft}
            enableBackToTop={scrollsToTop}
            scrollWithAnimation={true}
            onScrollToLower={onEndReached}
            lowerThreshold={onEndReachedThreshold}
            scrollIntoView={scrollIntoView}
            refresherEnabled={!!refreshControl}
            refresherTriggered={refreshControl?.props?.refreshing}
            onRefresherRefresh={(e)=> {
                refreshControl?.props?.onRefresh?.()
            }}
            refresherDefaultStyle={refreshControl?.props?.tintColor || 'black'}
            refresherBackground={refreshControl?.props?.progressBackgroundColor || 'white'}
            // scrollAnimationDuration = {500}
            {...this.handleApi()}
        />
    }
}

export default ScrollView
