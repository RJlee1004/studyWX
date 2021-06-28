import { request } from "../../request/index.js";
import { login } from "../../utils/asyncWx.js"
import  regeneratorRuntime from "../../lib/runtime/runtime.js"
// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e) {
    try {
      //获取用户信息
      const { encryptedData, rawData, signature, iv } = e.detail;
      //获取小程序登录成功后的code
      const { code } = await login();
      const loginParams={ encryptedData, rawData, signature, iv } 
      //发送请求获取用户的token值
      const { token } = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
      // 把token 存入缓存中，同时跳转回上一个页面
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      });
    } catch (error) {
      console.log(error)
    }
  }
 
})