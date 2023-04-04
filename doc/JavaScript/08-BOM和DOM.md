## BOM

BOM的核心就是window对象，浏览器对象模型，BOM规定了浏览器最基础的部分标准化

### window对象

window对象既表示Global对象，又表示浏览器窗口的JavaScript接口

#### 窗口关系

<p style="color: red;">窗口关系</p>

- window.parent，访问当前窗口的父窗口，当当前窗口是最上层窗口的时候相当于window.top
- window.top，始终指向最上层最外层窗口

> 为什么有多层窗口呢

你可以使用`window.top`属性从嵌套的iframe或弹出窗口访问和操作顶级窗口的内容。但是需要注意，由于同源策略的安全限制，只有来自与顶级窗口相同的源（协议、域名和端口）的页面才能访问`window.top`属性。这意味着可以把访问多个窗口的window对象串联起来，比如window.parent.parent。

<p style="color: red;">窗口关系</p>

##### 窗口位置与像素比

window对象的位置可以通过不同的属性和方法来确定，现在浏览器提供了screenLeft和screenTop属性，返回值的单位是css像素

> 那么不同的screenTop的值代表什么呢

原来指的是**浏览器这个软件窗口**距离**桌面窗口**顶部或者左边的位置

>移动窗口

可以使用moveTo方法和moveby方法来移动位置，其中moveTo()接收要移动到的新位置的绝对坐标x和y；而moveBy()则接收相对当前位置在两个方向上移动的像素数。

**依浏览器而定，以上方法可能会被部分或全部禁用**

##### 窗口大小

是指浏览器窗口

<p style="color: red;">窗口大小</p>

所有浏览器都支持的四个确定窗口大小的属性：

- innerWidth：浏览器可视窗口的宽(包含滚动条)
- innerHeight：浏览器可视窗口的高
- outerWidth：浏览器窗口的宽
- outerHeight：浏览器窗口的高

这里的宽高并不是现在屏幕的分辨率，而是分辨率放缩后的值

> 设备的像素、浏览器内容窗口的宽高、浏览器外部窗口的宽高什么关系？

设备的像素：也就是一个屏幕上有多少发光的点，真实存在

CSS像素：虚拟存在的，往往和设备独立像素是1:1的关系，也就是屏幕的像素点多了，然后一个CSS像素对应一个像素点的话页面就会变小，或者页面超出显示区域

这个时候像素比就出现了，也就是**设备真真实像素点** / 设备CSS像素(也就是显示出来的宽或者高的像素)

> 似乎少了点东西

设备的宽高，也就是英寸，也就是相同像素设备宽高越大，越不清晰

> 适配解决的问题

**一套设计稿不能满足所有尺寸**的要求，这个时候就要进行适配

```js
document.documentElement.clientWidth;// 不包含滚动条的宽度
innerWidth;// 包含滚动条的宽度
```

**屏幕进行放缩**的时候这些值，也会**相应发生变化**

##### 滚动视口位置的获取

通过window.scrollX和window.scrollY

##### 总结

	通过window.scrollX和window.scrollY查找滚动了多少document.documentElement.clientWidth;// 不包含滚动条的宽度innerWidth;// 包含滚动条的宽度

### location对象

当前窗口的url信息

- location.hash"#contents"URL散列值（井号后跟零或多个字符），如果没有则为空字符串
- location.host"www.wrox.com:80"服务器名及端口号
- location.hostname"www.wrox.com"服务器名
- location.href"http://www.wrox.com:80/WileyCDA/?q=javascript#contents"当前加载页面的完整URL。location的toString()方法返回这个值
- location.pathname"/WileyCDA/"URL中的路径和（或）文件名
- location.port"80"请求的端口。如果URL中没有端口，则返回空字符串
- location.protocol"http:"页面使用的协议。通常是"http:"或"https:"location.search"?q=javascript"URL的查询字符串。这个字符串以问号开头location.username"foouser"域名前指定的用户名
- location.password"barpassword"域名前指定的密码
- location.origin"http://www.wrox.com"URL的源地址。只读



