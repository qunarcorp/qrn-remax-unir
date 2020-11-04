/**
 * Created by guhaikuan on 2020/7/14
 */
import * as React from 'react'
import { Modal as RemaxModal } from "@remax/one";
import View from '../View'
import StyleSheet from '../StyleSheet'

const noop = () => null

class Modal extends React.Component {
    static defaultProps = {
        animationType: 'none',
        hardwareAccelerated: false,
        onDismiss: ()=>null,
        onOrientationChange: noop,
        onRequestClose: noop,
        onShow: noop,
        presentationStyle: 'fullScreen',
        statusBarTranslucent: false,
        transparent: true,
        visible: false,
        children: null,
        style: {},
    }

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if(this.props.visible){
            this.props.onShow();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.visible && !this.props.visible){
            this.props.onDismiss();
        }else if(!prevProps.visible && this.props.visible){
            this.props.onShow();
        }
    }


    render() {
        const {
            animationType,
            hardwareAccelerated,
            onDismiss,
            onOrientationChange,
            onRequestClose,
            onShow,
            presentationStyle,
            statusBarTranslucent,
            transparent,
            visible,
            children,
            style,
        } = this.props;
        if (!visible) {
            return null
        }
        let _style = {}
        if(transparent){
            _style = { backgroundColor: 'transparent' }
        }
        return (
            <RemaxModal>
                <View style={[StyleSheet.flatten([
                    styles.defaultStyle, style, _style
                ])]}
                >
                    { children }
                </View>
            </RemaxModal>
        )
    }
}

export default Modal

const styles = StyleSheet.create({
    defaultStyle:{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})

