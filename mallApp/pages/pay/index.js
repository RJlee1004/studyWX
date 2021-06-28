/**
 * 1 页面加载时候{
 *   从缓存中获取购物车中checked属性为true的商品渲染到页面中
 * }
 */
import { requestPayment, showToast} from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { request } from "../../request/index.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync('cart') || [];
    // const allChecked = cart.length?cart.every(v => v.checked):false;
    cart = cart.filter(v => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    //给data赋值
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  //点击支付功能
  async handleOrderPay() {
    try {
      const token = wx.getStorageSync('token');
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }
      //创建订单
      //准备 请求头参数
      // const header = { Authorization: token };
      //准备请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = []; 
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));
      const orderParams = { order_price, consignee_addr, goods };
      //准备发起请求，创建订单，获取订单编号
      const {order_number} = await request({ url: "/my/orders/create", method: "post", data: orderParams });
      //发起预支付接口
      const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "post", data: { order_number } });
      //发起微信支付
      await requestPayment(pay);
      //查询后台 订单状态
      const res = await request({ url: "/my/orders/chkOrder", method: "post", data: { order_number } })
      await showToast({ title: "支付成功" });
      //手动删除缓存中已经支付的商品
      let newCart = wx.getStorageSync('cart');
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync('cart', newCart);
      //支付成功 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index'
      });
        
    } catch (error) {
      await showToast({ title: "支付失败" });
      console.log(error);
    }
  }
})