### history对象

history对象表示当前窗口首次使用以来用户的导航历史记录

history.go(1);

history.go(-1);

## DOM

文档兑现模型，DOM表示为一个由节点构成的层级结构，节点有很多类型，每个类型对应文档中不同的信息

document节点是页面的根节点，根节点唯一的子节点是html元素我们称之为文档元素，对于元素nodeName永远等于标签名，nodeValue始终为null

每一个节点都有一个childNodes属性，包含NodeList的实例，是一个类数组，实时反应DOM结构

```js
document.documentElement.childNodes;
//NodeList(3) [head, text, body]
```

每一个节点都有一个parentNode，指向它的父元素，一个父节点可能会存在多个兄弟节点，访问这些兄弟节点

```js
document.documentElement.childNodes[0].nextSibling;
// #text
document.documentElement.childNodes[0].nextSibling.previousSibling;
// head
```

同时还可以访问第一节节点和最后一个节点

```js
document.documentElement.firstChild;
// head
document.documentElement.lastChild;
```

## 事件

### 事件流

当你点击一个盒子的时候，不仅点击了这个盒子，还点击了它的容器，以及整个页面

#### 事件冒泡

当被点击元素，被触发click事件，然后click事件会沿着DOM树的方向向上传导，直到到达document对象

#### 事件捕获

click事件先从document元素捕获，然后沿着DOM树依次向下传播，直到目标元素

#### DOM事件流

事件捕获 -> 到达目标 -> 事件冒泡

### 事件处理程序

点击、加载、鼠标悬停这些事件，为了响应这些使劲按而调用的函数称为事件处理程序

```html
<input type="button" value="点击" onClick="showMessage"></input>

<script>
	function showMessage() {
    console.log('你好哇');
  }
</script>
```

#### DOM0事件处理程序

以前把事件处理程序作为DOM的属性处理事件，这种方式太过简单，现在使用先获取DOM在添加事件处理程序的形式

#### DOM2事件处理程序

DOM2事件处理程序为程序的赋值和移除定义了两个方法：**addEventListener()**和**removeEventListener()**，将这两个方法暴露在节点上，他们接受三个参数，**事件名**、**事件处理函数**和一个**布尔值**，默认值为false，指的是在冒泡阶段调用此事件处理程序

```js
let btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  console.log('你点击了我');
}, false);
```

这里可以做到给一个DOM绑定多个相同事件的事件处理程序

### 事件对象

**在DOM中发生事件时**，**所有相关的信息**都会**被收集并存储**在一个名为**event**的对象**中**

event对象是传给处理程序的唯一参数，不管是DOM0或者DOM2中指定事件处理程序的形式

| 属性                       | 作用                                                         |
| -------------------------- | ------------------------------------------------------------ |
| currentTarget              | 当前事件处理程序所在元素                                     |
| target                     | 事件目标                                                     |
| preventDefault()           | 取消默认事件                                                 |
| stopPropagation()          | 用于取消后续的事件捕获或者冒泡                               |
| stopImmediatePropagation() | 用于取消所有后续事件捕获或者冒泡，并阻止后续任何事件处理程序的调用 |

**在事件处理程序中this始终是事件处理程序的调用者，也就是绑定在谁身上，currentTarget的值，而真正的目标是target**

### 事件类型

- 用户界面事件：涉及与BOM交互的通用浏览器事件
- 焦点事件：在元素获得焦点和失去焦点的时候触发
- 鼠标点击事件：使用鼠标在页面上执行某些操作的时候触发
- 滚轮事件：使用鼠标滚轮时触发
- 输入事件：向文档输入文本时触发
- 键盘事件：使用键盘在页面执行某些操作时触发
- 合成事件：在某些输入法编辑器输入字符时触发

#### 用户界面事件

也就是在window窗口触发的事件，所以这些事件都要绑定在window上

