// import  from 'inferno'
import PropTypes from 'prop-types'
import Component from 'inferno-component'
import { Route, Router } from 'inferno-router'
import createHashHistory from 'history/createHashHistory'
import wx from 'weixin-js-sdk'
import fep from '../src/frontEndProcessor'

import { camelizeKeys as camelize } from 'humps'

import Entry from './pages/Entry'
import Question from './pages/Question'
import Search from './pages/Search'
import Feedback from './pages/Feedback'

const history = createHashHistory()

export default class App extends Component {
  render () {
    return (
      this.state.loaded
        ? (
          <Router history={history}>
            <Route path={'/'} component={Entry}/>
            <Route path={'/feedback/:type'} component={Feedback}/>
            <Route path={'/search/:keyword'} component={Search}/>
            <Route path={'/question/:type/:id'} component={Question}/>
            <Route path={'/question/:type'} component={Question}/>
            <Route path={'/:index'} component={Entry}/>
          </Router>
        )
        : null
    )
  }

  state = {
    loaded: false,
  }

  questions = {}
  allQuestions = []
  top = []
  videotex = []
  config = {}

  prepareWeixinAuthPromise = null

  updateWeixinConfig = async (wechatShareConfig) => {
    await this.prepareWeixinAuthPromise
    const jumpBearer = 'https://weixin.bingyan-tech.hustonline.net/iknowhust/question/jump.html'
    const imgUrl = 'https://weixin.bingyan-tech.hustonline.net/iknowhust/question/favicon.png'
    if (!wechatShareConfig.link) {
      wechatShareConfig.link = `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`
    }
    if (!wechatShareConfig.imgUrl) {
      wechatShareConfig.imgUrl = imgUrl
    }
    console.log(wechatShareConfig)
    wx.onMenuShareTimeline(wechatShareConfig)
    wx.onMenuShareAppMessage(wechatShareConfig)
    wx.onMenuShareQQ(wechatShareConfig)
    wx.onMenuShareWeibo(wechatShareConfig)
    wx.onMenuShareQZone(wechatShareConfig)
  }

  getChildContext () {
    return {
      questions: this.questions,
      top: this.top,
      videotex: this.videotex,
      allQuestions: this.allQuestions,
      history,
      updateWeixinConfig: this.updateWeixinConfig,
    }
  }

  static childContextTypes = {
    questions: PropTypes.object,
    top: PropTypes.array,
    videotex: PropTypes.array,
  }

  async fetchQuestions () {
    this.top = await (await fetch('api/v1/questions/top/')).json().then(camelize)
    this.videotex = await (await fetch('api/v1/videotexs/')).json().then(camelize)
    const questionResponse = await fetch('api/v1/questions/')
    const questions = await questionResponse.json().then(camelize)
    this.allQuestions = questions.map(fep)

    const questionSetByCategory = questions.reduce((set, question) => {
      if (!set[question.category]) set[question.category] = []

      set[question.category].push(question)
      return set
    }, {})

    const questionSetByType = Object.keys(questionSetByCategory).reduce((set, category) => {
      set[category] = questionSetByCategory[category].reduce((set, question) => {
        if (!set[question.type]) set[question.type] = []

        set[question.type].push(question)
        return set
      }, {})
      return set
    }, {})

    this.questions = questionSetByType
    // try {
    //   this.setState({ loaded: true })
    // } catch (e) {}
    this.setState({ loaded: true })
  }

  async prepareWeixinAuth () {
    this.prepareWeixinAuthPromise =
    fetch('api/v1/config/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: window.location.href.split('#')[0],
      }),
    })
      .then((res) => {
        return new Promise((resolve, reject) => {
          res.json().then(({ appId, timestamp, nonceStr, signature }) => {
            wx.config({
              debug: false,
              appId: appId,
              timestamp: timestamp,
              nonceStr: nonceStr,
              signature: signature,
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'previewImage',
              ],
            })
            wx.ready(() => {
              resolve()
            })
            wx.error(function (res) {
              reject(new Error('微信配置失败！'))
            })
            this.config.appId = appId
            this.config.timestamp = timestamp
            this.config.nonceStr = nonceStr
            this.config.signature = signature
          })
        })
      })
    return this.prepareWeixinAuthPromise
  }

  componentWillMount () {
    this.fetchQuestions()
    this.prepareWeixinAuth()
  }
}
