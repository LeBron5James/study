import request from "../../util/request"

// pages/searchlist/searchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.getList(options.id)
  },

  getList(id) {
    request({
      url: `/categories/${id}?_embed=goods`
    }).then(res => {
      // console.log(res)
      this.setData({
        goodlist: res.goods
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleTap(evt) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${evt.currentTarget.dataset.id}&name=${evt.currentTarget.dataset.title}`,
    })
  },
  priceOrder: true,
  commentOrder: true,

  handlePrice() {
    this.priceOrder = !this.priceOrder
    this.setData({
      goodlist: this.priceOrder ? this.data.goodlist.sort((item1, item2) => item1.price - item2.price) : this.data.goodlist.sort((item1, item2) => item2.price - item1.price)
    })
  },
  handleComment() {
    this.commentOrder = !this.commentOrder
    this.setData({
      goodlist: this.commentOrder ? this.data.goodlist.sort((item1, item2) => parseInt(item1.goodcomment) - parseInt(item2.goodcomment)) : this.data.goodlist.sort((item1, item2) => parseInt(item2.goodcomment) - parseInt(item1.goodcomment))
    })
  }
})