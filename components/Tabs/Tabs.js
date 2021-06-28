// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    aaa: {
      type: String,
      value:""
    },
    tabs: {
      type: Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
    页面.js 文件中 存放事件回调函数的时候，存放在data同层级下!!!
    组件.js 文件中 存放事件回调函数时， 必须要存在methods中！！！
  */
  methods: {
    handleChange(e) {
      const { index } = e.target.dataset;
      this.triggerEvent("itemChange", { index });
      
    }
  }
})
