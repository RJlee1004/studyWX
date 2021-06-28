import { request } from "../../request/index.js";
import  regeneratorRuntime from "../../lib/runtime/runtime.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_details:{}
  },
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  //获取商品的详细数据
  async getGoodsDetail(goods_id) {
    const goods_details = await request({ url: "/goods/detail", data: {goods_id} });
    this.GoodsInfo = goods_details;
    this.setData({
      goods_details:{
        goods_name: goods_details.goods_name,
        goods_price: goods_details.goods_price,
        //iphone部分手机，不识别webp图片格式，若后台不能更改，
        //前端可以临时把 .webp  => .jpg,前提是确认存在jpg格式
        goods_introduce: goods_details.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goods_details.pics
      }
    })
  },
  //点击轮播图，放大预览
  handlePreviewImage(e) {
    //先构造要预览的图片的数组
    const urls = this.GoodsInfo.pics.map((v, i) => v.pics_mid);
    //接受传递过来的图片url
    const index = e.currentTarget.dataset.index;
    const current = urls[index];
    wx.previewImage({
      current,
      urls
    });
  },
  //点击加入购物车
  handleCartAdd() {
    //先获取缓存中的购物车 数组
    let cart = wx.getStorageSync('cart') || [];
    //判断 商品对象是否存在于购物车中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      //不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      //已存在购物车数据，执行 num++
      cart[index].num++;
    }
    //把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //防止用户手抖
      mask:'true'
    })
  }
  
})