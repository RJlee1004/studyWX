// pages/demo04/demo04.js
Page({
  handleItemChange(e) {
    // console.log(e);
    const { index } = e.detail;
    let { tabs } = this.data;
      tabs.forEach((v, i) => { i === index ? v.isActive = true : v.isActive = false });

      this.setData({
        tabs
      })
  },
  getFruits(e) {
    console.log(e);
    const checkList = e.detail.value;
    this.setData({
      checkList
    })
  },
  handleChange(e) {
    // console.log(e);
    this.setData({
      gender:e.detail.value
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    gender: "",
    list: [
      {
        id: 0,
        name: "苹果",
        value:"apple"
      },
      {
        id: 1,
        name: "葡萄",
        value:"grape"
      },
      {
        id: 2,
        name: "香蕉",
        value:"bananer"
      }
    ],
    checkList: [],
    tabs: [
      {
        id: 0,
        name: "首页",
        isActive:true
      },
      {
        id: 1,
        name: "原创",
        isActive:false
      },
      {
        id: 2,
        name: "分类",
        isActive:false
      },
      {
        id: 3,
        name: "我的",
        isActive:false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})