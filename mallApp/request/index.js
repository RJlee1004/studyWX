export const requset = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}