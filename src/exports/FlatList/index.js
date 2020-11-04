/**
 * Created by guhaikuan on 2020/6/24
 */
import * as React from 'react'
import ScrollView from '../ScrollView'
import View from '../View'
import StyleSheet from '../StyleSheet'
import RefreshControl from '../RefreshControl'

// import FlatList from '../../vendor/react-native/FlatList'

class FlatList extends React.Component {
    static defaultProps = {
        data: [],
        renderItem: () => null,
        onScroll: () => null,
        style: {},
        horizontal: false,
        scrollEnabled: true,
        keyExtractor: (item, index) => String(index),
        numColumns: 1,
        // 滚动到底部
        onEndReached: () => null,
        onEndReachedThreshold: 50,
        refreshControl:null
    }
    /**
     * rn api
     * @param index
     *  @param animated 暂时不支持关闭动画
     */
    scrollToIndex = ({ index, animated = true }) => {
        this.setState({ scrollIntoView: createId(index) }, () => {
            // todo 暂时如此处理
            setTimeout(() => this.setState({ scrollIntoView: '' }), 500)
        })
    }
    /**
     * rn api
     * @param offset
     * @param animated 默认为true，暂时不支持false
     */
    scrollToOffset = ({ offset, animated = true }) => {
        this.scrollView && this.scrollView.scrollTo({y: offset, animated: true})
    }
    /**
     * rn api
     */
    scrollToEnd = (params = { animated: true }) => {
        const { data } = this.props
        this.scrollToIndex({index:data.length - 1})
    }

    constructor(props) {
        super(props)
        this.state = {
            scrollIntoView: ''
        }
    }

    renderListContent = () => {
        const { data, renderItem, ListEmptyComponent, ItemSeparatorComponent, keyExtractor } = this.props
        if (data.length > 0) {
            return data.map((item, index) => {
                const Item = renderItem({
                    item,
                    index
                })
                const key = keyExtractor(item, index)
                if (ItemSeparatorComponent && index > 0) {
                    return <View key={key} id={createId(index)}>
                        {React.isValidElement(ItemSeparatorComponent) ? (ItemSeparatorComponent) :
                            <ItemSeparatorComponent key={key + '_separator'}/>}
                        {Item}
                    </View>
                }

                return <View key={key} id={createId(index)}>
                    {Item}
                </View>
            })
        } else if (ListEmptyComponent) {
            return React.isValidElement(ListEmptyComponent) ? (ListEmptyComponent) : <ListEmptyComponent/>
        }
    }

    render() {
        const {
            data, renderItem, onScroll, style, horizontal, scrollEnabled,
            ListEmptyComponent, ListFooterComponent, ListHeaderComponent,
            numColumns, onEndReached, onEndReachedThreshold, onRefresh, refreshing, refreshControl
        } = this.props
        const { scrollIntoView } = this.state
        const contentStyle = !horizontal && numColumns > 1 ? styles.rows : styles.columns
        return (
            <ScrollView
                ref={r => this.scrollView = r}
                style={StyleSheet.flatten(style)}
                onScroll={onScroll}
                horizontal={horizontal}
                scrollEnabled={scrollEnabled}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                scrollIntoView={scrollIntoView}
                refreshControl={
                    onRefresh ? (refreshControl || <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'black'} progressBackgroundColor={'white'}/>) :  null
                }
            >
                {
                    ListHeaderComponent && (React.isValidElement(ListHeaderComponent) ? (ListHeaderComponent) :
                        <ListHeaderComponent/>)
                }
                {
                    horizontal ? this.renderListContent() :
                        <View style={contentStyle}>
                            {
                                this.renderListContent()
                            }
                        </View>
                }
                {
                    ListFooterComponent && (React.isValidElement(ListFooterComponent) ? (ListFooterComponent) :
                        <ListFooterComponent/>)
                }
            </ScrollView>
        )
    }
}

export default FlatList

const styles = StyleSheet.create({
    rows: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    columns: {
        flexDirection: 'column'
    }
})
const createId = (index) => {
    return `id_${index}`
}
