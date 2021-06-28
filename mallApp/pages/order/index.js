import { request } from "../../request/index.js";
import  regeneratorRuntime from "../../lib/runtime/runtime.js"
const { login } = require("../../utils/asyncWx");

// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive:true
      },
      {
        id: 1,
        value: "代付款",
        isActive:false
      },
      {
        id: 2,
        value: "代发货",
        isActive:false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive:false
      }
    ]
  },
  onShow(options) {
    // const token = wx.getStorageSync('token');
    // if (!token) {
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   });
    //   return;
    // }
    //获取小程序当前页面栈，最多同时存在10个页面，超过小程序会自动过滤
    //数组中索引最大的页面就是当前页面
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    let { type } = currentPage.options;
    this.changeTitleByIndex(type - 1);
    this.getOrders({type});
  },
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } });
    console.log(res);
    this.setData({
      orders:res.orders
    })
  },
  changeTitleByIndex(index) {
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  //标题的点击事件，从子组件传值过来
  handleTabsItemChange(e) {
    const { index } = e.detail;
    this.changeTitleByIndex(index);
  },
})