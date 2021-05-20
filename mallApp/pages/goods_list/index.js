import { request } from "../../request/index.js";
import  regeneratorRuntime from "../../lib/runtime/runtime.js"
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive:true
      },
      {
        id: 1,
        value: "销量",
        isActive:false
      },
      {
        id: 2,
        value: "价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  //接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  //获取商品的列表数据
  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    // console.log(res)

    const total = res.total;
    this.totalPages = Math.ceil(total / 10);
    // console.log(this.totalPages)
    this.setData({
      //拼接数组
      goodsList:[...this.data.goodsList,...res.goods] 
    })

    wx.stopPullDownRefresh();
      
  },
  //标题的点击事件，从子组件传值过来
  handleTabsItemChange(e) {
    // console.log(e)
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  /*
    用户上滑页面 滚动条触底 开始加载下一页数据
    找到滚动条触底事件
    判断是否还有下一页数据
    若没有数据则弹出提示，若有则加载下一页
  */
  //滚动条触底事件
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      // console.log("没有下一页数据")
      wx.showToast({
        title: '没有更多了^.^'
      });
        
    } else {
      this.QueryParams.pagenum += 1;
      this.getGoodsList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh() {
    // console.log("下拉数据爱心")
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }
  
})