# reactlite
react minimal components

一个基于 React 的不包含过多特殊样式的简单组件
## 安装
```javascript
npm install reactlite -S
```
## 使用方法
``` javascript
import {Element, BundleLoader} from 'reactlite';
```
## Element
* visible 为 false将返回 null
``` javascript
<Element visible={false} component="span">children</Element>
```
等价于
``` javascript
null
```

* component 指定内部组件类型(默认为 div )，
``` javascript
<Element component="span">children</Element>
```
等价于
``` javascript
<span>children</span>
```
* css 属性将转化为 style
``` javascript
<Element color="red" fontSize="20px">children</Element>
```
等价于
``` javascript
<div style={{color:'red', fontSize:'20px'}}>children</div>
```

## BundleLoader
用于 bundle-loader （webpack 插件）懒加载.
``` javascript
import LazyComponent from 'bundle?lazy!./LazyComponent.js';
// LazyComponent 将会延迟加载
<BundleLoader component={LazyComponent}/>
```
## Row & Col

* Row  

属性 |描述 |可选值 |默认值
----|---|---|---
type    |布局模式 |null, flex                  | top
align   |仅适用于type:flex,纵向对齐 |top middle bottom |top
justify |仅适用于type:flex,横向对齐 |start end center space-around space-between |start
gutter  |间距 | |0
numCol | 将 Row 分成 numCol 列| | 24
``` javascript
<Row gutter={20} numCol="100" type="flex" justify="center">
  <Col span="11">11%</Col>
  <Col span="49">49%</Col>
  <Col span="40">40%</Col>
</Row>
```
* Col

| 属性          | 描述           | 默认值  |
| ------------- |:-------------:| -----:|
| span          | 宽度占比 | 0 |
| offset        | 横向偏移占比（计算宽度）     |   0 |
| push | 从前向后排（相当于span）      |   0 |
| pull | 从后向前排（相当于倒序的span）      |   0 |
