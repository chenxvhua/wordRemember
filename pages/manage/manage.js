// pages/add/add.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputWord:"",
    inputDesc:"",
    inputSentence:"",
    inputSentenceDesc:"",
    showWord:true,
    showSentence: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    console.log("options:", JSON.stringify(options))
    if (options.type==="word"){
      this.setData({
        showWord: true,
        showSentence: false,
      })
    }
    if (options.type === "sentence"){
      this.setData({
        showWord: false,
        showSentence: true,
      })
    }
  },
  //自定义方法start
  handleInputWord:function(e){
    console.log("inputWord:", e.detail.value)
    this.setData({ "inputWord": e.detail.value })
  },
  handleInputDesc: function (e) {
    console.log("inputDesc:", e.detail.value)
    this.setData({ "inputDesc": e.detail.value })
  },
  handleInputSentence: function (e) {
    console.log("inputSentence:", e.detail.value)
    this.setData({ "inputSentence": e.detail.value })
  },
  handleInputSentenceDesc: function (e) {
    console.log("inputSentenceDesc:", e.detail.value)
    this.setData({ "inputSentenceDesc": e.detail.value })
  },
  handleSaveAddWord:function(e){
    if (!this.data.inputWord){
      wx.showToast({
        title: '请输入单词',
        icon: 'none',
        duration: 2000
      })
      return
    }

    var createDate = (new Date()).getTime();
    var firstLetter = this.data.inputWord.trim().substr(0,1).toUpperCase()
    var pageDataStr = wx.getStorageSync('pageDataStr')
    var pageData = JSON.parse(pageDataStr || "{}")
    var wordsArr = pageData[firstLetter]||[]
    wordsArr.push({
      value: this.data.inputWord.trim(),
      desc: this.data.inputDesc,
      createDate: createDate
    })
    pageData[firstLetter] = wordsArr
    wx.setStorageSync("pageDataStr", JSON.stringify(pageData))
    wx.showToast({
      title: '单词添加成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({inputWord: "",inputDesc: ""})
  },

  handleSaveAddSentence: function (e) {
    if (!this.data.inputSentence) {
      wx.showToast({
        title: '请输入句子',
        icon: 'none',
        duration: 2000
      })
      return
    }

    var createDate = (new Date()).getTime();
    var firstLetter = this.data.inputSentence.trim().substr(0, 1).toUpperCase()
    var pageSentenceStr = wx.getStorageSync('pageSentenceStr')
    var pageData = JSON.parse(pageSentenceStr || "{}")
    var wordsArr = pageData[firstLetter] || []
    wordsArr.push({
      value: this.data.inputSentence.trim(),
      desc: this.data.inputSentenceDesc,
      createDate: createDate
    })
    pageData[firstLetter] = wordsArr
    wx.setStorageSync("pageSentenceStr", JSON.stringify(pageData))
    wx.showToast({
      title: '句子添加成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({ inputSentence: "", inputSentenceDesc: "" })
  },
  //自定义方法end

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