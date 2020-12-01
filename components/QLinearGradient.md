## QLinearGradient ==渐变色组件==
渲染出一个渐变色的组件，需要输入至少两种颜色

## 使用说明
### **基本用法**
渲染一个渐变色View
```
<QLinearGradient />
```
### **颜色属性**
colors 属性的类型为 ['red', 'blue'], 按照顺序设置需要渐变的颜色，至少两种颜色。
```
<QLinearGradient 
  colors={['red', 'green', 'blue']} />
```
### **整个渐变色的起始和终结点设置**
start end 属性的类型为 { x: number, y: number } ，设置渐变色的起始和结束。例如设置了 start={{x: 0.1, y: 0.1}} 就设置了渐变色的开始位置为距离左边 %10 的地方，和距离上边 %10 的的地方。
```
<QLinearGradient 
  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} />
```
### **渐变色中每个颜色的起始位置**
locations 属性的类型为 [number ,number ,number] ，设置的是每个渐变色的起始和结束位置。例如设置了 locations={[0,0.5,0.6]} ，就设置了渐变色里第一个颜色的位置从0开始到50%结束，第二个颜色从50%开始到60%结束，第三个颜色从60%开始到100%结束。
```
<QLinearGradient 
  locations={[0,0.5,0.6]} />
```
## 属性
### **start** =={ PointPropType }=={.type}
设置渐变色的起始位置百分比，不能跟end一样，默认是{x:0.0 , y:0.0}

### **end** =={ PointPropType }=={.type}
设置渐变色的结束位置百分比，不能跟start一样，默认是{x:0.0 , y:1.0}

### **colors** =={ PropTypes.arrayOf(PropTypes.string).isRequired }=={.type}
必需参数，按照顺序设置需要渐变的颜色，至少两种颜色

### **locations** =={ PropTypes.arrayOf(PropTypes.number) }=={.type}
设置的是每个渐变色的起始和结束位置百分比，元素必需要跟colors的个数相等
