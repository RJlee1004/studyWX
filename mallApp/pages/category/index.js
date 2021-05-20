import { request } from "../../request/index.js";
import  regeneratorRuntime from "../../lib/runtime/runtime.js"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧商品数据
    rightContent: [],
    //当前点击的左侧菜单
    currentIndex: 0,
    //滚动条初始位置
    scrollTop:"0"
  },
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
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
    */

    //1获取本地存储中的数据，利用小程序中的本地存储技术
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      //无旧数据，发送请求
      this.getCategory();
    } else {
      //有旧数据  定义过期时间 10s
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCategory();
      } else {
        // console.log("可以使用旧数据")
        this.Cates = Cates.data;
        //构造左侧菜单数据
        const leftMenuList = this.Cates.map(v => v.cat_name);

        //构造右侧商品数据
        const rightContent = this.Cates[0].children;

        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类信息
  // getCategory() {
  //   request({ url:"/categories"})
  //     .then(res => {
  //       // console.log(res)
  //       this.Cates = res.data.message;

  //       //把接口的数据存入到本地存储中
  //       wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });

  //       //构造左侧菜单数据
  //       const leftMenuList = this.Cates.map(v => v.cat_name);

  //       //构造右侧商品数据
  //       const rightContent = this.Cates[0].children;

  //       this.setData({
  //         leftMenuList,
  //         rightContent
  //       })
  //   })
  // },
  //获取分类信息   用async和await
  async getCategory() {
    //使用es7的async await发送请求
    const res = await request({ url: "/categories" });
    this.Cates = res;
    //把接口的数据存入到本地存储中
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });
    //构造左侧菜单数据
    const leftMenuList = this.Cates.map(v => v.cat_name);
    //构造右侧商品数据
    const rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧菜单的点击事件
  handleItemTap(e) {
    //获取被点击的标题身上的索引并给data中currentIndex赋值
    // console.log(e)
    let { index } = e.target.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      rightContent,
      currentIndex: index,
      scrollTop:"0"
    }) 
  }
})