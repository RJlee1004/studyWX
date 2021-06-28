import { getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx.js"
import  regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击 收货地址
  async handleChooseAddress() {
    /*获取权限状态
    wx.getSetting({
      success: (result) => {
        //获取权限状态
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result) => {
              console.log(result);
            }
          })
        } else {
          //用户拒绝过授予权限
          wx.openSetting({
            success: (result) => {
              wx.chooseAddress({
                success: (result) => {
                  console.log(result);
                }
              })
            }
          })
        }
      }
    });*/

    //获取权限状态
    /*const ress1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    //判断权限
    if (scopeAddress === true || scopeAddress === undefined) {
      const res2 = await chooseAddress();
      console.log(res2);
    } else {
      await openSetting();
      const res2 = await chooseAddress();
      console.log(res2);
    }*/
    try {
      //获取用户授予权限
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //判断权限状态
      if (scopeAddress === false) {
        //诱导用户打开权限设置
        await openSetting();
      }
      //调用获取收货地址的api
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //存入到缓存汇总
      wx.setStorageSync('address', address)
    } catch(error) {
      console.log(error);
    }
  },
  onShow() {
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync('cart') || [];
    // const allChecked = cart.length?cart.every(v => v.checked):false;
    this.setCart(cart);
    //给data赋值
    this.setData({
      address
    })  
  },
  handleItemChange(e) {
    let goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  //设置购物车状态同时 重新计算 底部工具栏的数据 全选、总价格、购买数量
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    allChecked = cart.length != 0 ? allChecked : false;
    //给data赋值
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  //全选功能
  handleItemAllCheck() {
    let { cart,allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  //商品数量加减
  async handleItemNumEdit(e) {
    let { id, operation } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({ content: "您是否要删除?" });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  //结算功能
  async handlePay() {
    let { address,totalNum } = this.data;
    if (!address.userName) {
      await showToast({title:"您还没有添加收货地址!"});
      return;
    }
    if (totalNum === 0) {
      await showToast({title:"您还没有选购商品!"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
      
  }
})