//0 引入 用来发送请求的方法，一定要补全路径
import {request } from "../../request/index.js";
//Page Object
Page({
  data: {
    swiperList: [],//轮播图数组
    catesList: [],//导航数组
    floorList:[]//楼层数据
  },
  //options(Object)
  onLoad: function(options) {
    //发送异步请求获取轮播图数据
    //这里可以通过es6的promise来优化异步请求
    // wx.request({
    //   //https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',

    //   success: (result) => {
    //     // console.log(result)
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   },
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getfloorList();
  },
  //获取轮播图数据
  getSwiperList() {
    request({ url: "/home/swiperdata" })
      .then(res => {
        this.setData({
          swiperList: res
        })
    })
  },
  //获取分类导航数据 
  getCatesList() {
    request({ url: "/home/catitems" })
      .then(res => {
        this.setData({
          catesList: res
        })
    })
  },
  //获取楼层数据
  getfloorList() {
    request({ url: "/home/floordata" })
      .then(res => {
        this.setData({
          floorList: res
        })
    })
  },
});
  