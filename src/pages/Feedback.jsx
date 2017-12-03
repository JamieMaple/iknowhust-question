// import PropTypes from 'prop-types'
import Component from 'inferno-component'

// import { camelizeKeys as camelize } from 'humps'

import FeedbackTop from '../components/FeedbackTop'
import FeedbackEditor from '../components/FeedbackEditor'
import FeedbackResult from '../components/FeedbackResult'

export default class Feedback extends Component {
  state = {
    success: false,
    content: '',
  }

  render () {
    const { history } = this.context
    return (
      <div>
        <FeedbackTop
          title={`“${decodeURI(this.props.params.type)}”的反馈`}
          style={{ backgroundColor: '#fff' }}
          onCloseRequest={() => history.go(-1)}
          onSendRequest={() => this.send()}
        />
        {
          !this.state.success
            ? (
              <FeedbackEditor
                placeholder={'我有其他问题 / 要补充答案'}
                value={this.state.content}
                onInput={(e) => this.setState({ content: e.target.value })}
              />
            ) : (
              <FeedbackResult
                onRequestBack={() => history.go(-1)}
              />
            )
        }
      </div>
    )
  }

  send () {
    window._czc.push(['_trackEvent', '反馈', decodeURI(this.props.params.type)])
    fetch('api/v1/feedbacks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: this.state.content,
        type: decodeURI(this.props.params.type),
      }),
    })
      .then((res) => {
        this.setState({
          success: true,
        })
      })
      .catch((error) => {
        if (error) {
          alert(`提交失败：${error.message}`)
        }
      })
  }

  componentDidMount () {
    this.context.updateWeixinConfig({
      title: `iKnow 华科 | 向我们反馈“${decodeURI(this.props.params.type)}”的建议`, // 分享标题
      // generate 摘要
      desc: '你的反馈对我们帮助非常大哦！', // 分享链接
      success: () => {
        window._czc.push(['_trackEvent', '反馈页', '分享', '分享成功'])
      },
      cancel: function () {
        window._czc.push(['_trackEvent', '反馈页', '分享', '分享取消'])
      },
    })
  }
}
