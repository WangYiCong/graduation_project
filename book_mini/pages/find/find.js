// pages/find/find.js
import {
	FindModel
} from '../../model/findModel';
// import {
// 	LikeModel
// } from '../../model/like';

const findModel = new FindModel();
// const likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
		finderData: [{
			image: '',
			title: '',
			content: '',
			pubdate: '',
			fav_nums: 0,
		}]    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		findModel.getFindData().then((res) => {
			console.log(res);
			this.setData({
				finderData: res
			});
		});
  },

	onLike(event) {
		const behavior = event.detail.behavior;
		console.log(behavior);
		
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