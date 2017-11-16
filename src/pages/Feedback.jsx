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
          title={`“${this.props.params.type}”的反馈`}
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
    fetch('api/v1/feedbacks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: this.state.content,
        type: this.props.params.type,
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
}
