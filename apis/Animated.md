# Animated api

## 简单介绍
RN 中 Animated 的 remax 实现
## 使用说明

```js
import { Animated } from 'react-native';
```
## 方法说明

* decay() 暂未支持

* spring() 暂未支持

* timing()
    
    ```
       static timing(value, config)
    ```
    Config 参数有以下这些属性：
    
    * duration: 动画的持续时间（毫秒）。默认值为 500.
    * easing: 缓动函数。 默认为Easing.inOut(Easing.ease)。
    * delay：开始动画前的延迟时间（毫秒）。默认为 0. --暂未支持
    * isInteraction: 指定本动画是否在InteractionManager的队列中注册以影响其任务调度。默认值为 true。
    
* add() 暂未支持

* subtract() 暂未支持

* divide() 暂未支持

* multiply() 暂未支持

* modulo() 暂未支持

* diffClamp() 暂未支持

* delay() 在指定的延迟之后开始动画
    ```javascript
          static delay(time)
    ```

* sequence() 按顺序执行一个动画数组里的动画，等待一个完成后再执行下一个。如果当前的动画被中止，后面的动画则不会继续执行。
    ```javascript
          static sequence(animations)
    ```

* parallel() 同时开始一个动画数组里的全部动画。默认情况下，如果有任何一个动画停止了，其余的也会被停止。你可以通过stopTogether选项来改变这个效果。
    ```javascript
          static parallel(animations, config?)
    ```

* stagger() 一个动画数组，里面的动画有可能会同时执行（重叠），不过会以指定的延迟来开始。适用于制作拖尾效果。因单个动画 delay暂未适配，因此此延迟暂时也不会生效
    ```javascript
          static stagger(time, animations)
    ```


* loop() 无限循环一个指定的动画，从头到尾周而复始。
    ```javascript
          static loop(animation, config?)
    ```

* start() 开始执行动画
    ```javascript
          static start([callback]: ?(result?: {finished: boolean}) => void);
  
          Animated.timing({}).start(({ finished }) => {
            /* completion callback */
          });
    ```

* stop() 停止所有正在运行的动画。
    ```javascript
          static stop()
    ```
  
* reset() 停止所有正在运行的动画并将其值重置为初始值。
    ```javascript
          static reset()
    ```
## 属性

* Value

* ValueXY

* createAnimatedComponent
