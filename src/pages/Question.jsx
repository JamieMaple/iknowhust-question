import PropTypes from 'prop-types'

import Component from 'inferno-component'

import QuestionListTop from '../components/QuestionListTop'
import QuestionList from '../components/QuestionList'

export default class Question extends Component {
  static contextTypes = {
    questions: PropTypes.object,
    allQuestions: PropTypes.object,
  }

  state = {
    scrollIndex: 0,
  }

  render () {
    const { router } = this.context
    const matchedQuestions = this.context.allQuestions
      .filter((question) => question.type === decodeURI(this.props.params.type))
    return (
      <div>
        <QuestionListTop
          title={decodeURI(this.props.params.type)}
          menuList={matchedQuestions.map((q) => q.summary)}
          onMenuItemClick={(item, i) => {
            window._czc.push(['_trackEvent', '问题页', '菜单点击', item])
            this.setState({ scrollIndex: i })
          }}
          onHomeButtonClick={() => history.go(-1)}
        />
        <QuestionList
          questionList={matchedQuestions}
          initScrollToIndex={this.state.scrollIndex}
          onFeedbackClick={() => {
            window._czc.push(['_trackEvent', '问题页', '反馈点击', decodeURI(this.props.params.type)])
            router.push(`/feedback/${this.props.params.type}`)
          }}
        />
      </div>
    )
  }

  componentWillMount () {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const matchedQuestions = this.context.allQuestions
      .filter((question) => question.type === decodeURI(this.props.params.type))

    this.context.updateWeixinConfig({
      title: `iKnow 华科 | “${decodeURI(nextProps.params.type)}”的问题都在这里啦！`, // 分享标题
      // generate 摘要
      desc: matchedQuestions.map(({title}, i) => (i + 1) + '.' + title).join(' \n'), // 分享链接
      success: () => {
        window._czc.push(['_trackEvent', '问题页', '分享', '分享成功'])
      },
      cancel: function () {
        window._czc.push(['_trackEvent', '问题页', '分享', '分享取消'])
      },
    })

    if (nextProps.params.id && nextProps.params.type) {
      // console.log(this.context.allQuestions)
      const scrollIndex = matchedQuestions.findIndex((q) => q.id === parseInt(nextProps.params.id))

      this.setState({ scrollIndex })
    }
  }
}