- load事件：当页面加载完成之后
- unload事件：在页面完全卸载后触发
- abort事件：当页面对象加载完成前被终止时触发
- error事件：当JavaScript报错时触发
- select事件：当用户选择了一个文本框时触发 
- resize事件：当window窗口被放缩时触发
- scroll事件：当用户滚动滚动条时触发，body元素包含已加载页面滚动条，**scrollTop和scrollLeft属性**变化，除了早版的Safari浏览器这些属性变化在body标签上，**其他浏览器属性变化都在html元素上**

#### 焦点事件

- blur事件：元素失去焦点触发，不冒泡
- focus事件：元素获取焦点触发，不冒泡
- focusin事件：元素获取焦点时触发，冒泡
- focusout事件：元素失去焦点时触发，冒泡

#### 鼠标和滚轮事件

- click事件：鼠标左键点击时触发
- dblclick事件：用户双击鼠标主键时触发
- mousedown事件：在用户按下任意鼠标键时触发
- mouseenter事件：在用户鼠标光标移入元素内部时触发
- mouseleave事件：在用户把鼠标从元素内部移出时触发
- mouseup事件：当用户释放鼠标按键时触发
- mousewheel事件：当用户滚动鼠标滚轮的时候触发

一次点击事件，mousedown -> mouseup -> click，如果阻止mousedown或则mouseup任意事件的发生就不会有click

#### 键盘与输入事件

event上的keyCode属性会显示键码

- keydown事件：用户按下键盘时触发，而且持续按住会重复触发
- keyup事件：用户释放键盘上某个键时触发
- textInput事件：输入事件，会在文本被插入到文本框之前触发，会在event对象上提供一个data属性获得输入的值，event上还有一个名为inputMethod的属性，表示输入的方式
- change事件：当输入框失去焦点的时候，select框选择之后触发
- input事件：当输入框或则select框的value值被改变的时候触发

### 坐标

#### 客户端坐标

clientX和clientY

![image-20230404112134744](C:\Users\YANGY\AppData\Roaming\Typora\typora-user-images\image-20230404112134744.png)

```js
event.clientX;event.clientY; // 获取鼠标在视口中的坐标
```

#### 页面坐标

页面滚动时页面的坐标

```js
event.pageX;event.pageY; // 获取页面的坐标
```

#### 相对坐标

鼠标相对于事件对象的位置

```js
event.offsetX;event.offsetY; // 获取鼠标相对于target的位置，不包含margin
```

### target

这就要看element实例上的属性方法了https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang

#### 方法

- focus()，让元素获取焦点，无返回值
- click()，让元素被点击，无返回值
- blur()，让元素失去焦点，无返回值

#### 事件

- beforeinput
- change
- copy
- cut
- drag
- dragend
- dragenter
- drop
- input

#### 属性

- dataset：自定义元素属性data-xxx的值
- innerText：节点及其后台渲染文本的内容
- title：表示某元素标签的标题，如a标签
- offsetHeight：只读属性，以整数的形式返回元素高度(包含垂直填充和边框)
- offsetWidth：只读属性，以整数形式返回元素布局的宽度(包含垂直填充和边框)
- offsetLeft：只读属性，当前元素的左上角内向左偏移
- offsetTop：只读属性，当前元素的左上角内向上偏移

### 内存和性能

在JavaScript中页面中事件处理程序的数量和整体性能直接相关，每个函数都是对象，都占用内存空间，对象越多，性能越差

#### 事件委派

通过事件冒泡，在它的父元素中用一个事件统一处理一个类型的事件

#### 删除事件处理程序

把事件处理程序指定给元素后，在浏览器代码和负责页面交互的JavaScript代码之间就建立了联系，这种联系越多，页面性能就越差，应该及时删除不用的事件处理程序

```js
// 将事件处理程序赋值为null
document.body.onclick = null;
```

**在Vue中一个组件销毁的时候，所有的事件处理器也会自动被删除**，但是对于定时器、addEventListener注册的事件处理程序，就需要在组件销毁的时候移除