## MapUtils  地图坐标转换和路径规划的API


`MapUtils`可以进行地图坐标的转换，路径规划等，使用方法如下:

tips: 目前只支持坐标转换translate

```typescript
import { MapUtils } from 'qunar-react-native';

//坐标
var coord = {
	latitude:39.983667;    //纬度
	longitude:116.312638;  //经度
}

/* 
 * 转换坐标
 *
 * srcType是转换前坐标类型, desType是需要转换的坐标类型,
 * 支持的有：
 * 'WGS84'  //GPS定位坐标
 * 'GCJ02'  //火星坐标
 * 'BD09'   //百度坐标
 */
var srcType = 'WGS84';
var desType = 'BD09';
var newCoord = MapUtils.translate(coord, srcType, desType);//转换GPS坐标到百度坐标
```

## 属性说明
属性名|类型|参数|是否必须|说明|
---|---|---|---|---|
translate | func | coord, srcType, desType | 是 | 转换坐标 |
