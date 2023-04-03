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

### 操纵节点

