/*
  1.text 相当于 span标签，行内元素不换行
  2.view 相当于 div标签，块级元素换行
  3.block{
    占位符的标签，代码编辑时可以看到，页面渲染时被小程序移除
  }
  4.wx:for
  5.wx:if  wx:elif  wx:else   hidden
    --频繁切换时建议使用hidden，不频繁时使用wx:if
    --但是hidden不要和display属性一起使用

  6.把输入框的值赋值到data中，不允许
    --this.data.num = detail.value
    --this.num = e.detail.value
  正确写法:
    this.setData({
      num:e.detail.value
    })
  7.无法在事件中直接传参，需要通过自定义属性的方式传递参数
最后在事件源中获取参数
  8.input标签绑定 input事件用bindinput

wxss:
--不需要主动引入样式文件
--小程序规定屏幕宽度为750rpx
--屏幕宽度自适应需要把页面中某些元素的单位由px改为rpx
  --设计稿750px{
    750 px = 750 rpx  所以此时1px=1rpx
  }
  --设计稿宽度414或者未知  page{
    --page px = 750 rpx所以此时1px = 750rpx/page
  }
  9.尺寸单位{
    利用属性calc属性，css和wxss都支持，该属性里可以写
    --750 和 rpx 中间不要留空格
    --运算符的两边也不要留空格
  }
  10.引入公共样式文件，用过@import引入，且必须为相对路径
  11.选择器{
    --不支持通配符*，其他与css一样
    --less{
      --
    }
  }
常见组件{
--view{
  属性：{
    --hover-class：指定按下去的样式
    --hover-stop-propagation：是否阻止事件冒泡
  }
}
--text{
  文本标签，且只能嵌套text
  独特功能：长按文字可以复制   selectable
  可以对空格回车等编码
}
--image{
  默认宽度320px，高度240px
  支持懒加载{
    直接就支持懒加载 lazy-load
    lazy-load会自己判断，当图片出现在 视口 上下三屏的高度之内时，自动开始懒加载
  }
  小程序要求打包上线的大小不得超过2兆，所以许多静态资源必须放在网络上
  --src属性指定图片加载路径
  --mode属性指定图片内容如何和 图片标签 宽高 做适配{
    scaleToFill 默认值 不保持纵横比缩放，使图片宽高完全拉伸至填满image元素
    aspectFit 保持宽高比，确保图片长边完全显示
    aspectFill 保持纵横比，只保证短边完全显示
    widthFix 宽度指定后高度会自动按比例调整
    bottom、top等类似background-position
  }
}
--swiper{
  轮播图外层容器 swiper
  轮播项swiper-item
  swiper标签存在默认样式  宽度100% 高度150px
  image 存在默认宽度和高度 320 * 240 ，且swiper高度 无法实现由内容撑开
  方法是先找出原图的宽度和高度，等比例给swiper定宽度和高度
  autoplay属性：自动轮播
  interval属性：修改轮播时间
  circular属性：是否衔接轮播
  indicator-dots属性：是否显示轮播指示点
  indicator-color属性：指示点颜色
  indicator-active-color属性：当前指示点颜色
}
--navigator{
  导航组件,块级元素
  url属性 要跳转的页面  绝对路径 相对路径
  target属性：选择跳转当前小程序或者其他小程序的页面  self默认值自己  minProgram其他
  open-type属性{
    navigator 默认值，保留当前页面再跳转，但不能跳到tabbar页面
    redirect 关闭当前页面再跳转，也不能跳转tabbar页面
    switchTab：跳转到tabbar页面，并关闭其他所有非tabbar页面
    relaunch：关闭所有页面，跳转到应用内某个页面
    navigateBack：关闭当前页面，返回上一页面或多级页面，可通过getCurrentPages()获取当前页面栈
    exit:退出小程序，target=“miniProgram”
  }
}
--rich-text 富文本标签
  nodes属性来实现{
    --接收标签字符串
    --接收对象数组{
      name表示标签名，attrs表示样式，children表示字标签
    }
  }
}
--button{
外观属性{
  --size{控制按钮大小
    default ，默认大小
    mini，小尺寸
  }
  --type{控制按钮颜色
    default 灰色 、 primary 绿色 、 warn 红色
  }
  --plain{背景色是否透明}
  --disabled{是否禁用}
  -loading{名称前是否带loading图标}
}
开发能力{
  --contact{
    打开客服对话
  }
  --share{
    触发用户转发给微信朋友，但是不能把小程序
    分享到朋友圈的
  }
  --getPhoneNumber{
    获取用户手机号
    非企业小程序账号是没有权限的
    需结合一个事件来使用
    {
      绑定事件 bindgetphonenumber
      在事件回调函数中通过参数获取
      获取到的信息已经加密过了，需要用户自己搭建小程序后台服务器
      在后台服务器中对手机号码进行解析，回到小程序则可以看到信息
    }
  }
  --getUserInfo{
    获取用户信息,可以直接获取没有加密
  }
  --launchApp{
    在小程序中打开App，
    需要先在 app中 通过app的链接打开小程序
    再在小程序中，再通过这个功能重新打开app
  }
  --openSetting{
    打开小程序内置的授权设置页
    授权页面只会出现用户曾经点击过的权限
  }
  --feedback{
    打开小程序内置的“意见反馈界面”
  }
}
}
*/