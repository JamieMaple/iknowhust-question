import PropTypes from 'prop-types'

import Component from 'inferno-component'

import QuestionListTop from '../components/QuestionListTop'
import QuestionList from '../components/QuestionList'

export default class Question extends Component {
  static contextTypes = {
    questions: PropTypes.object,
    allQuestions: PropTypes.object,
  }

  render () {
    return (
      <div>
        <QuestionListTop/>
        <QuestionList/>
      </div>
    )
  }

  componentWillMount () {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.id || nextProps.params.type) {
      console.log(this.context.allQuestions)
    }
  }
}
