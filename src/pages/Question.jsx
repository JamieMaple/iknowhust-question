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
    const matchedQuestions = this.context.allQuestions
      .filter((question) => question.type === this.props.params.type)
    return (
      <div>
        <QuestionListTop
          menuList={matchedQuestions.map((q) => q.summary)}
          onMenuItemClick={(item, i) => this.setState({ scrollIndex: i })}
        />
        <QuestionList
          questionList={matchedQuestions}
          initScrollToIndex={this.state.scrollIndex}
        />
      </div>
    )
  }

  componentWillMount () {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.id && nextProps.params.type) {
      // console.log(this.context.allQuestions)
      const matchedQuestions = this.context.allQuestions
        .filter((question) => question.type === this.props.params.type)

      const scrollIndex = matchedQuestions.findIndex((q) => q.id === parseInt(nextProps.params.id))

      this.setState({ scrollIndex })
    }
  }
}