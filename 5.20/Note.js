/*
项目搭建{
  目录搭建{
    styles{存放公共样式}
    components{存放组件}
    lib{存放第三方库}
    utils{自己的帮助库}
    request{自己的接口帮助库}
  }
  页面搭建{
    首页 index
    分类页面 category
    商品列表页面 goods_list
    商品详情页面 goods_detail
    购物车页面 cart
    收藏页面 collect
    订单页面 order
    搜索页面 search
    个人中心页面 user
    意见反馈页面 feedback
    登录页面 login
    授权页面 auth
    结算页面 pay
  }
}

小程序缓存技术{
        0 web本地存储与小程序本地存储的区别{
        web： localStorage.setItem("key","value")   localStorage.getItem("key")
        小程序： wx.setStorageSync("key","value")  wx.getStorageSync("key")

        存的时候，是否做类型转换{
          web： 无论存入什么类型的数据，最终先会调用toString()，把数据变成字符串再存入
          小程序： 没有类型转换这个操作，存什么类型的数据，获取的时候就是什么类型
        }
      }
      先判断一下本地存储中有没有旧的数据
      没有旧数据直接发送新请求
      有旧数据 同时 旧数据没有过期 就使用本地存储的旧数据即可
}

小程序支持es7的async语法{
  es7的async是解决回调地狱的最终方案，在小程序中配置过程{
    1 在小程序开发工具中，勾选es6转es5语法
    2 下载facebook的regenerator库中的regenerator/packages/regenerator-runtime/runtime.js
    3 在小程序目录下新建文件夹lib/runtime/runtime.js，将代码拷贝进去
    4 在每一个需要async语法的页面js文件中，都引入（不能全局引入）
      import regeneratorRuntime from '../../lib/runtime/runtime'
  }
}


*/