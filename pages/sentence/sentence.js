//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    lettersArr: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    page: [],
    originalPage: [],
    "showWordDetail": false,
    deleteConfig: {
      clickNum: 0,
      wordItem: {},
    },
    navItemSelectStatus: {
      today: false,
      yesterday: false,
      week: false,
      all: true
    },
    wordItem: {},
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.reflushPageData();
  },
  onLoad: function () {
    this.reflushPageData();
  },
  queryWord(e) {
    var that = this
    var dateRange = e.currentTarget.dataset.daterange

    console.log(dateRange)
    //today yesterday week all 
    var filteredPage = {}
    if (dateRange === 'today') {
      var tempNowDate = new Date()
      var todayDateStart = (new Date(tempNowDate.getFullYear() + "/" + (tempNowDate.getMonth() + 1) + "/" + tempNowDate.getDate() + " 00:00:00")).getTime()
      var todayDateEnd = (new Date(tempNowDate.getFullYear() + "/" + (tempNowDate.getMonth() + 1) + "/" + tempNowDate.getDate() + " 23:59:59")).getTime()

      that.data.lettersArr.forEach(function (letter) {
        var currentLetterItem = that.data.originalPage[letter] || []
        currentLetterItem.forEach(function (wordItem) {
          var createDate = wordItem.createDate
          if (createDate > todayDateStart && createDate < todayDateEnd) {
            console.log(1)
            if (filteredPage[letter]) {
              filteredPage[letter].push(wordItem)
              console.log(2)
            }
            else {
              filteredPage[letter] = [wordItem]
              console.log(3)
            }
          }
        })
      })
    }
    else if (dateRange === 'yesterday') {
      var tempNowDate = new Date()
      tempNowDate.setDate(tempNowDate.getDate() - 1);
      var yesterdayDateStart = new Date(tempNowDate.getFullYear() + "/" + (tempNowDate.getMonth() + 1) + "/" + tempNowDate.getDate() + " 00:00:00").getTime()
      var yesterdayDateEnd = new Date(tempNowDate.getFullYear() + "/" + (tempNowDate.getMonth() + 1) + "/" + tempNowDate.getDate() + " 23:59:59").getTime()

      that.data.lettersArr.forEach(function (letter) {
        var currentLetterItem = that.data.originalPage[letter] || []
        currentLetterItem.forEach(function (wordItem) {
          var createDate = wordItem.createDate
          if (createDate > yesterdayDateStart && createDate < yesterdayDateEnd) {
            if (filteredPage[letter]) {
              filteredPage[letter].push(wordItem)
            }
            else {
              filteredPage[letter] = [wordItem]
            }
          }
        })
      })

    }
    else if (dateRange === 'week') {
      var tempNowDate = new Date()
      var tempNowDateEnd = new Date()
      tempNowDate.setDate(tempNowDate.getDate() - 7);
      var weekDateStart = new Date(tempNowDate.getFullYear() + "/" + (tempNowDate.getMonth() + 1) + "/" + tempNowDate.getDate() + " 00:00:00").getTime()
      var weekDateEnd = new Date(tempNowDateEnd.getFullYear() + "/" + (tempNowDateEnd.getMonth() + 1) + "/" + tempNowDateEnd.getDate() + " 23:59:59").getTime()

      that.data.lettersArr.forEach(function (letter) {
        var currentLetterItem = that.data.originalPage[letter] || []
        currentLetterItem.forEach(function (wordItem) {
          var createDate = wordItem.createDate
          if (createDate > weekDateStart && createDate < weekDateEnd) {
            if (filteredPage[letter]) {
              filteredPage[letter].push(wordItem)
            }
            else {
              filteredPage[letter] = [wordItem]
            }
          }
        })
      })
    }
    else if (dateRange === 'all') {
      filteredPage = this.data.originalPage
    }

    that.setData({
      "page": filteredPage,
      navItemSelectStatus: {
        today: dateRange === 'today' ? true : false,
        yesterday: dateRange === 'yesterday' ? true : false,
        week: dateRange === 'week' ? true : false,
        all: dateRange === 'all' ? true : false,
      },
    })

  },
  handleDelete(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认执行该操作?',
      success: function (res) {
        if (res.confirm) {
          var wordItem = e.currentTarget.dataset.worditem;
          var firstLetter = wordItem.value.substr(0, 1).toUpperCase()
          var pageDataStr = wx.getStorageSync('pageSentenceStr')
          var pageData = JSON.parse(pageDataStr || "{}")
          var wordsArr = pageData[firstLetter] || []
          for (var i = 0; i < wordsArr.length; i++) {
            if (wordsArr[i].value === wordItem.value) {
              wordsArr.splice(i, 1)
              break
            }
          }
          pageData[firstLetter] = wordsArr
          wx.setStorageSync("pageSentenceStr", JSON.stringify(pageData))
          that.reflushPageData();
        }
      }
    })

  },
  handleShowWordDetail(e) {
    var wordItem = e.currentTarget.dataset.worditem;
    if (this.data.deleteConfig.wordItem.value ===
      wordItem.value &&
      this.data.deleteConfig.clickNum > 0
    ) {
      console.log("wordItem:", wordItem)
      this.setData({
        wordItem: wordItem,
        "showWordDetail": true,
        deleteConfig: {
          clickNum: 0,
          wordItem: {},
        }
      })
    }
    else {
      console.log("this.data.deleteConfig.wordItem.clickNum:", this.data.deleteConfig.clickNum)
      this.setData({
        deleteConfig: {
          clickNum: ++this.data.deleteConfig.clickNum,
          wordItem: wordItem,
        }
      })
    }
  },

  handleWordDetailClose() {
    this.setData({
      "showWordDetail": false
    })
  },

  reflushPageData() {
    var pageSentenceStr = wx.getStorageSync('pageSentenceStr')
    console.log("pageSentenceStr:", pageSentenceStr)
    var pageSentence = JSON.parse(pageSentenceStr || "{}")

    this.setData({
      "page": pageSentence,
      "originalPage": pageSentence
    })
  },

})
