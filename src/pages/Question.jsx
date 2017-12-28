import PropTypes from 'prop-types'

import Component from 'inferno-component'

// import QuestionListTop from '../components/QuestionListTop'
import ListTopWithTwoIcon from '../components/TopBarWithTwoIcon'
import QuestionList from '../components/QuestionList'

import styles from '../style/QuestionListTop.sass'

export default class Question extends Component {
  static contextTypes = {
    questions: PropTypes.object,
    allQuestions: PropTypes.object,
  }

  state = {
    scrollIndex: 0,
    menuHidden: true,
  }

  render () {
    const { router } = this.context
    const matchedQuestions = this.context.allQuestions
      .filter((question) => question.type === decodeURI(this.props.params.type))
    return (
      <div>
        {this.renderListTop(matchedQuestions)}
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

  renderListTop (matchedQuestions) {
    const menuList = matchedQuestions.map((q) => q.summary)
    return (
      <ListTopWithTwoIcon
        title={decodeURI(this.props.params.type)}
        leftIconClass={'home'}
        onLeftIconClick={() => history.go(-1)}

        rightIconClass={'menu'}
        onRightIconClick={() => this.setState((preState) => ({ menuHidden: !preState.menuHidden }))}
        rightIconContent={
          menuList.length > 0 &&
          <ul className={styles['menu-ul'] + ' ' + (!this.state.menuHidden ? styles['show'] : '')}>
            {
              menuList.map((item, i) =>
                <li
                  onClick={(e) => {
                    e.stopPropagation()
                    window._czc.push(['_trackEvent', '问题页', '菜单点击', item])
                    // this.setState({  })
                    this.setState((preState) => ({ menuHidden: true, scrollIndex: i }))
                  }}
                >
                  {item}
                </li>
              )
            }
          </ul>
        }
      />
    )
  }
}
